// usePdfDownload.jsx
// Hook React para generar y descargar PDFs en el browser con pdfmake
//
// Instalar: npm install pdfmake
// ─────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";

// Carga pdfmake lazy para no inflar el bundle inicial
async function loadPdfMake() {
  const [pdfMakeModule, fontsModule] = await Promise.all([
    import("pdfmake/build/pdfmake"),
    import("pdfmake/build/vfs_fonts"),
  ]);
  const pdfMake: any = pdfMakeModule.default;

  const { default: _ignore, ...fontFiles } = fontsModule;
  Object.entries(fontFiles).forEach(([name, data]: any) => {
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    pdfMake.virtualfs.writeFileSync(name, bytes);
  });

  pdfMake.fonts = {
    Roboto: {
      normal:      "Roboto-Regular.ttf",
      bold:        "Roboto-Medium.ttf",
      italics:     "Roboto-Italic.ttf",
      bolditalics: "Roboto-MediumItalic.ttf",
    },
  };

  return pdfMake;
}

// ─────────────────────────────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────────────────────────────

const COLORS = {
  primary:      "#244b80",
  primaryLight: "#c7d2fe",
  headerBg:     "#244b80",
  sectionBg:    "#ede9fe",
  equipoBg:     "#f5f3ff",
  rowEven:      "#f8fafc",
  rowOdd:       "#ffffff",
  border:       "#e2e8f0",
  text:         "#0f172a",
  textMuted:    "#64748b",
  white:        "#ffffff",
  sinControl:   "#e2e8f0",
};

const MESES = [
  "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// ─────────────────────────────────────────────────────────────────────
// Helpers generales
// ─────────────────────────────────────────────────────────────────────

function mesLabel(mes: string) {
  return MESES[parseInt(mes, 10)] ?? mes;
}

function formatFecha(fechaStr: string | number | Date) {
  if (!fechaStr) return "—";
  const d = new Date(fechaStr);
  //if (isNaN(d)) return fechaStr;
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** Elimina tags HTML y devuelve texto plano */
function stripHtml(html: string) {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Convierte color hex a rgb [r, g, b] en rango 0-255 */
function hexToRgb(hex: any) {
  const clean = (hex ?? "#cccccc").replace("#", "");
  const val = parseInt(clean.padEnd(6, "0"), 16);
  return [(val >> 16) & 255, (val >> 8) & 255, val & 255];
}

/** Claridad perceptual para decidir si el texto encima es negro o blanco */
function luminance([r, g, b]: any) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function textColorForBg(hex: any) {
  return luminance(hexToRgb(hex)) > 0.55 ? COLORS.text : COLORS.white;
}

// ─────────────────────────────────────────────────────────────────────
// Helpers de celdas
// ─────────────────────────────────────────────────────────────────────

function headerCell(text: string, opts = {}) {
  return {
    text: text ?? "",
    fontSize: 7.5,
    bold: true,
    color: COLORS.white,
    fillColor: COLORS.primary,
    alignment: "center",
    margin: [4, 5, 4, 5],
    ...opts,
  };
}

function cell(text: string, opts = {}) {
  return {
    text: text ?? "—",
    fontSize: 8,
    color: COLORS.text,
    alignment: "left",
    margin: [4, 5, 4, 5],
    ...opts,
  };
}

function colorCell(text: string, bgColor: string, opts = {}) {
  const bg = bgColor ?? COLORS.sinControl;
  return {
    text: text ?? "—",
    fontSize: 7.5,
    bold: !!bgColor,
    color: bgColor ? textColorForBg(bg) : COLORS.textMuted,
    fillColor: bg,
    alignment: "center",
    margin: [4, 5, 4, 5],
    ...opts,
  };
}

function sectionTitle(text: string, { pageBreak = false } = {}) {
  return {
    stack: [
      {
        canvas: [{ type: "rect", x: 0, y: 0, w: 515, h: 26, color: COLORS.headerBg }],
      },
      {
        text: text,
        fontSize: 12,
        bold: true,
        color: COLORS.white,
        margin: [8, -20, 0, 6],
      },
    ],
    margin: [0, 12, 0, 8],
    ...(pageBreak ? { pageBreak: "before" } : {}),
  };
}

function subsectionTitle(text: string) {
  return {
    text: text,
    fontSize: 10,
    bold: true,
    color: COLORS.primary,
    margin: [0, 10, 0, 4],
    decoration: "underline",
  };
}

function divider() {
  return {
    canvas: [{ type: "line", x1: 0, y1: 4, x2: 515, y2: 4, lineWidth: 0.5, lineColor: COLORS.border }],
    margin: [0, 6, 0, 6],
  };
}

// ─────────────────────────────────────────────────────────────────────
// Sección 1: INTRODUCCIÓN (HTML → texto plano estructurado)
// ─────────────────────────────────────────────────────────────────────

function buildIntroduccion(html: any) {
  if (!html) return [];

  const texto = stripHtml(html);
  const lineas = texto.split("\n").filter((l: string) => l.trim());

  const paragraphs = lineas.map((linea: string) => {
    const isTitle = /^[A-Z\s:]{6,}$/.test(linea.trim());
    return {
      text: linea.trim(),
      fontSize: isTitle ? 10 : 9,
      bold: isTitle,
      color: isTitle ? COLORS.primary : COLORS.text,
      margin: [0, isTitle ? 6 : 2, 0, isTitle ? 2 : 1],
    };
  });

  return [sectionTitle("INTRODUCCIÓN"), ...paragraphs, divider()];
}

// ─────────────────────────────────────────────────────────────────────
// HOOK: usePdfDownload
// ─────────────────────────────────────────────────────────────────────
//
// download({
//   filename : "reporte",
//   title    : "Reporte de vibraciones",
//   subtitle : "Agosto – Noviembre 2025",
//   data     : {
//     intro,            // string HTML opcional
//     detalle_informe,  // array de meses con equipos
//     resumenRes,       // objeto con gráficos y tablas de estados
//     fallasRes,        // objeto con gráficos y tablas de fallas
//     // + campos planos: titulo, control, desde, hasta, equipos, secciones
//   },
// });

// ─────────────────────────────────────────────────────────────────────
// Helper: convierte una URL de imagen a dataURL base64 via canvas
// Retorna null si falla (CORS, formato inválido, etc.)
// ─────────────────────────────────────────────────────────────────────
export async function imageUrlToBase64(url: string | string[]) {
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          // Validar que sea un dataURL real
          if (!dataUrl || dataUrl === "data:," || !dataUrl.startsWith("data:image")) {
            reject(new Error("Canvas devolvió dataURL inválido"));
          } else {
            resolve(dataUrl);
          }
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = () => reject(new Error("No se pudo cargar la imagen: " + url));
      // Forzar recarga limpia para evitar caché sin CORS headers
      img.src = url + (url.includes("?") ? "&" : "?") + "_t=" + Date.now();
    });
  } catch (err) {
    console.warn("[imageUrlToBase64] Falló, el PDF se generará sin logo:", err instanceof Error ? err.message : "Error al generar el PDF");
    return null;
  }
}

