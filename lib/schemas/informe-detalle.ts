export type Cliente = {
  id: string
  nombre: string
  telefono: string
  email: string
  createdAt: string
  updatedAt: string
  isSuperAdmin: boolean
}

export type Inmueble = {
  id: string
  direccion: string
  barrioCiudad: string
  tipoPropiedad: string
  antiguedadAnios: number
  tieneReformas: boolean
  detalleReformas: string | null
  clienteId: string
  createdAt: string
  updatedAt: string
}

export type Severidad = "LEVE" | "MEDIA" | "ALTA"

export type Patologia = {
  tipo: string
  presente: boolean
  severidad: Severidad | null
}

export type SectorAfectado = {
  ambiente: string
  problema: string
  medicion: string | null
  observaciones: string | null
}

export type Informe = {
  id: string
  numeroExpediente: string
  fecha: string
  hora: string
  arquitectaResponsable: string
  // Motivo de consulta
  motivosConsulta: string[]
  motivoOtroDetalle: string | null
  observacionesCliente: string | null
  // Inspección general
  inspeccionGeneral: any
  exterior: string[]
  observacionesExterior: string | null
  interior: string[]
  observacionesInterior: string | null
  // Relevamiento patológico
  patologias: Patologia[]
  // Sectores afectados por ambiente
  sectoresAfectados: SectorAfectado[]
  // Hipótesis preliminar
  hipotesis: string[]
  observacionesTecnicas: string | null
  // Registro fotográfico
  registroFotografico: boolean
  fotos: string[]
  // Instrumentos
  instrumentosUtilizados: string[]
  instrumentoOtroDetalle: string | null
  // Cierre
  requiereInformeCompleto: boolean
  firmaProfesionalUrl: string | null
  firmaClienteUrl: string | null
  clienteId: string
  inmuebleId: string
  createdAt: string
  updatedAt: string
  cliente: Cliente
  inmueble: Inmueble
}

export const MOTIVO_LABELS: Record<string, string> = {
  HUMEDAD: "Humedad",
  GRIETAS: "Grietas",
  FISURAS: "Fisuras",
  FILTRACIONES: "Filtraciones",
  RAJADURAS: "Rajaduras",
  DESPRENDIMIENTO_PINTURA: "Desprendimiento de pintura",
  MOHO_HONGOS: "Moho / Hongos",
  OTRO: "Otro",
}

export const EXTERIOR_LABELS: Record<string, string> = {
  FACHADA: "Fachada",
  MEDIANERAS: "Medianeras",
  TECHOS_CUBIERTAS: "Techos / Cubiertas",
  CANALETAS_DESAGUES: "Canaletas y desagües",
  BALCONES: "Balcones",
  CARPINTERIAS: "Carpinterías exteriores",
  REVOQUES: "Revoques exteriores",
}

export const INTERIOR_LABELS: Record<string, string> = {
  MUROS: "Muros",
  CIELORRASOS: "Cielorrasos",
  PISOS: "Pisos",
  INSTALACION_ELECTRICA: "Instalación eléctrica",
  INSTALACION_SANITARIA: "Instalación sanitaria",
  CARPINTERIAS_INT: "Carpinterías interiores",
  REVESTIMIENTOS: "Revestimientos",
}

export const HIPOTESIS_LABELS: Record<string, string> = {
  HUMEDAD_CAPILAR: "Humedad por capilaridad",
  HUMEDAD_CONDENSACION: "Humedad por condensación",
  FILTRACION_CUBIERTA: "Filtración desde cubierta",
  FILTRACION_CANERIA: "Filtración de cañería",
  ASENTAMIENTO_ESTRUCTURAL: "Asentamiento estructural",
  DILATACION_TERMICA: "Dilatación térmica",
  FALLA_CONSTRUCTIVA: "Falla constructiva",
  FALTA_MANTENIMIENTO: "Falta de mantenimiento",
}

export const INSTRUMENTO_LABELS: Record<string, string> = {
  INSPECCION_VISUAL: "Inspección visual",
  MEDIDOR_HUMEDAD: "Medidor de humedad",
  CAMARA_TERMICA: "Cámara térmica",
  NIVEL_LASER: "Nivel láser",
  CINTA_METRICA: "Cinta métrica",
  OTRO: "Otro",
}

export const TIPO_PROPIEDAD_LABELS: Record<string, string> = {
  CASA: "Casa",
  DEPARTAMENTO: "Departamento",
  LOCAL: "Local comercial",
  OFICINA: "Oficina",
  GALPON: "Galpón",
  TERRENO: "Terreno",
}

