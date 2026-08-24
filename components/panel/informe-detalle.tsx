import {
  AlertTriangle,
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  ClipboardList,
  FileText,
  FlaskConical,
  Home,
  LayoutGrid,
  Mail,
  MapPin,
  Phone,
  Ruler,
  Search,
  User,
  Wrench,
} from "lucide-react"
import {
  type Informe,
  type Severidad,
  EXTERIOR_LABELS,
  HIPOTESIS_LABELS,
  INSTRUMENTO_LABELS,
  INTERIOR_LABELS,
  MOTIVO_LABELS,
  SEVERIDAD_LABELS,
  TIPO_PROPIEDAD_LABELS,
  formatFecha,
} from "@/lib/schemas/informe-detalle";

import { PrintButton } from "@/components/panel/print-button"

function SectionTitle({
  icon: Icon,
  title,
  step,
  description,
}: {
  icon: React.ElementType
  title: string
  step: string
  description?: string
}) {
  return (
    <div className="flex items-start gap-3 border-b border-border pb-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <div className="flex flex-col">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{step}</span>
        <h2 className="text-lg font-semibold leading-tight text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value || "—"}</dd>
    </div>
  )
}

function Chips({
  items,
  labels,
  icon: Icon,
}: {
  items: string[]
  labels: Record<string, string>
  icon: React.ElementType
}) {
  if (items?.length === 0) {
    return <p className="text-sm text-muted-foreground">Sin ítems registrados.</p>
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items?.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
        >
          <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
          {labels[item] ?? item}
        </span>
      ))}
    </div>
  )
}

function ObsBox({ label, value }: { label: string; value: string | null }) {
  if (!value) return null
  return (
    <div className="rounded-md bg-muted p-3">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  )
}

const SEVERIDAD_STYLES: Record<Severidad, string> = {
  LEVE: "bg-primary/10 text-primary",
  MEDIA: "bg-chart-4/15 text-foreground",
  ALTA: "bg-destructive/10 text-destructive",
}

