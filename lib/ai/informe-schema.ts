import { z } from "zod";

export const informeGeneradoSchema = z.object({
  objetoInforme: z.string(),

  documentacionObjetiva: z.string(),

  sintomasYPosiblesCausas: z.string(),

  gravedadUrgencia: z.string(),

  conclusionHipotesis: z.string(),

  accionesCorrectivasPreventivas: z.array(
    z.object({
      titulo: z.string(),
      descripcion: z.string(),
    }),
  ),

  observacionesFinales: z.string().nullable(),
});

export type InformeGenerado = z.infer<typeof informeGeneradoSchema>;