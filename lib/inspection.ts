import { z } from "zod"

/* -------------------------------------------------------------------------- */
/*  Option definitions (single source of truth for form + server action)      */
/* -------------------------------------------------------------------------- */

export type Option = { value: string; label: string }

export const tipoPropiedadOptions: Option[] = [
  { value: "casa", label: "Casa" },
  { value: "departamento", label: "Departamento" },
  { value: "local", label: "Local" },
  { value: "oficina", label: "Oficina" },
  { value: "ph", label: "PH" },
]

export const motivoOptions: Option[] = [
  { value: "humedad", label: "Humedad" },
  { value: "grietas", label: "Grietas" },
  { value: "fisuras", label: "Fisuras" },
  { value: "filtraciones", label: "Filtraciones" },
  { value: "rajaduras", label: "Rajaduras" },
  { value: "desprendimiento", label: "Desprendimiento de pintura" },
  { value: "moho", label: "Moho / hongos" },
  { value: "otro", label: "Otro" },
]

export const exteriorOptions: Option[] = [
  { value: "fachadas", label: "Fachadas" },
  { value: "medianeras", label: "Medianeras" },
  { value: "cubierta", label: "Cubierta" },
  { value: "azotea", label: "Azotea / terraza" },
  { value: "patios", label: "Patios" },
  { value: "desagues", label: "Desagües pluviales" },
]

export const interiorOptions: Option[] = [
  { value: "muros", label: "Muros" },
  { value: "cielorrasos", label: "Cielorrasos" },
  { value: "pisos", label: "Pisos" },
  { value: "carpinterias", label: "Carpinterías" },
  { value: "instalaciones", label: "Instalaciones sanitarias / electricidad" },
]

export const patologiaRows: Option[] = [
  { value: "humedad_ascendente", label: "Humedad ascendente (por capilaridad)" },
  { value: "condensacion", label: "Condensación" },
  { value: "filtracion", label: "Filtración / pérdida de cañería" },
  { value: "grieta_muro", label: "Grieta en muro" },
  { value: "fisura_muro", label: "Fisura en muro" },
]

export const severidadOptions: Option[] = [
  { value: "leve", label: "Leve" },
  { value: "media", label: "Media" },
  { value: "alta", label: "Alta" },
]

export const ambientes: Option[] = [
  { value: "living", label: "Living" },
  { value: "cocina", label: "Cocina" },
  { value: "dormitorio_1", label: "Dormitorio 1" },
  { value: "dormitorio_2", label: "Dormitorio 2" },
  { value: "bano", label: "Baño" },
  { value: "otro", label: "Otro" },
]

export const hipotesisOptions: Option[] = [
  { value: "capilaridad", label: "Capilaridad" },
  { value: "impermeabilizacion", label: "Falta de impermeabilización" },
  { value: "puente_termico", label: "Puente térmico" },
  { value: "falla_constructiva", label: "Falla constructiva" },
  { value: "asentamiento", label: "Asentamiento estructural" },
  { value: "instalacion", label: "Instalación defectuosa" },
  { value: "movimiento_suelo", label: "Movimiento de suelo" },
  { value: "otra", label: "Otra" },
]

export const instrumentosOptions: Option[] = [
  { value: "inspeccion_visual", label: "Inspección visual" },
  { value: "medidor_humedad", label: "Medidor de humedad" },
  { value: "camara_termica", label: "Cámara térmica" },
  { value: "nivel_laser", label: "Nivel láser" },
  { value: "cinta_metrica", label: "Cinta métrica" },
  { value: "otros", label: "Otros" },
]

/* -------------------------------------------------------------------------- */
/*  Zod schema                                                                 */
/* -------------------------------------------------------------------------- */

const optional = z
  .string()
  .trim()
  .max(2000, "Máximo 2000 caracteres")
  .optional()

const patologiaEstado = z.enum(["si", "no"]).optional()
const patologiaNivel = z.enum(["leve", "media", "alta"]).optional()

const patologiaObject = Object.fromEntries(
  patologiaRows.flatMap((row) => [
    [`pat_${row.value}_estado`, patologiaEstado],
    [`pat_${row.value}_nivel`, patologiaNivel],
  ]),
)

const ambienteObject = Object.fromEntries(
  ambientes.flatMap((amb) => [
    [`amb_${amb.value}_problema`, optional],
    [`amb_${amb.value}_medicion`, optional],
    [`amb_${amb.value}_obs`, optional],
  ]),
)

export const inspectionSchema = z.object({
  // Encabezado
  expediente: optional,
  fecha: optional,
  hora: optional,
  arquitecta: z.string().trim().min(1, "Ingresá el profesional responsable"),

  // 1. Datos del cliente
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresá el nombre y apellido del cliente")
    .max(120, "Máximo 120 caracteres"),
  telefono: z
    .string()
    .trim()
    .min(6, "Ingresá un teléfono válido")
    .max(30, "Máximo 30 caracteres"),
  email: z.string().trim().email("Ingresá un email válido"),
  direccion: z.string().trim().min(3, "Ingresá la dirección del inmueble"),
  barrioCiudad: optional,
  tipoPropiedad: z.enum(
    tipoPropiedadOptions.map((o) => o.value) as [string, ...string[]],
    { message: "Seleccioná el tipo de propiedad" },
  ),
  antiguedad: z
    .union([z.literal(""), z.coerce.number().int().min(0).max(1000)])
    .optional(),
  reformas: z.enum(["si", "no"]).optional(),
  reformasCuales: optional,

  // 2. Motivo de consulta
  motivo: z.array(z.string()).default([]),
  motivoOtro: optional,
  observacionesCliente: optional,

  // 3. Inspección general
  exterior: z.array(z.string()).default([]),
  exteriorObs: optional,
  interior: z.array(z.string()).default([]),
  interiorObs: optional,

  // 4. Relevamiento patológico
  ...patologiaObject,

  // 5. Sectores afectados
  ...ambienteObject,

  // 6. Hipótesis preliminar
  hipotesis: z.array(z.string()).default([]),
  observacionesTecnicas: optional,

  // 7 / 8 / 9
  registroFotografico: z.boolean().default(false),
  instrumentos: z.array(z.string()).default([]),
  requiereInforme: z.boolean().default(false),
})

export type InspectionData = z.infer<typeof inspectionSchema>

export type FieldErrors = Record<string, string>

export type InspectionState = {
  status: "idle" | "success" | "error"
  message?: string
  errors?: FieldErrors
  fotos?: number,
  inspeccion?: string,
}
