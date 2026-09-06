"use client";

import { useCallback, useState } from "react";
import {
  obtenerOrdenParaDescarga,
  type OrdenParaPDF,
} from "@/lib/actions/orders"; // ajustá el path según donde lo guardes

const ESTADO_LABEL: Record<string, string> = {
  PENDIENTE: "Pendiente",
  EN_PROCESO: "En proceso",
  COMPLETADA: "Completada",
  CANCELADA: "Cancelada",
};

const TIPO_PROPIEDAD_LABEL: Record<string, string> = {
  CASA: "Casa",
  DEPARTAMENTO: "Departamento",
  LOCAL: "Local",
  OFICINA: "Oficina",
  PH: "PH",
};

const NOMBRE_ESTUDIO = "Rojo Arquitectura"; // TODO: reemplazar por el nombre real del estudio

function formatFecha(fecha: Date | string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(fecha));
}

function formatMoneda(valor: number | null) {
  if (valor === null || valor === undefined) return "-";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(valor);
}

function construirDocDefinition(orden: OrdenParaPDF) {
  const fechaEmision = formatFecha(new Date());

  return {
    pageSize: "A4",
    pageMargins: [40, 70, 40, 60] as [number, number, number, number],

    header: {
      margin: [40, 20, 40, 0],
      columns: [
        { text: NOMBRE_ESTUDIO, bold: true, fontSize: 12, color: "#1f2937" },
        {
          text: `Orden Nº ${orden.id.slice(-8).toUpperCase()}`,
          alignment: "right",
          fontSize: 10,
          color: "#6b7280",
        },
      ],
    },

    footer: (currentPage: number, pageCount: number) => ({
      margin: [40, 0, 40, 20],
      columns: [
        { text: `Emitido el ${fechaEmision}`, fontSize: 8, color: "#9ca3af" },
        {
          text: `Página ${currentPage} de ${pageCount}`,
          alignment: "right",
          fontSize: 8,
          color: "#9ca3af",
        },
      ],
    }),

    content: [
      { text: "Orden de Servicio", style: "titulo" },
      orden.numeroExpediente
        ? {
            text: `Expediente Nº ${orden.numeroExpediente}`,
            style: "subtitulo",
          }
        : null,

      { text: " ", margin: [0, 4] },

      {
        columns: [
          {
            width: "50%",
            stack: [
              { text: "Cliente", style: "seccion" },
              { text: orden.cliente.nombre, style: "dato" },
              orden.cliente.telefono
                ? { text: orden.cliente.telefono, style: "datoSecundario" }
                : null,
              orden.cliente.email
                ? { text: orden.cliente.email, style: "datoSecundario" }
                : null,
            ].filter(Boolean),
          },
          {
            width: "50%",
            stack: [
              { text: "Inmueble", style: "seccion" },
              { text: orden.inmueble.direccion, style: "dato" },
              {
                text: [
                  TIPO_PROPIEDAD_LABEL[orden.inmueble.tipoPropiedad],
                  orden.inmueble.barrioCiudad
                    ? ` · ${orden.inmueble.barrioCiudad}`
                    : "",
                ].join(""),
                style: "datoSecundario",
              },
              orden.inmueble.antiguedadAnios
                ? {
                    text: `Antigüedad: ${orden.inmueble.antiguedadAnios} años`,
                    style: "datoSecundario",
                  }
                : null,
            ].filter(Boolean),
          },
        ],
      },

      { text: " ", margin: [0, 10] },

      {
        table: {
          widths: ["*", "*"],
          body: [
            [
              { text: "Estado de la orden", style: "tablaHeader" },
              { text: "Fecha de creación", style: "tablaHeader" },
            ],
            [
              { text: ESTADO_LABEL[orden.estado], style: "tablaValor" },
              { text: formatFecha(orden.createdAt), style: "tablaValor" },
            ],
          ],
        },
        layout: "lightHorizontalLines",
      },

      { text: " ", margin: [0, 14] },

      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: [
                  { text: "Seña abonada", style: "seccion" },
                  { text: formatMoneda(orden.sena), style: "monto" },
                ],
              },
            ],
          ],
        },
        layout: "noBorders",
      },

      orden.disclamer
        ? {
            text: orden.disclamer,
            italics: true,
            fontSize: 8,
            color: "#6b7280",
            margin: [0, 20, 0, 0] as [number, number, number, number],
          }
        : null,
    ].filter(Boolean),

    styles: {
      titulo: {
        fontSize: 18,
        bold: true,
        color: "#111827",
        margin: [0, 0, 0, 2],
      },
      subtitulo: { fontSize: 10, color: "#6b7280" },
      seccion: {
        fontSize: 9,
        bold: true,
        color: "#9ca3af",
        margin: [0, 0, 0, 4] as [number, number, number, number],
      },
      dato: {
        fontSize: 12,
        color: "#111827",
        margin: [0, 0, 0, 2] as [number, number, number, number],
      },
      datoSecundario: { fontSize: 9, color: "#4b5563" },
      tablaHeader: {
        fontSize: 8,
        bold: true,
        color: "#6b7280",
        fillColor: "#f9fafb",
      },
      tablaValor: {
        fontSize: 11,
        color: "#111827",
        margin: [0, 2, 0, 0] as [number, number, number, number],
      },
      monto: { fontSize: 16, bold: true, color: "#111827" },
    },

    defaultStyle: {
      font: "Roboto",
    },
  };
}

export function useDescargarOrdenPDF() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const descargarPDF = useCallback(async (ordenId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const orden = await obtenerOrdenParaDescarga(ordenId);

      // pdfmake toca `window`, por eso se importa dinámicamente (sólo corre en el cliente)
      const pdfMakeModule = await import("pdfmake/build/pdfmake");
      const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

      const pdfMake: any = (pdfMakeModule as any).default ?? pdfMakeModule;
      const pdfFonts: any = (pdfFontsModule as any).default ?? pdfFontsModule;

      // Compatibilidad entre versiones de pdfmake: algunas exponen .pdfMake.vfs, otras .vfs directo
      pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

      const docDefinition = construirDocDefinition(orden);
      const nombreArchivo = `orden-${orden.id.slice(-8)}.pdf`;

      pdfMake.createPdf(docDefinition).download(nombreArchivo);
    } catch (err) {
      console.error("Error al generar el PDF de la orden:", err);
      setError("No se pudo generar el PDF. Intentá nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { descargarPDF, isLoading, error };
}

/* Uso:
const { descargarPDF, isLoading, error } = useDescargarOrdenPDF();

<button onClick={() => descargarPDF(orden.id)} disabled={isLoading}>
  {isLoading ? "Generando..." : "Descargar orden"}
</button>
*/
