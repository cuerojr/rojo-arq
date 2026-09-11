// actions/crear-inspeccion.ts
"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import {
  inspectionSchema,
  InspectionData,
  InspectionState,
  patologiaRows,
  ambientes,
} from "@/lib/inspection";

import {
  tipoPropiedadMap,
  motivoMap,
  exteriorMap,
  interiorMap,
  patologiaMap,
  severidadMap,
  ambienteMap,
  hipotesisMap,
  instrumentoMap,
} from "@/lib/mappers/inspection-enums";
import {
  Ambiente,
  ElementoArquitectura,
  SectorElemento,
  TipoPatologiaSector,
  ColorMancha,
} from "@/generated/prisma/client";

function parseSectoresAfectados(formData: FormData) {
  const sectores: {
    ambienteNombre: string;
    esExterior: boolean;
    elemento: ElementoArquitectura | null;
    sectorElemento: SectorElemento | null;
    tiposPatologia: TipoPatologiaSector[];
    colorMancha: ColorMancha[];
    tamanioPatologia: string | null;
    observaciones: string | null;
  }[] = [];

  let i = 0;
  while (formData.has(`sectores[${i}][ambienteNombre]`)) {
    const ambienteNombre = formData.get(
      `sectores[${i}][ambienteNombre]`,
    ) as string;
    if (ambienteNombre) {
      sectores.push({
        ambienteNombre,
        esExterior: formData.get(`sectores[${i}][esExterior]`) === "on",
        elemento:
          (formData.get(`sectores[${i}][elemento]`) as ElementoArquitectura) ||
          null,
        sectorElemento:
          (formData.get(`sectores[${i}][sectorElemento]`) as SectorElemento) ||
          null,
        tiposPatologia: formData.getAll(
          `sectores[${i}][tiposPatologia]`,
        ) as TipoPatologiaSector[],
        colorMancha: formData.getAll(
          `sectores[${i}][colorMancha]`,
        ) as ColorMancha[],
        tamanioPatologia:
          (formData.get(`sectores[${i}][tamanio]`) as string) || null,
        observaciones:
          (formData.get(`sectores[${i}][observaciones]`) as string) || null,
      });
    }
    i++;
  }

  return sectores;
}

