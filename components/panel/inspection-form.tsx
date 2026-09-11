"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { CheckCircle2Icon, ImageIcon, XIcon, LoaderIcon } from "lucide-react";

import {
  crearInspeccionDesdeOrden,
  actualizarInspeccionDesdeOrden,
} from "@/lib/actions/inspection";
import {
  exteriorOptions,
  FieldErrors,
  hipotesisOptions,
  instrumentosOptions,
  interiorOptions,
  motivoOptions,
  tipoPropiedadOptions,
  type InspectionState,
} from "@/lib/inspection";
import {
  tipoPropiedadMap,
  motivoMap,
  exteriorMap,
  interiorMap,
  hipotesisMap,
  instrumentoMap,
  patologiaMap,
  severidadMap,
} from "@/lib/mappers/inspection-enums";
import {
  AmbientesTable,
  CheckboxGroup,
  PatologiaTable,
  Section,
  TextAreaField,
  TextField,
  type SectorAfectadoDraft,
} from "@/components/panel/inspection-fields";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "@/lib/utils";
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload";
import { Orden, VisitaTecnica, Cliente, Inmueble } from "@/generated/prisma/client";

const initialState: InspectionState = {
  status: "idle",
  ordenId: undefined,
  errors: undefined,
  message: undefined,
  fotos: undefined,
  inspeccion: undefined,
  informeId: undefined,
};

const todayISO = () => new Date().toISOString().slice(0, 10);

// helper genérico: invierte un Record<formValue, enumValue> -> Record<enumValue, formValue>
function reverseMap(map: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(map).map(([formValue, enumValue]) => [enumValue, formValue]),
  ) as Record<string, string>;
}

const tipoPropiedadReverseMap = reverseMap(tipoPropiedadMap);
const motivoReverseMap = reverseMap(motivoMap);
const exteriorReverseMap = reverseMap(exteriorMap);
const interiorReverseMap = reverseMap(interiorMap);
const hipotesisReverseMap = reverseMap(hipotesisMap);
const instrumentoReverseMap = reverseMap(instrumentoMap);
const severidadReverseMap = reverseMap(severidadMap);

type VisitaConRelaciones = VisitaTecnica & {
  patologias?: { tipo: string; presente: boolean; severidad: string | null }[];
  sectoresAfectados?: {
    ambienteNombre: string;
    esExterior: boolean;
    elemento: string | null;
    sectorElemento: string | null;
    tiposPatologia: string[];
    colorMancha: string[];
    tamanioPatologia: string | null;
    observaciones: string | null;
  }[];
  inspeccionGeneral?: {
    sectoresExterior: string[];
    observacionesExterior: string | null;
    sectoresInterior: string[];
    observacionesInterior: string | null;
  } | null;
  hipotesisPreliminar?: {
    hipotesis: string[];
    observacionesTecnicas: string | null;
  } | null;
  registroFotografico?: {
    realizado: boolean;
    fotos?: { url: string }[];
  } | null;
};

