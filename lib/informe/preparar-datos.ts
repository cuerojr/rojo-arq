import type { Prisma } from "@/generated/prisma/client";

export type DatosInformeIA = {
  visita: {
    expediente: string | null;
    fecha: string;
    hora: string | null;
    arquitectaResponsable: string;
    motivos: string[];
    motivoOtroDetalle: string | null;
    observacionesCliente: string | null;
  };

  cliente: {
    nombre: string;
  };

  inmueble: {
    direccion: string;
    barrioCiudad: string | null;
    tipoPropiedad: string;
    antiguedadAnios: number | null;
    tieneReformas: boolean;
    detalleReformas: string | null;
  };

  inspeccion: {
    exterior: {
      sectores: string[];
      observaciones: string | null;
    };
    interior: {
      sectores: string[];
      observaciones: string | null;
    };
  };

  patologias: {
    tipo: string;
    presente: boolean;
    severidad: string | null;
  }[];

  sectoresAfectados: {
    ambiente: string;
    ambienteOtroDetalle: string | null;
    problemaDetectado: string | null;
    medicionAprox: string | null;
    observaciones: string | null;
  }[];

  hipotesis: {
    causas: string[];
    observacionesTecnicas: string | null;
  } | null;

  instrumentos: string[];

  registroFotografico: {
    realizado: boolean;
    fotos: {
      descripcion: string | null;
    }[];
  } | null;
};

type InformeDetalle = Prisma.VisitaTecnicaGetPayload<{
  include: {
    cliente: true;
    inmueble: true;
    sectoresAfectados: true;
    inspeccionGeneral: true;
    patologias: true;
    hipotesisPreliminar: true;
    registroFotografico: {
      include: {
        fotos: true;
      };
    };
  };
}>;

export function prepararDatosInforme(
  informe: InformeDetalle,
): DatosInformeIA {
  return {
    visita: {
      expediente: informe.numeroExpediente,

      fecha: informe.fecha.toISOString(),

      hora: informe.hora,

      arquitectaResponsable:
        informe.arquitectaResponsable,

      motivos: informe.motivosConsulta,

      motivoOtroDetalle:
        informe.motivoOtroDetalle,

      observacionesCliente:
        informe.observacionesCliente,
    },

    cliente: {
      nombre: informe.cliente.nombre,
    },

    inmueble: {
      direccion: informe.inmueble.direccion,

      barrioCiudad:
        informe.inmueble.barrioCiudad,

      tipoPropiedad:
        informe.inmueble.tipoPropiedad,

      antiguedadAnios:
        informe.inmueble.antiguedadAnios,

      tieneReformas:
        informe.inmueble.tieneReformas,

      detalleReformas:
        informe.inmueble.detalleReformas,
    },

    inspeccion: {
      exterior: {
        sectores:
          informe.inspeccionGeneral
            ?.sectoresExterior ?? [],

        observaciones:
          informe.inspeccionGeneral
            ?.observacionesExterior ?? null,
      },

      interior: {
        sectores:
          informe.inspeccionGeneral
            ?.sectoresInterior ?? [],

        observaciones:
          informe.inspeccionGeneral
            ?.observacionesInterior ?? null,
      },
    },

    patologias: informe.patologias.map((patologia: any) => ({
      tipo: patologia.tipo,
      presente: patologia.presente,
      severidad: patologia.severidad,
    })),

    sectoresAfectados:
      informe.sectoresAfectados.map((sector: any) => ({
        ambiente: sector.ambiente,

        ambienteOtroDetalle:
          sector.ambienteOtroDetalle,

        problemaDetectado:
          sector.problemaDetectado,

        medicionAprox:
          sector.medicionAprox,

        observaciones:
          sector.observaciones,
      })),

    hipotesis: informe.hipotesisPreliminar
      ? {
          causas:
            informe.hipotesisPreliminar.hipotesis,

          observacionesTecnicas:
            informe.hipotesisPreliminar
              .observacionesTecnicas,
        }
      : null,

    instrumentos:
      informe.instrumentosUtilizados,

    registroFotografico:
      informe.registroFotografico
        ? {
            realizado:
              informe.registroFotografico.realizado,

            fotos:
              informe.registroFotografico.fotos.map(
                (foto: any) => ({
                  descripcion:
                    foto.descripcion,
                }),
              ),
          }
        : null,
  };
}