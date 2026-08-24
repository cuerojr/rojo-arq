"use client"

import type { ReactNode } from "react"

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
/*  5. Affected sectors                                                        */
/* -------------------------------------------------------------------------- */

export function AmbientesTable() {
  return (
    <div className="flex flex-col gap-5">
      {ambientes.map((amb) => (
        <div key={amb.value} className="flex flex-col gap-3">
          <p className="text-sm font-medium">{amb.label}</p>
          <FieldGroup className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Field>
              <FieldLabel htmlFor={`amb_${amb.value}_problema`} className="sr-only">
                Problema detectado en {amb.label}
              </FieldLabel>
              <Input
                id={`amb_${amb.value}_problema`}
                name={`amb_${amb.value}_problema`}
                placeholder="Problema detectado"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`amb_${amb.value}_medicion`} className="sr-only">
                Medición aproximada en {amb.label}
              </FieldLabel>
              <Input
                id={`amb_${amb.value}_medicion`}
                name={`amb_${amb.value}_medicion`}
                placeholder="Medición aprox."
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`amb_${amb.value}_obs`} className="sr-only">
                Observaciones en {amb.label}
              </FieldLabel>
              <Input
                id={`amb_${amb.value}_obs`}
                name={`amb_${amb.value}_obs`}
                placeholder="Observaciones"
              />
            </Field>
          </FieldGroup>
        </div>
      ))}
    </div>
  )
}