export function InspectionForm({
  ordenId,
  orden,
}: {
  ordenId: string;
  orden: Orden & {
    visitaTecnica: VisitaConRelaciones | null;
    cliente: Cliente;
    inmueble: Inmueble;
  };
}) {
  const visitaExistente = orden?.visitaTecnica ?? null;
  const isEditing = Boolean(visitaExistente);

  const [state, formAction] = useActionState(
    isEditing
      ? actualizarInspeccionDesdeOrden.bind(null, visitaExistente!.id)
      : crearInspeccionDesdeOrden.bind(null, ordenId),
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(isEditing ? "Ficha actualizada" : "Ficha registrada", {
        description: state.message,
      });
      if (!isEditing) formRef.current?.reset();
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (state.status === "error") {
      toast.error("No se pudo guardar", { description: state.message });
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // ---- Defaults derivados de la visita existente (enum -> value de form) ----
  const defaultMotivo =
    visitaExistente?.motivosConsulta.map((m) => motivoReverseMap[m]) ?? [];
  const defaultExterior =
    visitaExistente?.inspeccionGeneral?.sectoresExterior.map(
      (s) => exteriorReverseMap[s],
    ) ?? [];
  const defaultInterior =
    visitaExistente?.inspeccionGeneral?.sectoresInterior.map(
      (s) => interiorReverseMap[s],
    ) ?? [];
  const defaultHipotesis =
    visitaExistente?.hipotesisPreliminar?.hipotesis.map(
      (h) => hipotesisReverseMap[h],
    ) ?? [];
  const defaultInstrumentos =
    visitaExistente?.instrumentosUtilizados.map(
      (i) => instrumentoReverseMap[i],
    ) ?? [];

  const defaultSectores: SectorAfectadoDraft[] =
    visitaExistente?.sectoresAfectados?.map((s) => ({
      ambienteNombre: s.ambienteNombre,
      esExterior: s.esExterior,
      elemento: s.elemento ?? "",
      sectorElemento: s.sectorElemento ?? "",
      tiposPatologia: s.tiposPatologia ?? [],
      colorMancha: s.colorMancha ?? [],
      tamanio: s.tamanioPatologia ?? "",
      observaciones: s.observaciones ?? "",
    })) ?? [];

  const defaultFotos =
    visitaExistente?.registroFotografico?.fotos?.map((f) => f.url) ?? [];

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="flex flex-col gap-6"
    >
      <div ref={topRef} />

      {state.status === "success" ? (
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>
            {isEditing ? "Ficha actualizada correctamente" : "Ficha registrada correctamente"}
          </AlertTitle>
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
            defaultValue={visitaExistente?.numeroExpediente ?? ""}
            errors={state.errors}
          />
          <TextField
            name="fecha"
            label="Fecha"
            type="date"
            defaultValue={
              visitaExistente?.fecha
                ? new Date(visitaExistente.fecha).toISOString().slice(0, 10)
                : (orden?.fechaVisita.toISOString()?.slice(0, 10) ?? todayISO())
            }
            errors={state.errors}
          />
          <TextField
            name="hora"
            label="Hora"
            defaultValue={visitaExistente?.hora ?? orden?.horaVisita ?? ""}
            type="time"
            errors={state.errors}
          />
          <TextField
            name="arquitecta"
            label="Profesional responsable"
            defaultValue={visitaExistente?.arquitectaResponsable ?? ""}
            required
            errors={state.errors}
          />
        </FieldGroup>
      </Section>

      {/* 1. Datos del cliente */}
      <Section number={1} title="Datos del cliente">
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              name="nombre"
              label="Nombre y apellido"
              defaultValue={orden?.cliente.nombre}
              required
              errors={state.errors}
            />
            <TextField
              name="telefono"
              label="Teléfono"
              type="tel"
              inputMode="tel"
              defaultValue={orden?.cliente.telefono ?? ""}
              required
              errors={state.errors}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              inputMode="email"
              defaultValue={orden?.cliente.email ?? ""}
              required
              errors={state.errors}
            />
            <TextField
              name="barrioCiudad"
              label="Barrio / Ciudad"
              defaultValue={orden?.inmueble.barrioCiudad ?? ""}
              errors={state.errors}
            />
          </div>
          <TextField
            name="direccion"
            label="Dirección del inmueble"
            defaultValue={orden?.inmueble.direccion}
            required
            errors={state.errors}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <RadioField
              name="tipoPropiedad"
              legend="Tipo de propiedad"
              options={tipoPropiedadOptions}
              defaultValue={tipoPropiedadReverseMap[orden?.inmueble.tipoPropiedad]}
              errors={state.errors}
            />
            <TextField
              name="antiguedad"
              label="Antigüedad aproximada (años)"
              type="number"
              inputMode="numeric"
              placeholder="Ej. 45"
              defaultValue={
                orden?.inmueble.antiguedadAnios != null
                  ? String(orden.inmueble.antiguedadAnios)
                  : undefined
              }
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
            defaultValue={orden?.inmueble.tieneReformas ? "si" : "no"}
            errors={state.errors}
          />
          <TextAreaField
            name="reformasCuales"
            label="¿Cuáles?"
            placeholder="Detalle de reformas realizadas"
            defaultValue={orden?.inmueble.detalleReformas ?? ""}
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
            defaultValues={defaultMotivo}
          />
          <TextField
            name="motivoOtro"
            label="Otro (especificar)"
            placeholder="Otro motivo de consulta"
            defaultValue={visitaExistente?.motivoOtroDetalle ?? ""}
            errors={state.errors}
          />
          <TextAreaField
            name="observacionesCliente"
            label="Observaciones del cliente"
            defaultValue={visitaExistente?.observacionesCliente ?? ""}
            errors={state.errors}
          />
        </FieldGroup>
      </Section>

      {/* 3. Inspección general */}
      <Section number={3} title="Inspección general del inmueble">
        <FieldGroup>
          <CheckboxGroup
            name="exterior"
            legend="Exterior"
            options={exteriorOptions}
            defaultValues={defaultExterior}
          />
          <TextAreaField
            name="exteriorObs"
            label="Observaciones exteriores"
            defaultValue={visitaExistente?.inspeccionGeneral?.observacionesExterior ?? ""}
            errors={state.errors}
          />
          <Separator />
          <CheckboxGroup
            name="interior"
            legend="Interior"
            options={interiorOptions}
            defaultValues={defaultInterior}
          />
          <TextAreaField
            name="interiorObs"
            label="Observaciones interiores"
            defaultValue={visitaExistente?.inspeccionGeneral?.observacionesInterior ?? ""}
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
        <PatologiaTable
          defaultPatologias={visitaExistente?.patologias}
          patologiaEnumByValue={patologiaMap}
          severidadEnumReverse={severidadReverseMap}
        />
      </Section>

      {/* 5. Sectores afectados */}
      <Section
        number={5}
        title="Sectores afectados por ambiente"
        description="Problema detectado, medición aproximada y observaciones por ambiente."
      >
        <AmbientesTable defaultSectores={defaultSectores} />
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
            defaultValues={defaultHipotesis}
          />
          <TextAreaField
            name="observacionesTecnicas"
            label="Observaciones técnicas"
            defaultValue={visitaExistente?.hipotesisPreliminar?.observacionesTecnicas ?? ""}
            errors={state.errors}
          />
        </FieldGroup>
      </Section>

      {/* 7. Registro fotográfico */}
      <Section number={7} title="Registro fotográfico">
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox
              id="registroFotografico"
              name="registroFotografico"
              value="on"
              defaultChecked={visitaExistente?.registroFotografico?.realizado ?? false}
            />
            <FieldLabel htmlFor="registroFotografico" className="font-normal">
              Registro fotográfico realizado
            </FieldLabel>
          </Field>
          <PhotoUpload error={state.errors?.fotos} defaultFotos={defaultFotos} />
        </FieldGroup>
      </Section>

      {/* 8. Instrumentos utilizados */}
      <Section number={8} title="Instrumentos utilizados">
        <CheckboxGroup
          name="instrumentos"
          legend="Seleccioná los instrumentos empleados"
          options={instrumentosOptions}
          columns={3}
          defaultValues={defaultInstrumentos}
        />
      </Section>

      {/* 9. Cierre de visita */}
      <Section number={9} title="Cierre de visita">
        <FieldGroup>
          <FieldSet>
            <FieldLegend variant="label">Estado</FieldLegend>
            <Field orientation="horizontal">
              <Checkbox
                id="requiereInforme"
                name="requiereInforme"
                value="on"
                defaultChecked={visitaExistente?.requiereInformeCompleto ?? false}
              />
              <FieldLabel htmlFor="requiereInforme" className="font-normal">
                Requiere informe completo
              </FieldLabel>
            </Field>
          </FieldSet>
          <FieldDescription>
            Las firmas del profesional y del cliente se completan sobre el
            documento impreso al cierre de la visita (contrapago del servicio).
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
        <SubmitButton isEditing={isEditing} />
      </div>
    </form>
  );
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="sm:min-w-48">
      {pending ? (
        <LoaderIcon data-icon="inline-start" className="animate-spin" />
      ) : null}
      {pending ? "Guardando..." : isEditing ? "Actualizar ficha" : "Registrar ficha"}
    </Button>
  );
}

function PhotoUpload({
  error,
  defaultFotos = [],
}: {
  error?: string;
  defaultFotos?: string[];
}) {
  const [existingUrls, setExistingUrls] = useState<string[]>(defaultFotos);
  const { items, uploadFiles, removeItem, isUploading, uploadedUrls } =
    useCloudinaryUpload();

  function removeExisting(url: string) {
    setExistingUrls((prev) => prev.filter((u) => u !== url));
  }

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor="fotos">Adjuntar fotografías</FieldLabel>
      <FieldDescription>
        Hasta 12 imágenes (JPG/PNG), máximo 8 MB cada una.
      </FieldDescription>

      <label htmlFor="fotos" className="/* ... */">
        <ImageIcon className="size-6 text-muted-foreground" />
        <span className="text-sm font-medium">Hacé clic para seleccionar imágenes</span>
      </label>
      <input
        id="fotos"
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) uploadFiles(files);
        }}
      />

      {/* hidden inputs: fotos ya existentes (que el usuario no borró) + nuevas subidas */}
      {existingUrls.map((url) => (
        <input key={url} type="hidden" name="fotos" value={url} />
      ))}
      {uploadedUrls.map((url) => (
        <input key={url} type="hidden" name="fotos" value={url} />
      ))}

      {existingUrls.length > 0 ? (
        <ul className="flex flex-col gap-1.5 pt-1">
          {existingUrls.map((url) => (
            <li key={url} className="flex items-center gap-2 text-sm">
              <img src={url} className="size-8 rounded object-cover" />
              <span className="truncate">Foto guardada</span>
              <button type="button" onClick={() => removeExisting(url)}>
                <XIcon className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="flex flex-col gap-1.5 pt-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <img src={item.previewUrl} className="size-8 rounded object-cover" />
            <span className="truncate">{item.file.name}</span>
            {item.status === "uploading" && <span>{item.progress}%</span>}
            {item.status === "success" && <CheckCircle2Icon className="size-4 text-green-600" />}
            {item.status === "error" && <span className="text-destructive">{item.error}</span>}
            <button type="button" onClick={() => removeItem(index)}>
              <XIcon className="size-4" />
            </button>
          </li>
        ))}
      </ul>

      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  );
}

// components/panel/inspection-fields.tsx (RadioField local, ya lo tenías así)

type Option = { value: string; label: string };

function RadioField({
  name,
  legend,
  options,
  errors,
  orientation,
  defaultValue,
}: {
  name: string;
  legend: string;
  options: Option[];
  errors?: FieldErrors;
  orientation?: "horizontal" | "vertical";
  defaultValue?: string;
}) {
  return (
    <FieldSet>
      <FieldLegend variant="label">{legend}</FieldLegend>
      <RadioGroup
        name={name}
        defaultValue={defaultValue}
        className={cn(
          "flex gap-4",
          orientation === "vertical" && "flex-col",
        )}
      >
        {options.map((option) => (
          <Field key={option.value} orientation="horizontal">
            <RadioGroupItem
              id={`${name}-${option.value}`}
              value={option.value}
            />
            <FieldLabel
              htmlFor={`${name}-${option.value}`}
              className="font-normal"
            >
              {option.label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      {errors?.[name] ? <FieldError>{errors[name]}</FieldError> : null}
    </FieldSet>
  );
}