export function usePdfDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null | undefined>(null);

  const download = useCallback(async (config : {
    filename?: string;
    title?: string;
    subtitle?: string;
    logoBase64?: string | null;
    data: any;
  } = {
      data: undefined
  } ) => {
    const {
      filename = "reporte",
      title,
      subtitle = "",
      logoBase64 = null,
      data = {},
    } = config;

    if (!data || !data.detalle_informe?.length) {
      setError("No hay datos para exportar.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const pdfMake = await loadPdfMake();

      // Validar que logoBase64 sea un dataURL real antes de pasarlo a pdfmake
      const safeLogo = (logoBase64 && logoBase64.startsWith("data:image")) ? logoBase64 : null;

      const reportTitle  = title ?? data.titulo ?? "Reporte";
      const reportSubtitle = subtitle ||
        [data.control, data.desde && data.hasta ? `${data.desde} – ${data.hasta}` : ""]
          .filter(Boolean)
          .join("  ·  ");
      const totalEquipos   = data.equipos ?? "—";
      const totalSecciones = data.secciones ?? "—";
      const dateStr = new Date().toLocaleDateString("es-AR", {
        day: "2-digit", month: "long", year: "numeric",
      });

      // ── Armar contenido en orden ─────────────────────────────────
      // Cada sección fuerza página nueva con pageBreak en su primer elemento.
      // El informe además arranca cada mes en página nueva.

      const content = [
        // Espacio inicial (debajo del header fijo)
        { text: "", margin: [0, 4] },

        // Pág 1: Introducción
        ...buildIntroduccion(data.intro),
      ];

      const docDef = {
        pageSize:    "A4",
        pageMargins: [40, 75, 40, 50],
        defaultStyle: { font: "Roboto" },

        // ── Header ─────────────────────────────────────────────────
        header: () => ({
          stack: [
            {
              canvas: [{ type: "rect", x: 0, y: 0, w: 595, h: 64, color: COLORS.primary }],
              absolutePosition: { x: 0, y: 0 },
            },
            {
              columns: [
                // Columna izquierda: logo (si existe) + título
                {
                  stack: [
                    {
                      text: reportTitle,
                      fontSize: 14,
                      bold: true,
                      color: COLORS.white,
                      margin: [0, 0, 0, 2],
                    },
                    {
                      text: reportSubtitle || dateStr,
                      fontSize: 7.5,
                      color: COLORS.primaryLight,
                    },
                  ],
                  margin: [40, 14, 0, 0],
                  width: "*",
                },
                // Columna derecha: logo + equipos/secciones
                {
                  stack: [
                    ...(safeLogo
                      ? [{
                          image: safeLogo,
                          height: 28,
                          fit: [90, 28],
                          alignment: "right",
                          margin: [0, 0, 0, 2],
                        }]
                      : []),
                    {
                      text: `${totalEquipos} equipos · ${totalSecciones} sección/es`,
                      fontSize: 7.5,
                      color: COLORS.primaryLight,
                      alignment: "right",
                    },
                  ],
                  margin: [0, 12, 40, 0],
                  width: "auto",
                },
              ],
            },
          ],
        }),

        // ── Footer ─────────────────────────────────────────────────
        footer: (currentPage: any, pageCount: any) => ({
          stack: [
            {
              canvas: [{ type: "rect", x: 0, y: 0, w: 595, h: 30, color: COLORS.primary }],
              absolutePosition: { x: 0, y: 0 },
            },
            {
              columns: [
                {
                  text: `Generado el ${dateStr}`,
                  fontSize: 7,
                  color: COLORS.primaryLight,
                  margin: [40, 8, 0, 0],
                },
                {
                  text: `Página ${currentPage} de ${pageCount}`,
                  fontSize: 7,
                  color: COLORS.primaryLight,
                  alignment: "right",
                  margin: [0, 8, 40, 0],
                },
              ],
            },
          ],
        }),

        content,
      };

      pdfMake
        .createPdf(docDef as any)
        .download(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);

    } catch (err) {
      console.error("[usePdfDownload]", err);
      setError(err instanceof Error ? err.message : "Error al generar el PDF");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { download, isGenerating, error };
}