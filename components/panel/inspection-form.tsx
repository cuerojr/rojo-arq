"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { CheckCircle2Icon, ImageIcon, XIcon, LoaderIcon } from "lucide-react"

import { crearInspeccion } from "@/lib/actions/inspection"
import {
  exteriorOptions,
  hipotesisOptions,
  instrumentosOptions,
  interiorOptions,
  motivoOptions,
  tipoPropiedadOptions,
  type InspectionState,
} from "@/lib/inspection"
import {
  AmbientesTable,
  CheckboxGroup,
  PatologiaTable,
  RadioField,
  Section,
  TextAreaField,
  TextField,
} from "@/components/panel/inspection-fields"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

const initialState: InspectionState = { status: "idle" }

const todayISO = () => new Date().toISOString().slice(0, 10)

export function InspectionForm() {
  const [state, formAction] = useActionState(crearInspeccion, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Ficha registrada", { description: state.message })
      formRef.current?.reset()
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else if (state.status === "error") {
      toast.error("No se pudo registrar", { description: state.message })
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-6">
      <div ref={topRef} />

      {state.status === "success" ? (
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Ficha registrada correctamente</AlertTitle>
          <AlertDescription>
            {state.message}
            {state.fotos ? ` Se adjuntaron ${state.fotos} fotografía(s).` : ""}
          </AlertDescription>
        </Alert>
      ) : null}

      {state.status === "error" ? (
        <Alert variant="destructive">
          <XIcon />
          <AlertTitle>Revisá la ficha</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      {/* Encabezado */}
      <Section number={0} title="Datos de la visita">
        <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TextField
            name="expediente"
            label="N° de visita / expediente"
            placeholder="Ej. 2026-014"
            errors={state.errors}
          />
          <TextField
            name="fecha"
            label="Fecha"
            type="date"
            defaultValue={todayISO()}
            errors={state.errors}
          />
          <TextField name="hora" label="Hora" type="time" errors={state.errors} />
          <TextField
            name="arquitecta"
            label="Profesional responsable"
            defaultValue="Julieta Rojo"
            required
            errors={state.errors}
          />
        </FieldGroup>
      </Section>

      {/* 1. Datos del cliente */}
      <Section number={1} title="Datos del cliente">
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField name="nombre" label="Nombre y apellido" required errors={state.errors} />
            <TextField
              name="telefono"
              label="Teléfono"
              type="tel"
              inputMode="tel"
              required
              errors={state.errors}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              inputMode="email"
              required
              errors={state.errors}
            />
            <TextField name="barrioCiudad" label="Barrio / Ciudad" errors={state.errors} />
          </div>
          <TextField
            name="direccion"
            label="Dirección del inmueble"
            required
            errors={state.errors}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <RadioField
              name="tipoPropiedad"
              legend="Tipo de propiedad"
              options={tipoPropiedadOptions}
              errors={state.errors}
            />
            <TextField
              name="antiguedad"
              label="Antigüedad aproximada (años)"
              type="number"
              inputMode="numeric"
              placeholder="Ej. 45"
              errors={state.errors}
            />
          </div>
          <RadioField
            name="reformas"
            legend="¿Se realizaron reformas?"
            options={[
              { value: "si", label: "Sí" },
              { value: "no", label: "No" },
            ]}
            errors={state.errors}
          />
          <TextAreaField
            name="reformasCuales"
            label="¿Cuáles?"
            placeholder="Detalle de reformas realizadas"
            errors={state.errors}
          />
        </FieldGroup>
      </Section>

      {/* 2. Motivo de consulta */}
      <Section number={2} title="Motivo de consulta">
        <FieldGroup>
          <CheckboxGroup
            name="motivo"
            legend="Patologías reportadas"
            options={motivoOptions}
          />
          <TextField
            name="motivoOtro"
            label="Otro (especificar)"
            placeholder="Otro motivo de consulta"
            errors={state.errors}
          />
          <TextAreaField
            name="observacionesCliente"
            label="Observaciones del cliente"
            errors={state.errors}
          />
        </FieldGroup>
      </Section>

      {/* 3. Inspección general */}
      <Section number={3} title="Inspección general del inmueble">
        <FieldGroup>
          <CheckboxGroup name="exterior" legend="Exterior" options={exteriorOptions} />
          <TextAreaField
            name="exteriorObs"
            label="Observaciones exteriores"
            errors={state.errors}
          />
          <Separator />
          <CheckboxGroup name="interior" legend="Interior" options={interiorOptions} />
          <TextAreaField
            name="interiorObs"
            label="Observaciones interiores"
            errors={state.errors}
          />
        </FieldGroup>
      </Section>

      {/* 4. Relevamiento patológico */}
      <Section
        number={4}
        title="Relevamiento patológico"
        description="Indicá presencia y nivel de severidad de cada patología."
      >
        <PatologiaTable />
      </Section>

      {/* 5. Sectores afectados */}
      <Section
        number={5}
        title="Sectores afectados por ambiente"
        description="Problema detectado, medición aproximada y observaciones por ambiente."
      >
        <AmbientesTable />
      </Section>

      {/* 6. Hipótesis preliminar */}
      <Section
        number={6}
        title="Hipótesis preliminar"
        description="Posibles causas detectadas."
      >
        <FieldGroup>
          <CheckboxGroup
            name="hipotesis"
            legend="Causas probables"
            options={hipotesisOptions}
          />
          <TextAreaField
            name="observacionesTecnicas"
            label="Observaciones técnicas"
            errors={state.errors}
          />
        </FieldGroup>
      </Section>

      {/* 7. Registro fotográfico */}
      <Section number={7} title="Registro fotográfico">
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox id="registroFotografico" name="registroFotografico" value="on" />
            <FieldLabel htmlFor="registroFotografico" className="font-normal">
              Registro fotográfico realizado
            </FieldLabel>
          </Field>
          <PhotoUpload error={state.errors?.fotos} />
        </FieldGroup>
      </Section>

      {/* 8. Instrumentos utilizados */}
      <Section number={8} title="Instrumentos utilizados">
        <CheckboxGroup
          name="instrumentos"
          legend="Seleccioná los instrumentos empleados"
          options={instrumentosOptions}
          columns={3}
        />
      </Section>

      {/* 9. Cierre de visita */}
      <Section number={9} title="Cierre de visita">
        <FieldGroup>
          <FieldSet>
            <FieldLegend variant="label">Estado</FieldLegend>
            <Field orientation="horizontal">
              <Checkbox id="requiereInforme" name="requiereInforme" value="on" />
              <FieldLabel htmlFor="requiereInforme" className="font-normal">
                Requiere informe completo
              </FieldLabel>
            </Field>
          </FieldSet>
          <FieldDescription>
            Las firmas del profesional y del cliente se completan sobre el documento
            impreso al cierre de la visita (contrapago del servicio).
          </FieldDescription>
        </FieldGroup>
      </Section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="reset"
          variant="outline"
          onClick={() => formRef.current?.reset()}
        >
          Limpiar ficha
        </Button>
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="sm:min-w-48">
      {pending ? (
        <LoaderIcon  data-icon="inline-start" className="animate-spin" />
      ) : null}
      {pending ? "Registrando..." : "Registrar ficha"}
    </Button>
  )
}

function PhotoUpload({ error }: { error?: string }) {
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor="fotos">Adjuntar fotografías</FieldLabel>
      <FieldDescription>
        Hasta 12 imágenes (JPG/PNG), máximo 8 MB cada una.
      </FieldDescription>
      <label
        htmlFor="fotos"
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-muted/30 px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-accent"
      >
        <ImageIcon className="size-6 text-muted-foreground" />
        <span className="text-sm font-medium">
          Hacé clic para seleccionar imágenes
        </span>
        <span className="text-xs text-muted-foreground">
          o arrastrá los archivos aquí
        </span>
      </label>
      <input
        ref={inputRef}
        id="fotos"
        name="fotos"
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        aria-invalid={error ? true : undefined}
        onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
      />
      {files.length > 0 ? (
        <ul className="flex flex-col gap-1.5 pt-1">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <ImageIcon className="size-4 shrink-0" />
              <span className="truncate">{file.name}</span>
              <span className="ml-auto shrink-0 tabular-nums">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  )
}
