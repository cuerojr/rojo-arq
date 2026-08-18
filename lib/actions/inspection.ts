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
  const sectoresAfectados = ambientes
    .map((amb) => {
      const problema = data[`amb_${amb.value}_problema` as any] as
        string | undefined;
      const medicion = data[`amb_${amb.value}_medicion` as any] as
        string | undefined;
      const obs = data[`amb_${amb.value}_obs` as any] as string | undefined;
      if (!problema && !medicion && !obs) return null;
      return {
        ambiente: ambienteMap[amb.value],
        ambienteOtroDetalle: amb.value === "otro" ? amb.label : null,
        problemaDetectado: problema || null,
        medicionAprox: medicion || null,
        observaciones: obs || null,
      };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

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