function SeveridadBadge({ severidad }: { severidad: Severidad | null }) {
    if (!severidad) return <span className="text-muted-foreground">—</span>
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${SEVERIDAD_STYLES[severidad]}`}
    >
      {SEVERIDAD_LABELS[severidad]}
    </span>
  )
}

export function InformeDetalle({ informe }: { informe: Informe }) {
  const { cliente, inmueble } = informe
  //console.log("🚀 ~ InformeDetalle ~ informe:", informe.inspeccionGeneral)
  const patologiasPresentes = informe.patologias?.filter((p: { presente: any }) => p.presente)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      {/* Encabezado */}
      <header className="mb-8 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-4 border-b border-border bg-primary px-6 py-5 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-foreground/15">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary-foreground/70">
                Informe de Relevamiento
              </p>
              <h1 className="text-xl font-bold leading-tight">Expediente Nº {informe.numeroExpediente}</h1>
            </div>
          </div>
          <PrintButton />
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 px-6 py-5 sm:grid-cols-4">
          <Field
            label="Fecha"
            value={
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                {formatFecha(informe.fecha)}
              </span>
            }
          />
          <Field
            label="Hora"
            value={
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                {informe.hora} hs
              </span>
            }
          />
          <Field
            label="Arquitecta responsable"
            value={
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                {informe.arquitectaResponsable}
              </span>
            }
          />
          <Field
            label="Informe completo"
            value={
              informe.requiereInformeCompleto ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Requerido
                </span>
              ) : (
                <span className="text-muted-foreground">No requerido</span>
              )
            }
          />
        </dl>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Cliente */}
        <section className="rounded-xl border border-border bg-card p-6">
          <SectionTitle icon={User} title="Datos del Cliente" step="Sección 01" />
          <dl className="mt-5 flex flex-col gap-5">
            <Field label="Nombre" value={cliente.nombre} />
            <Field
              label="Teléfono"
              value={
                <a
                  href={`tel:${cliente.telefono}`}
                  className="flex items-center gap-1.5 text-foreground underline-offset-2 hover:underline"
                >
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  {cliente.telefono}
                </a>
              }
            />
            <Field
              label="Email"
              value={
                <a
                  href={`mailto:${cliente.email}`}
                  className="flex items-center gap-1.5 break-all text-foreground underline-offset-2 hover:underline"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  {cliente.email}
                </a>
              }
            />
          </dl>
        </section>

        {/* Inmueble */}
        <section className="rounded-xl border border-border bg-card p-6">
          <SectionTitle icon={Building2} title="Datos del Inmueble" step="Sección 02" />
          <dl className="mt-5 grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <Field
                label="Dirección"
                value={
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                    {inmueble.direccion}
                  </span>
                }
              />
            </div>
            <Field label="Barrio / Ciudad" value={inmueble.barrioCiudad} />
            <Field label="Tipo de propiedad" value={TIPO_PROPIEDAD_LABELS[inmueble.tipoPropiedad] ?? inmueble.tipoPropiedad} />
            <Field label="Antigüedad" value={`${inmueble.antiguedadAnios} años`} />
            <Field label="Reformas" value={inmueble.tieneReformas ? "Sí" : "No registra"} />
            {inmueble.tieneReformas && inmueble.detalleReformas ? (
              <div className="col-span-2">
                <Field label="Detalle de reformas" value={inmueble.detalleReformas} />
              </div>
            ) : null}
          </dl>
        </section>

        {/* Motivos de consulta */}
        <section className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <SectionTitle icon={AlertTriangle} title="Motivo de Consulta" step="Sección 03" />
          <div className="mt-5 flex flex-col gap-4">
            <Chips items={informe.motivosConsulta} labels={MOTIVO_LABELS} icon={AlertTriangle} />
            {informe.motivosConsulta.includes("OTRO") && informe.motivoOtroDetalle ? (
              <ObsBox label='Detalle "Otro"' value={informe.motivoOtroDetalle} />
            ) : null}
            <ObsBox label="Observaciones del cliente" value={informe.observacionesCliente} />
          </div>
        </section>

        {/* Inspección general */}
        <section className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <SectionTitle icon={Search} title="Inspección General del Inmueble" step="Sección 04" />
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Home className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                Exterior
              </h3>
              <Chips items={informe.inspeccionGeneral?.sectoresExterior} labels={EXTERIOR_LABELS} icon={Building2} />
              <ObsBox label="Observaciones exteriores" value={informe.inspeccionGeneral?.observacionesExterior} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <LayoutGrid className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                Interior
              </h3>
              <Chips items={informe.inspeccionGeneral?.sectoresInterior} labels={INTERIOR_LABELS} icon={Home} />
              <ObsBox label="Observaciones interiores" value={informe.inspeccionGeneral?.observacionesInterior} />
            </div>
          </div>
        </section>

        {/* Relevamiento patológico */}
        <section className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <SectionTitle
            icon={AlertTriangle}
            title="Relevamiento Patológico"
            step="Sección 05"
            description="Presencia y nivel de severidad de cada patología detectada."
          />
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Patología
                  </th>
                  <th className="pb-2 pr-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Presencia
                  </th>
                  <th className="pb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Severidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {informe.patologias?.map((p: { tipo: string; presente: boolean; severidad: unknown }, index: number) => {
                  const severidad =
                    typeof p.severidad === "string" && p.severidad in SEVERIDAD_LABELS
                      ? (p.severidad as Severidad)
                      : null

                  return (
                    <tr key={String(p.tipo) || index} className="border-b border-border/60 last:border-0">
                      <td className="py-2.5 pr-4 font-medium text-foreground">{p.tipo}</td>
                      <td className="py-2.5 pr-4">
                        {p.presente ? (
                          <span className="inline-flex items-center gap-1.5 text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                            Presente
                          </span>
                        ) : (
                          <span className="text-muted-foreground">No detectada</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        {p.presente && severidad ? <SeveridadBadge severidad={severidad} /> : <span className="text-muted-foreground">—</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sectores afectados */}
        <section className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <SectionTitle
            icon={Ruler}
            title="Sectores Afectados por Ambiente"
            step="Sección 06"
            description="Problema detectado, medición aproximada y observaciones por ambiente."
          />
          <div className="mt-5 flex flex-col gap-3">
            {informe.sectoresAfectados?.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin sectores registrados.</p>
            ) : (
              informe.sectoresAfectados?.map((s: { ambiente: string; medicion: string | null; problema: string; observaciones: string | null }, i: any) => (
                <div key={`${s.ambiente}-${i}`} className="rounded-md border border-border bg-background p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="flex items-center gap-2 font-semibold text-foreground">
                      <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      {s.ambiente}
                    </h3>
                    {s.medicion ? (
                      <span className="rounded-md bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground">
                        {s.medicion}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-foreground">{s.problema}</p>
                  {s.observaciones ? (
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.observaciones}</p>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Hipótesis preliminar */}
        <section className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <SectionTitle
            icon={FlaskConical}
            title="Hipótesis Preliminar"
            step="Sección 07"
            description="Posibles causas detectadas."
          />
          <div className="mt-5 flex flex-col gap-4">
            <Chips items={informe.hipotesis} labels={HIPOTESIS_LABELS} icon={FlaskConical} />
            <ObsBox label="Observaciones técnicas" value={informe.observacionesTecnicas} />
          </div>
        </section>

        {/* Registro fotográfico */}
        <section className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <SectionTitle icon={Camera} title="Registro Fotográfico" step="Sección 08" />
          <div className="mt-5">
            <p className="mb-4 text-sm">
              {informe.registroFotografico ? (
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                  Registro fotográfico realizado
                </span>
              ) : (
                <span className="text-muted-foreground">Sin registro fotográfico.</span>
              )}
            </p>
            {informe.fotos?.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {informe.fotos?.map((foto: any, i: number) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-md border border-border bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={foto || "/placeholder.svg"} alt={`Fotografía ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            ) : informe.registroFotografico ? (
              <p className="text-sm text-muted-foreground">Las fotografías se adjuntan al documento del informe.</p>
            ) : null}
          </div>
        </section>

        {/* Instrumentos */}
        <section className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <SectionTitle icon={Wrench} title="Instrumentos Utilizados" step="Sección 09" />
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {informe.instrumentosUtilizados.map((i: string, index: number) => (
              <li
                key={i || String(index)}
                className="flex items-center gap-2.5 rounded-md border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground"
              >
                <Wrench className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                {INSTRUMENTO_LABELS[i] ?? i}
              </li>
            ))}
          </ul>
          {informe.instrumentosUtilizados.includes("OTRO") && informe.instrumentoOtroDetalle ? (
            <div className="mt-4">
              <ObsBox label='Detalle "Otro"' value={informe.instrumentoOtroDetalle} />
            </div>
          ) : null}
        </section>

        {/* Cierre y firmas */}
        <section className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <SectionTitle icon={ClipboardList} title="Cierre de Visita" step="Sección 10" />
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <FirmaBox label="Firma profesional" url={informe.firmaProfesionalUrl} nombre={informe.arquitectaResponsable} />
            <FirmaBox label="Firma del cliente" url={informe.firmaClienteUrl} nombre={cliente.nombre} />
          </div>
        </section>
      </div>

      <footer className="mt-8 flex flex-col gap-1 border-t border-border pt-5 text-center">
        <p className="font-mono text-xs text-muted-foreground">ID del informe: {informe.id}</p>
        <p className="font-mono text-xs text-muted-foreground">Generado el {formatFecha(informe.createdAt)}</p>
      </footer>
    </div>
  )
}

function FirmaBox({ label, url, nombre }: { label: string; url: string | null; nombre: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-border bg-muted/40">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url || "/placeholder.svg"} alt={label} className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Pendiente de firma</span>
        )}
      </div>
      <div className="border-t border-border pt-2 text-center">
        <p className="text-sm font-medium text-foreground">{nombre}</p>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
