"use client"

import type { ReactNode } from "react"


import { useState } from "react"
import { PlusIcon, Trash2Icon, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  elementoOptions,
  sectorElementoOptionsByElemento,
  tipoPatologiaSectorOptions,
  colorManchaOptions,
  exteriorPresets,
} from "@/lib/inspection"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ambientes,
  patologiaRows,
  severidadOptions,
  type FieldErrors,
  type Option,
} from "@/lib/inspection"

/* -------------------------------------------------------------------------- */
/*  Section shell                                                              */
/* -------------------------------------------------------------------------- */

export function Section({
  number,
  title,
  description,
  children,
}: {
  number: number
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground tabular-nums">
            {number}
          </span>
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        {description ? (
          <CardDescription className="pl-10">{description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*  Text / textarea fields                                                     */
/* -------------------------------------------------------------------------- */

export function TextField({
  name,
  label,
  errors,
  type = "text",
  placeholder,
  required,
  defaultValue,
  className,
  inputMode,
}: {
  name: string
  label: string
  errors?: FieldErrors
  type?: string
  placeholder?: string
  required?: boolean
  defaultValue?: string
  className?: string
  inputMode?: "text" | "numeric" | "email" | "tel"
}) {
  const error = errors?.[name]
  return (
    <Field data-invalid={error ? true : undefined} className={className}>
      <FieldLabel htmlFor={name}>
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </FieldLabel>
      <Input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
      />
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  )
}

export function TextAreaField({
  name,
  label,
  errors,
  placeholder,
  rows = 3,
  defaultValue,
}: {
  name: string
  label: string
  errors?: FieldErrors
  placeholder?: string
  rows?: number
  defaultValue?: string
}) {
  const error = errors?.[name]
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
      />
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  )
}

/* -------------------------------------------------------------------------- */
/*  Checkbox group                                                             */
/* -------------------------------------------------------------------------- */

export function CheckboxGroup({
  name,
  legend,
  description,
  options,
  columns = 2,
}: {
  name: string
  legend: string
  description?: string
  options: Option[]
  columns?: 1 | 2 | 3
}) {
  const cols =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-1"
  return (
    <FieldSet>
      <FieldLegend variant="label">{legend}</FieldLegend>
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      <div className={`grid grid-cols-1 gap-2.5 ${cols}`}>
        {options.map((option) => {
          const id = `${name}-${option.value}`
          return (
            <Field key={option.value} orientation="horizontal">
              <Checkbox id={id} name={name} value={option.value} />
              <FieldLabel htmlFor={id} className="font-normal">
                {option.label}
              </FieldLabel>
            </Field>
          )
        })}
      </div>
    </FieldSet>
  )
}

/* -------------------------------------------------------------------------- */
/*  Radio group field                                                          */
/* -------------------------------------------------------------------------- */

export function RadioField({
  name,
  legend,
  options,
  errors,
  orientation = "horizontal",
  defaultValue,
}: {
  name: string
  legend: string
  options: Option[]
  errors?: FieldErrors
  orientation?: "horizontal" | "vertical"
  defaultValue?: string
}) {
  const error = errors?.[name]
  return (
    <FieldSet data-invalid={error ? true : undefined}>
      <FieldLegend variant="label">{legend}</FieldLegend>
      <RadioGroup
        name={name}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        className={
          orientation === "horizontal"
            ? "flex flex-wrap gap-x-6 gap-y-2"
            : "gap-2"
        }
      >
        {options.map((option) => {
          const id = `${name}-${option.value}`
          return (
            <Field key={option.value} orientation="horizontal" className="w-auto">
              <RadioGroupItem id={id} value={option.value} />
              <FieldLabel htmlFor={id} className="font-normal">
                {option.label}
              </FieldLabel>
            </Field>
          )
        })}
      </RadioGroup>
      {error ? <FieldError>{error}</FieldError> : null}
    </FieldSet>
  )
}

/* -------------------------------------------------------------------------- */
/*  4. Pathology table                                                         */
/* -------------------------------------------------------------------------- */

export function PatologiaTable() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        {/* Header */}
        <div className="grid grid-cols-[1.6fr_1fr_1.4fr] gap-3 border-b border-border pb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <span>Patología</span>
          <span>¿Presenta?</span>
          <span>Nivel</span>
        </div>
        <div className="flex flex-col">
          {patologiaRows.map((row) => (
            <div
              key={row.value}
              className="grid grid-cols-[1.6fr_1fr_1.4fr] items-center gap-3 border-b border-border py-3 last:border-b-0"
            >
              <span className="text-sm font-medium text-pretty">{row.label}</span>
              <RadioGroup
                name={`pat_${row.value}_estado`}
                className="flex gap-4"
              >
                <Field orientation="horizontal" className="w-auto">
                  <RadioGroupItem
                    id={`pat_${row.value}_estado-si`}
                    value="si"
                  />
                  <FieldLabel
                    htmlFor={`pat_${row.value}_estado-si`}
                    className="font-normal"
                  >
                    Sí
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal" className="w-auto">
                  <RadioGroupItem
                    id={`pat_${row.value}_estado-no`}
                    value="no"
                  />
                  <FieldLabel
                    htmlFor={`pat_${row.value}_estado-no`}
                    className="font-normal"
                  >
                    No
                  </FieldLabel>
                </Field>
              </RadioGroup>
              <RadioGroup
                name={`pat_${row.value}_nivel`}
                className="flex flex-wrap gap-3"
              >
                {severidadOptions.map((sev) => (
                  <Field
                    key={sev.value}
                    orientation="horizontal"
                    className="w-auto"
                  >
                    <RadioGroupItem
                      id={`pat_${row.value}_nivel-${sev.value}`}
                      value={sev.value}
                    />
                    <FieldLabel
                      htmlFor={`pat_${row.value}_nivel-${sev.value}`}
                      className="font-normal"
                    >
                      {sev.label}
                    </FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
/* -------------------------------------------------------------------------- */
/*  5. Affected sectors (dinámico)                                             */
/* -------------------------------------------------------------------------- */


export type SectorAfectadoDraft = {
  ambienteNombre: string
  esExterior: boolean
  elemento: string
  sectorElemento: string
  tiposPatologia: string[]
  colorMancha: string[]
  tamanio: string
  observaciones: string
}

const EMPTY_SECTOR: SectorAfectadoDraft = {
  ambienteNombre: "",
  esExterior: false,
  elemento: "",
  sectorElemento: "",
  tiposPatologia: [],
  colorMancha: [],
  tamanio: "",
  observaciones: "",
}

function toggleInArray(arr: string[], value: string) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
}

// Botón "clickeable" tipo chip, para las listas de selección
function ToggleChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  )
}

export function AmbientesTable() {
  const [sectores, setSectores] = useState<SectorAfectadoDraft[]>([])
  const [draft, setDraft] = useState<SectorAfectadoDraft>(EMPTY_SECTOR)
  const [error, setError] = useState<string | null>(null)

  const sectorOptions = draft.elemento
    ? sectorElementoOptionsByElemento[draft.elemento] ?? []
    : []

  function handleAgregar() {
    if (!draft.ambienteNombre.trim()) {
      setError("Nombrá el ambiente (ej. Ambiente 1, Cocina, Patio).")
      return
    }
    if (draft.tiposPatologia.length === 0) {
      setError("Marcá al menos un tipo de patología.")
      return
    }
    setSectores((prev) => [...prev, draft])
    setDraft(EMPTY_SECTOR)
    setError(null)
  }

  function handleQuitar(index: number) {
    setSectores((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Inputs ocultos para el FormData nativo */}
      {sectores.map((s, i) => (
        <div key={i}>
          <input type="hidden" name={`sectores[${i}][ambienteNombre]`} value={s.ambienteNombre} />
          <input type="hidden" name={`sectores[${i}][esExterior]`} value={s.esExterior ? "on" : ""} />
          <input type="hidden" name={`sectores[${i}][elemento]`} value={s.elemento} />
          <input type="hidden" name={`sectores[${i}][sectorElemento]`} value={s.sectorElemento} />
          {s.tiposPatologia.map((tp) => (
            <input key={tp} type="hidden" name={`sectores[${i}][tiposPatologia]`} value={tp} />
          ))}
          {s.colorMancha.map((c) => (
            <input key={c} type="hidden" name={`sectores[${i}][colorMancha]`} value={c} />
          ))}
          <input type="hidden" name={`sectores[${i}][tamanio]`} value={s.tamanio} />
          <input type="hidden" name={`sectores[${i}][observaciones]`} value={s.observaciones} />
        </div>
      ))}

      {/* Lista de sectores cargados */}
      {sectores.length === 0 ? (
        <p className="text-sm text-muted-foreground">Todavía no cargaste sectores afectados.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {sectores.map((s, i) => (
            <div key={i} className="flex items-start justify-between gap-3 rounded-md border border-border bg-background p-3">
              <div className="flex flex-col gap-1">
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  <MapPinIcon className="size-3.5 text-muted-foreground" />
                  {s.ambienteNombre} {s.esExterior ? "(exterior)" : ""}
                </p>
                <p className="text-sm text-foreground">
                  {[
                    elementoOptions.find((e: { value: string }) => e.value === s.elemento)?.label,
                    sectorElementoOptionsByElemento[s.elemento]?.find((se: { value: string }) => se.value === s.sectorElemento)?.label,
                  ]
                    .filter(Boolean)
                    .join(" — ")}
                </p>
                <p className="text-sm text-foreground">
                  {s.tiposPatologia
                    .map((tp) => tipoPatologiaSectorOptions.find((o: { value: string }) => o.value === tp)?.label)
                    .join(", ")}
                  {s.colorMancha.length > 0
                    ? ` (${s.colorMancha.map((c) => colorManchaOptions.find((o: { value: string }) => o.value === c)?.label).join(", ")})`
                    : ""}
                  {s.tamanio ? ` · ${s.tamanio}` : ""}
                </p>
                {s.observaciones ? <p className="text-sm text-muted-foreground">{s.observaciones}</p> : null}
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => handleQuitar(i)} aria-label="Quitar sector">
                <Trash2Icon className="size-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Mini form para cargar uno nuevo */}
      <div className="flex flex-col gap-4 rounded-md border border-dashed border-border p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="draft_ambienteNombre">Ambiente</FieldLabel>
            <Input
              id="draft_ambienteNombre"
              placeholder="Ej: Ambiente 1, Cocina, Patio"
              value={draft.ambienteNombre}
              onChange={(e) => setDraft((d) => ({ ...d, ambienteNombre: e.target.value }))}
            />
          </Field>
          <Field orientation="horizontal" className="items-center pt-6">
            <Checkbox
              id="draft_esExterior"
              checked={draft.esExterior}
              onCheckedChange={(v) => setDraft((d) => ({ ...d, esExterior: !!v }))}
            />
            <FieldLabel htmlFor="draft_esExterior" className="font-normal">
              Es un sector exterior
            </FieldLabel>
          </Field>
        </div>

        {draft.esExterior ? (
          <div className="flex flex-wrap gap-2">
            {exteriorPresets.map((preset: any) => (
              <ToggleChip
                key={preset}
                active={draft.ambienteNombre === preset}
                onClick={() => setDraft((d) => ({ ...d, ambienteNombre: preset }))}
              >
                {preset}
              </ToggleChip>
            ))}
          </div>
        ) : null}

        <FieldSet>
          <FieldLegend variant="label">Ubicación en elemento de la arquitectura</FieldLegend>
          <div className="flex flex-wrap gap-2">
            {elementoOptions.map((opt: { value:  any ; label:  any }) => (
              <ToggleChip
                key={opt.value}
                active={draft.elemento === opt.value}
                onClick={() =>
                  setDraft((d) => ({ ...d, elemento: opt.value, sectorElemento: "" }))
                }
              >
                {opt.label}
              </ToggleChip>
            ))}
          </div>
        </FieldSet>

        {sectorOptions.length > 0 ? (
          <FieldSet>
            <FieldLegend variant="label">Ubicación en sector del elemento</FieldLegend>
            <div className="flex flex-wrap gap-2">
              {sectorOptions.map((opt: { value:  any ; label:  any }) => (
                <ToggleChip
                  key={opt.value}
                  active={draft.sectorElemento === opt.value}
                  onClick={() => setDraft((d) => ({ ...d, sectorElemento: opt.value }))}
                >
                  {opt.label}
                </ToggleChip>
              ))}
            </div>
          </FieldSet>
        ) : null}

        <FieldSet>
          <FieldLegend variant="label">Tipo de patología</FieldLegend>
          <div className="flex flex-wrap gap-2">
            {tipoPatologiaSectorOptions.map((opt: { value: any; label: any }) => (
              <ToggleChip
                key={opt.value}
                active={draft.tiposPatologia.includes(opt.value)}
                onClick={() =>
                  setDraft((d) => ({ ...d, tiposPatologia: toggleInArray(d.tiposPatologia, opt.value) }))
                }
              >
                {opt.label}
              </ToggleChip>
            ))}
          </div>
        </FieldSet>

        {draft.tiposPatologia.includes("MANCHA_HUMEDAD") ? (
          <FieldSet>
            <FieldLegend variant="label">Color de la mancha</FieldLegend>
            <div className="flex flex-wrap gap-2">
              {colorManchaOptions.map((opt: { value: any; label: any }) => (
                <ToggleChip
                  key={opt.value}
                  active={draft.colorMancha.includes(opt.value as string)}
                  onClick={() =>
                    setDraft((d) => ({ ...d, colorMancha: toggleInArray(d.colorMancha, opt.value) }))
                  }
                >
                  {opt.label}
                </ToggleChip>
              ))}
            </div>
          </FieldSet>
        ) : null}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="draft_tamanio">Tamaño de la patología</FieldLabel>
            <Input
              id="draft_tamanio"
              placeholder="Ej: 40cm x 15cm"
              value={draft.tamanio}
              onChange={(e) => setDraft((d) => ({ ...d, tamanio: e.target.value }))}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="draft_observaciones">Observaciones (opcional)</FieldLabel>
            <Input
              id="draft_observaciones"
              value={draft.observaciones}
              onChange={(e) => setDraft((d) => ({ ...d, observaciones: e.target.value }))}
            />
          </Field>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <Button type="button" onClick={handleAgregar} className="w-fit gap-1.5">
          <PlusIcon className="size-4" />
          Agregar sector
        </Button>
      </div>
    </div>
  )
}