export async function crearInspeccion(
  _prevState: InspectionState,
  formData: FormData,
): Promise<InspectionState> {
  const raw = Object.fromEntries(formData) as Record<string, unknown>;

  // arrays vienen repetidos como múltiples entries del mismo name en FormData
  const asArray = (key: string) => formData.getAll(key).map(String);
  raw.motivo = asArray("motivo");
  raw.exterior = asArray("exterior");
  raw.interior = asArray("interior");
  raw.hipotesis = asArray("hipotesis");
  raw.instrumentos = asArray("instrumentos");
  raw.registroFotografico = formData.get("registroFotografico") === "on";
  raw.requiereInforme = formData.get("requiereInforme") === "on";

  const parsed = inspectionSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return { status: "error", errors, message: "Revisá los campos marcados" };
  }

  const data: InspectionData = parsed.data;

  // ---- Patologías: sólo las que tienen estado cargado ----
  const patologias = patologiaRows
    .map((row) => {
      const estado = data[`pat_${row.value}_estado` as any] as
        string | undefined;
      if (!estado) return null;
      const nivel = data[`pat_${row.value}_nivel` as any] as string | undefined;
      return {
        tipo: patologiaMap[row.value],
        presente: estado === "si",
        severidad: nivel ? severidadMap[nivel] : null,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  // ---- Sectores afectados: sólo ambientes con algún dato cargado ----
  const sectoresAfectados = parseSectoresAfectados(formData);

  try {
    const visita = await prisma.$transaction(async (tx) => {
      const cliente = await tx.cliente.create({
        data: {
          nombre: data.nombre,
          telefono: data.telefono,
          email: data.email,
        },
      });

      const inmueble = await tx.inmueble.create({
        data: {
          clienteId: cliente.id,
          direccion: data.direccion,
          barrioCiudad: data.barrioCiudad || null,
          tipoPropiedad: tipoPropiedadMap[data.tipoPropiedad],
          antiguedadAnios:
            data.antiguedad === "" || data.antiguedad === undefined
              ? null
              : Number(data.antiguedad),
          tieneReformas: data.reformas === "si",
          detalleReformas: data.reformasCuales || null,
        },
      });

      return tx.visitaTecnica.create({
        data: {
          numeroExpediente: data.expediente || null,
          fecha: data.fecha ? new Date(data.fecha) : new Date(),
          hora: data.hora || null,
          arquitectaResponsable: data.arquitecta,

          motivosConsulta: data.motivo.map((m: any) => motivoMap[m]),
          motivoOtroDetalle: data.motivoOtro || null,
          observacionesCliente: data.observacionesCliente || null,

          requiereInformeCompleto: data.requiereInforme,

          clienteId: cliente.id,
          inmuebleId: inmueble.id,

          instrumentosUtilizados: data.instrumentos.map(
            (i: any) => instrumentoMap[i],
          ),

          inspeccionGeneral: {
            create: {
              sectoresExterior: data.exterior.map((e: any) => exteriorMap[e]),
              observacionesExterior: data.exteriorObs || null,
              sectoresInterior: data.interior.map((i: any) => interiorMap[i]),
              observacionesInterior: data.interiorObs || null,
            },
          },

          patologias: {
            create: patologias,
          },

          sectoresAfectados: {
            create: sectoresAfectados,
          },

          hipotesisPreliminar: {
            create: {
              hipotesis: data.hipotesis.map((h: any) => hipotesisMap[h]),
              observacionesTecnicas: data.observacionesTecnicas || null,
            },
          },

          registroFotografico: {
            create: {
              realizado: data.registroFotografico,
            },
          },
        },
      });
    });

    revalidatePath("/visitas");
    return { status: "success", inspeccion: visita.id };
  } catch (err) {
    console.error("Error creando inspección:", err);
    return { status: "error", message: "No se pudo guardar la inspección" };
  }
}

export async function getReports(): Promise<any[]> {
  try {
    const reportes = await prisma.visitaTecnica.findMany({
      include: {
        cliente: true,
        inmueble: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return reportes;
  } catch (err) {
    console.error("Error obteniendo informes:", err);
    return [];
  }
}

export async function getInformeDetalle(id: string) {
  try {
    const informe = await prisma.visitaTecnica.findUnique({
      where: { id },
      include: {
        cliente: true,
        inmueble: true,
        sectoresAfectados: true,
        inspeccionGeneral: true,
        patologias: true,
        hipotesisPreliminar: true,
        registroFotografico: {
          include: {
            fotos: true,
          },
        },
      },
    });
    if (!informe) {
      return null;
    }
    return informe;
  } catch (err) {
    console.error("Error obteniendo informe detalle:", err);
    return null;
  }
}

export async function createInformeGenerado(resultado: any, id: string) {
  try {
    const informeGuardado = await prisma.informeGenerado.upsert({
      where: {
        visitaId: id,
      },

      create: {
        visitaId: id,
        version: 1,
        contenido: resultado.contenido,
        modelo: resultado.modelo,
        promptVersion: resultado.promptVersion,
      },

      update: {
        version: {
          increment: 1,
        },

        contenido: resultado.contenido,

        modelo: resultado.modelo,

        promptVersion: resultado.promptVersion,
      },
    });
  } catch (err) {
    console.error("Error creando informe generado:", err);
  }
}

export async function crearInspeccionDesdeOrden(
  ordenId: string,
  _prevState: InspectionState,
  formData: FormData,
): Promise<InspectionState> {
  const orden = await prisma.orden.findUnique({
    where: { id: ordenId },
    select: { clienteId: true, inmuebleId: true, estado: true },
  });

  if (!orden) {
    return { status: "error", message: "Orden no encontrada" };
  }

  const raw = Object.fromEntries(formData) as Record<string, unknown>;
  const asArray = (key: string) => formData.getAll(key).map(String);
  raw.motivo = asArray("motivo");
  raw.exterior = asArray("exterior");
  raw.interior = asArray("interior");
  raw.hipotesis = asArray("hipotesis");
  raw.instrumentos = asArray("instrumentos");
  raw.registroFotografico = formData.get("registroFotografico") === "on";
  raw.fotos = asArray("fotos").map((img, index) => ({
    url: img,
  }));

  raw.requiereInforme = formData.get("requiereInforme") === "on";

  const parsed = inspectionSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return { status: "error", errors, message: "Revisá los campos marcados" };
  }

  const data: InspectionData = parsed.data;

  const patologias = patologiaRows
    .map((row) => {
      const estado = data[`pat_${row.value}_estado` as any] as
        string | undefined;
      if (!estado) return null;
      const nivel = data[`pat_${row.value}_nivel` as any] as string | undefined;
      return {
        tipo: patologiaMap[row.value],
        presente: estado === "si",
        severidad: nivel ? severidadMap[nivel] : null,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const sectoresAfectados = parseSectoresAfectados(formData);

  try {
    const visita = await prisma.$transaction(async (tx) => {
      const nuevaVisita = await tx.visitaTecnica.create({
        data: {
          numeroExpediente: data.expediente || null,
          fecha: data.fecha ? new Date(data.fecha) : new Date(),
          hora: data.hora || null,
          arquitectaResponsable: data.arquitecta,

          motivosConsulta: data.motivo.map((m: any) => motivoMap[m]),
          motivoOtroDetalle: data.motivoOtro || null,
          observacionesCliente: data.observacionesCliente || null,

          requiereInformeCompleto: data.requiereInforme,

          clienteId: orden.clienteId,
          inmuebleId: orden.inmuebleId,
          ordenId: ordenId,

          instrumentosUtilizados: data.instrumentos.map(
            (i: any) => instrumentoMap[i],
          ),

          inspeccionGeneral: {
            create: {
              sectoresExterior: data.exterior.map((e: any) => exteriorMap[e]),
              observacionesExterior: data.exteriorObs || null,
              sectoresInterior: data.interior.map((i: any) => interiorMap[i]),
              observacionesInterior: data.interiorObs || null,
            },
          },

          patologias: { create: patologias },
          sectoresAfectados: { create: sectoresAfectados },

          hipotesisPreliminar: {
            create: {
              hipotesis: data.hipotesis.map((h: any) => hipotesisMap[h]),
              observacionesTecnicas: data.observacionesTecnicas || null,
            },
          },

          registroFotografico: {
            create: { realizado: data.registroFotografico },
          },
        },
        include: {
          registroFotografico: true, 
        },
      });

      await tx.fotoRelevamiento.createMany({
        data: data.fotos.map((f: any) => ({
          registroId: nuevaVisita.registroFotografico!.id,
          url: f.url,
        })),
      });

      await tx.orden.update({
        where: { id: ordenId },
        data: { estado: "COMPLETADA" },
      });

      return nuevaVisita;
    });

    revalidatePath("/panel/informes");
    return { status: "success", inspeccion: visita.id };
  } catch (err) {
    console.error("Error creando inspección desde orden:", err);
    return { status: "error", message: "No se pudo guardar la inspección" };
  }
}

export async function actualizarInspeccionDesdeOrden(
  visitaId: string,
  _prevState: InspectionState,
  formData: FormData,
): Promise<InspectionState> {
  const raw = Object.fromEntries(formData) as Record<string, unknown>;
  const asArray = (key: string) => formData.getAll(key).map(String);
  raw.motivo = asArray("motivo");
  raw.exterior = asArray("exterior");
  raw.interior = asArray("interior");
  raw.hipotesis = asArray("hipotesis");
  raw.instrumentos = asArray("instrumentos");
  raw.registroFotografico = formData.get("registroFotografico") === "on";
  raw.fotos = asArray("fotos").map((img) => ({ url: img }));
  raw.requiereInforme = formData.get("requiereInforme") === "on";

  const parsed = inspectionSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return { status: "error", errors, message: "Revisá los campos marcados" };
  }

  const data: InspectionData = parsed.data;

  const patologias = patologiaRows
    .map((row) => {
      const estado = data[`pat_${row.value}_estado` as any] as string | undefined;
      if (!estado) return null;
      const nivel = data[`pat_${row.value}_nivel` as any] as string | undefined;
      return {
        tipo: patologiaMap[row.value],
        presente: estado === "si",
        severidad: nivel ? severidadMap[nivel] : null,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const sectoresAfectados = parseSectoresAfectados(formData);

  try {
    const visita = await prisma.$transaction(async (tx) => {
      const visitaActualizada = await tx.visitaTecnica.update({
        where: { id: visitaId },
        data: {
          numeroExpediente: data.expediente || null,
          fecha: data.fecha ? new Date(data.fecha) : new Date(),
          hora: data.hora || null,
          arquitectaResponsable: data.arquitecta,

          motivosConsulta: data.motivo.map((m: any) => motivoMap[m]),
          motivoOtroDetalle: data.motivoOtro || null,
          observacionesCliente: data.observacionesCliente || null,

          requiereInformeCompleto: data.requiereInforme,

          instrumentosUtilizados: data.instrumentos.map((i: any) => instrumentoMap[i]),

          inspeccionGeneral: {
            upsert: {
              create: {
                sectoresExterior: data.exterior.map((e: any) => exteriorMap[e]),
                observacionesExterior: data.exteriorObs || null,
                sectoresInterior: data.interior.map((i: any) => interiorMap[i]),
                observacionesInterior: data.interiorObs || null,
              },
              update: {
                sectoresExterior: data.exterior.map((e: any) => exteriorMap[e]),
                observacionesExterior: data.exteriorObs || null,
                sectoresInterior: data.interior.map((i: any) => interiorMap[i]),
                observacionesInterior: data.interiorObs || null,
              },
            },
          },

          patologias: {
            deleteMany: {},
            create: patologias,
          },

          sectoresAfectados: {
            deleteMany: {},
            create: sectoresAfectados,
          },

          hipotesisPreliminar: {
            upsert: {
              create: {
                hipotesis: data.hipotesis.map((h: any) => hipotesisMap[h]),
                observacionesTecnicas: data.observacionesTecnicas || null,
              },
              update: {
                hipotesis: data.hipotesis.map((h: any) => hipotesisMap[h]),
                observacionesTecnicas: data.observacionesTecnicas || null,
              },
            },
          },

          registroFotografico: {
            upsert: {
              create: { realizado: data.registroFotografico },
              update: { realizado: data.registroFotografico },
            },
          },
        },
        include: { registroFotografico: true },
      });

      // fotos: reemplazamos el set completo
      await tx.fotoRelevamiento.deleteMany({
        where: { registroId: visitaActualizada.registroFotografico!.id },
      });
      if (data.fotos?.length) {
        await tx.fotoRelevamiento.createMany({
          data: data.fotos.map((f: any) => ({
            registroId: visitaActualizada.registroFotografico!.id,
            url: f.url,
          })),
        });
      }

      return visitaActualizada;
    });

    revalidatePath("/panel/informes");
    return { status: "success", inspeccion: visita.id };
  } catch (err) {
    console.error("Error actualizando inspección:", err);
    return { status: "error", message: "No se pudo actualizar la inspección" };
  }
}