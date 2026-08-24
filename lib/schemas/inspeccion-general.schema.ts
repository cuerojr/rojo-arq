// lib/schemas/inspeccion-general.schema.ts
import { z } from "zod";
import { SectorExterior, SectorInterior } from "@/generated/prisma/client";

export const inspeccionGeneralSchema = z.object({
  visitaId: z.string().cuid(),
  sectoresExterior: z.array(z.nativeEnum(SectorExterior)),
  observacionesExterior: z.string().optional(),
  sectoresInterior: z.array(z.nativeEnum(SectorInterior)),
  observacionesInterior: z.string().optional(),
});

export type InspeccionGeneralInput = z.infer<typeof inspeccionGeneralSchema>;