// components/panel/sectores-afectados-field.tsx
"use client"

import { useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { MapPin, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mismos labels que ya usás en InformeDetalle
const AMBIENTE_LABELS: Record<string, string> = {
  LIVING: "Living",
  COCINA: "Cocina",
  DORMITORIO_1: "Dormitorio 1",
  DORMITORIO_2: "Dormitorio 2",
  BANO: "Baño",
  OTRO: "Otro",
}

type SectorAfectadoInput = {
  ambiente: string
  ambienteOtroDetalle?: string
  problemaDetectado: string
  medicionAprox?: string
  observaciones?: string
}

const EMPTY: SectorAfectadoInput = {
  ambiente: "",
  ambienteOtroDetalle: "",
  problemaDetectado: "",
  medicionAprox: "",
  observaciones: "",
}

export function SectoresAfectadosField() {
  // Asume que este componente vive dentro de un <FormProvider> con el form
  // principal de la visita técnica, y que ese form tiene un campo
  // "sectoresAfectados: SectorAfectadoInput[]"
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sectoresAfectados",
  })

  const [draft, setDraft] = useState<SectorAfectadoInput>(EMPTY)
  const [error, setError] = useState<string | null>(null)

  function handleAgregar() {
    if (!draft.ambiente) {
      setError("Seleccioná un ambiente.")
      return
    }
    if (draft.ambiente === "otro" && !draft.ambienteOtroDetalle?.trim()) {
      setError('Especificá el detalle de "Otro".')
      return
    }
    if (!draft.problemaDetectado.trim()) {
      setError("Describí el problema detectado.")
      return
    }

    append(draft)
    setDraft(EMPTY)
    setError(null)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Lista de sectores ya cargados */}
      <div className="flex flex-col gap-3">
        {fields.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Todavía no cargaste sectores afectados.
          </p>
        ) : (
          fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-md border border-border bg-background p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  {(field as any).ambiente === "OTRO"
                    ? (field as any).ambienteOtroDetalle
                    : AMBIENTE_LABELS[(field as any).ambiente] ?? (field as any).ambiente}
                </h3>
                <div className="flex items-center gap-2">
                  {(field as any).medicionAprox ? (
                    <span className="rounded-md bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground">
                      {(field as any).medicionAprox}
                    </span>
                  ) : null}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    aria-label="Eliminar sector"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <p className="mt-2 text-sm text-foreground">
                {(field as any).problemaDetectado}
              </p>
              {(field as any).observaciones ? (
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {(field as any).observaciones}
                </p>
              ) : null}
            </div>
          ))
        )}
      </div>

      {/* Mini form para cargar uno nuevo */}
      <div className="rounded-md border border-dashed border-border p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Ambiente
            </label>
            <Select
              value={draft.ambiente}
              onValueChange={(v) => setDraft((d) => ({ ...d, ambiente: v ?? "" }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar ambiente" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(AMBIENTE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {draft.ambiente === "otro" ? (
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Detalle del ambiente
              </label>
              <Input
                value={draft.ambienteOtroDetalle}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, ambienteOtroDetalle: e.target.value }))
                }
                placeholder="Ej: Lavadero"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Medición aprox.
              </label>
              <Input
                value={draft.medicionAprox}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, medicionAprox: e.target.value }))
                }
                placeholder="Ej: 1.2 m²"
              />
            </div>
          )}

          {draft.ambiente === "otro" ? (
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Medición aprox.
              </label>
              <Input
                value={draft.medicionAprox}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, medicionAprox: e.target.value }))
                }
                placeholder="Ej: 1.2 m²"
              />
            </div>
          ) : null}

          <div className="col-span-full flex flex-col gap-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Problema detectado
            </label>
            <Textarea
              value={draft.problemaDetectado}
              onChange={(e) =>
                setDraft((d) => ({ ...d, problemaDetectado: e.target.value }))
              }
              placeholder="Describí lo observado en este ambiente"
              rows={2}
            />
          </div>

          <div className="col-span-full flex flex-col gap-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Observaciones (opcional)
            </label>
            <Textarea
              value={draft.observaciones}
              onChange={(e) =>
                setDraft((d) => ({ ...d, observaciones: e.target.value }))
              }
              rows={2}
            />
          </div>
        </div>

        {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}

        <Button type="button" onClick={handleAgregar} className="mt-3 gap-1.5">
          <Plus className="h-4 w-4" />
          Agregar sector
        </Button>
      </div>
    </div>
  )
}