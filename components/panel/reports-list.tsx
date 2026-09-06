"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PAGE_SIZE = 10;

const estadoClasses: Record<any, string> = {
  completado: "bg-primary/10 text-primary",
  "en-proceso": "bg-chart-3/15 text-foreground",
  pendiente: "bg-muted text-muted-foreground",
  error: "bg-destructive/10 text-destructive",
};

export function ReportsList({ reports, titulo = "Informe" }: { reports?: any; titulo?: string }) {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter(
      (r: { nombre: string; autor: string; id: string; categoria: string }) => {
        const matchQuery =
          q === "" ||
          r.nombre.toLowerCase().includes(q) ||
          r.autor.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q);
        const matchCategoria =
          categoria === "Todas" || r.categoria === categoria;
        return matchQuery && matchCategoria;
      },
    );
  }, [query, categoria]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);
  console.log("🚀 ~ ReportsList ~ pageItems:", pageItems)

  function resetToFirstPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  const onQuery = resetToFirstPage(setQuery);
  const onCategoria = resetToFirstPage(setCategoria);

  return (
    <div className="flex flex-col gap-4">
      {/* Navegador de filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs hidden">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Buscar por nombre, autor o ID…"
            className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/*categoriasDisponibles.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoria(cat)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                categoria === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {cat}
            </button>
          ))*/}
        </div>
      </div>

      {/* Lista de informes */}
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="hidden grid-cols-12 gap-4 border-b border-border bg-muted/50 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
          <span className="col-span-5">{titulo}</span>
          <span className="col-span-2">Autor</span>
          <span className="col-span-2">Fecha</span>
          <span className="col-span-1 text-right">Estado</span>
        </div>

        {pageItems.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-muted-foreground">
            No se encontraron informes que coincidan con tu búsqueda.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {pageItems.map((r: any) => (
              <li
                key={r.id}
                className="grid grid-cols-1 gap-2 px-4 py-3 transition-colors hover:bg-accent/40 md:grid-cols-12 md:items-center md:gap-4"
              >
                <div className="col-span-5 min-w-0">
                  <Link
                    href={`/panel/${titulo.toLowerCase()}/${r.id}`}
                    className="font-medium text-foreground hover:underline"
                  >
                    <p className="truncate text-sm font-medium text-foreground">
                      {r.cliente.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.inmueble.direccion}
                    </p>
                  </Link>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">
                  {r.arquitectaResponsable}
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">
                  {r.fecha?.toLocaleDateString("es-AR")}
                </div>
                <div className="col-span-1 flex items-center justify-between gap-2 md:justify-end">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      estadoClasses[r.estado],
                    )}
                  >
                    { r.estado }
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Paginador */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          {filtered.length === 0
            ? "0 resultados"
            : `Mostrando ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} de ${filtered.length} informes`}
        </p>

        <div className="flex items-center gap-1">
          {
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-9 items-center gap-1 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronLeft className="size-4" />
              Anterior
            </button>
          }

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                p === currentPage
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {p}
            </button>
          ))}

          {
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex h-9 items-center gap-1 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              Siguiente
              <ChevronRight className="size-4" />
            </button>
          }
        </div>
      </div>
    </div>
  );
}