export const SEVERIDAD_LABELS: Record<Severidad, string> = {
  LEVE: "Leve",
  MEDIA: "Moderada",
  ALTA: "Severa",
}

export function formatFecha(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
/*
export const informeEjemplo: Informe = {
  id: "cmstdajra0002mgv2pylfvkg1",
  numeroExpediente: "2026-014",
  fecha: "2026-08-14T00:00:00.000Z",
  hora: "21:58",
  arquitectaResponsable: "Julieta Rojo",
  motivosConsulta: ["HUMEDAD", "GRIETAS", "FILTRACIONES", "MOHO_HONGOS", "OTRO"],
  motivoOtroDetalle: "Manchas recurrentes en el cielorraso del dormitorio principal.",
  observacionesCliente:
    "El cliente reporta que las manchas aparecen con mayor intensidad tras las lluvias y que el olor a humedad persiste durante el invierno.",
  exterior: ["FACHADA", "TECHOS_CUBIERTAS", "CANALETAS_DESAGUES", "REVOQUES"],
  observacionesExterior:
    "Se observa deterioro del revoque en la fachada norte y acumulación de agua en canaletas obstruidas.",
  interior: ["MUROS", "CIELORRASOS", "INSTALACION_SANITARIA"],
  observacionesInterior:
    "Cielorraso del dormitorio con manchas de humedad activa y desprendimiento de pintura en muros perimetrales.",
  patologias: [
    { tipo: "Humedad ascendente", presente: true, severidad: "MEDIA" },
    { tipo: "Filtración de cubierta", presente: true, severidad: "ALTA" },
    { tipo: "Fisuras en muros", presente: true, severidad: "LEVE" },
    { tipo: "Grietas estructurales", presente: false, severidad: null },
    { tipo: "Desprendimiento de revoque", presente: true, severidad: "MEDIA" },
  ],
  sectoresAfectados: [
    {
      ambiente: "Dormitorio principal",
      problema: "Humedad en cielorraso y muro exterior",
      medicion: "Humedad relativa 82%",
      observaciones: "Zona más afectada, sobre la esquina noreste.",
    },
    {
      ambiente: "Baño",
      problema: "Filtración en unión de pared y techo",
      medicion: "Humedad relativa 76%",
      observaciones: "Posible falla en impermeabilización de losa.",
    },
    {
      ambiente: "Cocina",
      problema: "Desprendimiento de pintura",
      medicion: null,
      observaciones: "Afectación superficial, sin humedad activa detectada.",
    },
  ],
  hipotesis: ["FILTRACION_CUBIERTA", "HUMEDAD_CAPILAR", "FALTA_MANTENIMIENTO"],
  observacionesTecnicas:
    "Se recomienda revisión de la impermeabilización de la cubierta y desobstrucción de canaletas antes de intervenir los cielorrasos afectados.",
  registroFotografico: true,
  fotos: [],
  instrumentosUtilizados: ["INSPECCION_VISUAL", "MEDIDOR_HUMEDAD", "CAMARA_TERMICA", "CINTA_METRICA"],
  instrumentoOtroDetalle: null,
  requiereInformeCompleto: true,
  firmaProfesionalUrl: null,
  firmaClienteUrl: null,
  clienteId: "cmstdaje70000mgv2osp840em",
  inmuebleId: "cmstdajjj0001mgv2k08m2tfw",
  createdAt: "2026-08-14T19:56:01.798Z",
  updatedAt: "2026-08-14T19:56:01.798Z",
  cliente: {
    id: "cmstdaje70000mgv2osp840em",
    nombre: "Juan Carlos Pérez",
    telefono: "3415807001",
    email: "jcperez@example.com",
    createdAt: "2026-08-14T19:56:01.327Z",
    updatedAt: "2026-08-14T19:56:01.327Z",
    isSuperAdmin: false,
  },
  inmueble: {
    id: "cmstdajjj0001mgv2k08m2tfw",
    direccion: "San Lorenzo 833",
    barrioCiudad: "Rosario",
    tipoPropiedad: "DEPARTAMENTO",
    antiguedadAnios: 22,
    tieneReformas: true,
    detalleReformas: "Renovación de baño y cocina hace 5 años.",
    clienteId: "cmstdaje70000mgv2osp840em",
    createdAt: "2026-08-14T19:56:01.519Z",
    updatedAt: "2026-08-14T19:56:01.519Z",
  },
}
*/