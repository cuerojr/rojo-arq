import { InspectionForm } from "@/components/panel/inspection-form";

export default function Page() {
  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl flex-col gap-1 px-4 py-8 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-primary">
              rojoarq
            </span>
            <span className="text-xs text-muted-foreground">
              · Servicio de Diagnóstico Constructivo
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Ficha de Visita Técnica
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Relevamiento y diagnóstico constructivo. Completá los campos del
            relevamiento; los marcados con
            <span className="text-primary"> *</span> son obligatorios.
          </p>
        </div>
      </header>
      <InspectionForm />
    </>
  );
}
