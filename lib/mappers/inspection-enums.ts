// lib/mappers/inspection-enums.ts
import {
  TipoPropiedad,
  TipoMotivoConsulta,
  SectorExterior,
  SectorInterior,
  TipoPatologia,
  NivelSeveridad,
  Ambiente,
  TipoHipotesis,
  TipoInstrumento,
} from "@/generated/prisma/client"

export const tipoPropiedadMap: Record<string, TipoPropiedad> = {
  casa: "CASA",
  departamento: "DEPARTAMENTO",
  local: "LOCAL",
  oficina: "OFICINA",
  ph: "PH",
}

export const motivoMap: Record<string, TipoMotivoConsulta> = {
  humedad: "HUMEDAD",
  grietas: "GRIETAS",
  fisuras: "FISURAS",
  filtraciones: "FILTRACIONES",
  rajaduras: "RAJADURAS",
  desprendimiento: "DESPRENDIMIENTO_PINTURA",
  moho: "MOHO_HONGOS",
  otro: "OTRO",
}

export const exteriorMap: Record<string, SectorExterior> = {
  fachadas: "FACHADAS",
  medianeras: "MEDIANERAS",
  cubierta: "CUBIERTA",
  azotea: "AZOTEA_TERRAZA",
  patios: "PATIOS",
  desagues: "DESAGUES_PLUVIALES",
}

export const interiorMap: Record<string, SectorInterior> = {
  muros: "MUROS",
  cielorrasos: "CIELORRASOS",
  pisos: "PISOS",
  carpinterias: "CARPINTERIAS",
  instalaciones: "INSTALACIONES_SANITARIAS_ELECTRICIDAD",
}

export const patologiaMap: Record<string, TipoPatologia> = {
  humedad_ascendente: "HUMEDAD_ASCENDENTE_CAPILARIDAD",
  condensacion: "CONDENSACION",
  filtracion: "FILTRACION_PERDIDA_CANERIA",
  grieta_muro: "GRIETA_MURO",
  fisura_muro: "FISURA_MURO",
}

export const severidadMap: Record<string, NivelSeveridad> = {
  leve: "LEVE",
  media: "MEDIA",
  alta: "ALTA",
}

export const ambienteMap: Record<string, Ambiente> = {
  living: "LIVING",
  cocina: "COCINA",
  dormitorio_1: "DORMITORIO_1",
  dormitorio_2: "DORMITORIO_2",
  bano: "BANO",
  otro: "OTRO",
}

export const hipotesisMap: Record<string, TipoHipotesis> = {
  capilaridad: "CAPILARIDAD",
  impermeabilizacion: "FALTA_IMPERMEABILIZACION",
  puente_termico: "PUENTE_TERMICO",
  falla_constructiva: "FALLA_CONSTRUCTIVA",
  asentamiento: "ASENTAMIENTO_ESTRUCTURAL",
  instalacion: "INSTALACION_DEFECTUOSA",
  movimiento_suelo: "MOVIMIENTO_SUELO",
  otra: "OTRA",
}

export const instrumentoMap: Record<string, TipoInstrumento> = {
  inspeccion_visual: "INSPECCION_VISUAL",
  medidor_humedad: "MEDIDOR_HUMEDAD",
  camara_termica: "CAMARA_TERMICA",
  nivel_laser: "NIVEL_LASER",
  cinta_metrica: "CINTA_METRICA",
  otros: "OTROS",
}