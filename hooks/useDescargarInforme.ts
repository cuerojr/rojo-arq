"use client";

import { useCallback, useState } from "react";
import {
  cargarPdfMake,
  cargarImagenBase64,
  cargarLogoBase64,
} from "@/lib/pdf/pdf-utils";
import {
  type Informe,
  EXTERIOR_LABELS,
  HIPOTESIS_LABELS,
  INSTRUMENTO_LABELS,
  INTERIOR_LABELS,
  MOTIVO_LABELS,
  SEVERIDAD_LABELS,
  TIPO_PROPIEDAD_LABELS,
  formatFecha,
} from "@/lib/schemas/informe-detalle";
import {
  elementoOptions,
  sectorElementoOptionsByElemento,
  tipoPatologiaSectorOptions,
  colorManchaOptions,
} from "@/lib/inspection";

const NOMBRE_ESTUDIO = "Rojo Arq";

// Ajustá `primary` al mismo color que usa tu tema (--primary) en la vista
const COLORS = {
  primary: "#244b80",
  text: "#111827",
  textMuted: "#6b7280",
  white: "#ffffff",
  border: "#e5e7eb",
  rowEven: "#f9fafb",
  rowOdd: "#ffffff",
};

const SEV: Record<string, { bg: string; fg: string }> = {
  LEVE: { bg: "#dbe6f5", fg: COLORS.primary },
  MEDIA: { bg: "#fef3c7", fg: "#92400e" },
  ALTA: { bg: "#fee2e2", fg: "#b91c1c" },
};

const noBorderLayout = {
  hLineWidth: () => 0.5,
  vLineWidth: () => 0.5,
  hLineColor: () => COLORS.border,
  vLineColor: () => COLORS.border,
};

// Reduce el peso de las fotos de Cloudinary (w_900 + calidad automática)
const optimize = (url: string) =>
  url.includes("/upload/")
    ? url.replace("/upload/", "/upload/w_900,q_auto/")
    : url;

// ── Helpers de UI ────────────────────────────────────────────────────

const sectionHeader = (step: string, title: string, description?: string) => ({
  stack: [
    {
      text: step.toUpperCase(),
      fontSize: 7,
      color: COLORS.textMuted,
      characterSpacing: 1,
    },
    {
      text: title,
      fontSize: 13,
      bold: true,
      color: COLORS.text,
      margin: [0, 1, 0, 0],
    },
    ...(description
      ? [
          {
            text: description,
            fontSize: 8,
            color: COLORS.textMuted,
            margin: [0, 2, 0, 0],
          },
        ]
      : []),
    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 4,
          x2: 515,
          y2: 4,
          lineWidth: 1,
          lineColor: COLORS.primary,
        },
      ],
      margin: [0, 4, 0, 8],
    },
  ],
  margin: [0, 14, 0, 0],
  unbreakable: true,
});

const field = (label: string, value?: string | number | null) => ({
  stack: [
    {
      text: label.toUpperCase(),
      fontSize: 6.5,
      color: COLORS.textMuted,
      characterSpacing: 0.6,
    },
    {
      text: String(value ?? "") || "—",
      fontSize: 9.5,
      bold: true,
      color: COLORS.text,
      margin: [0, 2, 0, 0],
    },
  ],
  margin: [0, 0, 0, 8],
});

const chips = (items: string[] = [], labels: Record<string, string>) => {
  if (!items?.length) {
    return {
      text: "Sin ítems registrados.",
      fontSize: 9,
      color: COLORS.textMuted,
    };
  }
  const COLS = 3;
  const rows: any[][] = [];
  for (let i = 0; i < items.length; i += COLS) {
    const slice: (string | null)[] = items.slice(i, i + COLS);
    while (slice.length < COLS) slice.push(null);
    rows.push(
      slice.map((it) =>
        it
          ? {
              text: labels[it] ?? it,
              fontSize: 8.5,
              bold: true,
              fillColor: COLORS.rowEven,
              margin: [6, 4, 6, 4],
            }
          : { text: "", border: [false, false, false, false] },
      ),
    );
  }
  return {
    table: { widths: Array(COLS).fill("*"), body: rows },
    layout: noBorderLayout,
    margin: [0, 0, 0, 4],
  };
};

const obsBox = (label: string, value?: string | null) =>
  !value
    ? null
    : {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: [
                  {
                    text: label.toUpperCase(),
                    fontSize: 6.5,
                    color: COLORS.textMuted,
                    characterSpacing: 0.6,
                  },
                  {
                    text: value,
                    fontSize: 9,
                    color: COLORS.text,
                    margin: [0, 2, 0, 0],
                  },
                ],
                fillColor: "#f1f5f9",
                margin: [8, 6, 8, 6],
              },
            ],
          ],
        },
        layout: "noBorders",
        margin: [0, 4, 0, 4],
      };

const firmaBox = (label: string, nombre: string, img: string | null) => ({
  width: "*",
  stack: [
    {
      table: {
        widths: ["*"],
        heights: [80],
        body: [
          [
            img
              ? {
                  image: img,
                  fit: [200, 70],
                  alignment: "center",
                  margin: [0, 4, 0, 0],
                }
              : {
                  text: "PENDIENTE DE FIRMA",
                  fontSize: 7,
                  color: COLORS.textMuted,
                  alignment: "center",
                  margin: [0, 32, 0, 0],
                },
          ],
        ],
      },
      layout: { ...noBorderLayout, fillColor: () => "#f8fafc" },
    },
    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 6,
          x2: 240,
          y2: 6,
          lineWidth: 0.5,
          lineColor: COLORS.border,
        },
      ],
    },
    {
      text: nombre,
      fontSize: 9.5,
      bold: true,
      alignment: "center",
      margin: [0, 6, 0, 0],
    },
    {
      text: label.toUpperCase(),
      fontSize: 6.5,
      color: COLORS.textMuted,
      alignment: "center",
      characterSpacing: 0.6,
    },
  ],
});

// ── Contenido del informe ────────────────────────────────────────────

function buildContent(
  informe: Informe,
  img: {
    fotos: (string | null)[];
    firmaPro: string | null;
    firmaCli: string | null;
  },
) {
  const { cliente, inmueble, hipotesisPreliminar } = informe as any;

  // Datos generales (encabezado de la vista)
  const generales = {
    table: {
      widths: ["*", "*", "*", "*"],
      body: [
        [
          field("Fecha", formatFecha(informe.fecha)),
          field("Hora", `${informe.hora} hs`),
          field("Arquitecta responsable", informe.arquitectaResponsable),
          field(
            "Informe completo",
            informe.requiereInformeCompleto ? "Requerido" : "No requerido",
          ),
        ].map((c) => ({ ...c, margin: [8, 8, 8, 0] })),
      ],
    },
    layout: { ...noBorderLayout, fillColor: () => "#f8fafc" },
  };

  // Patologías
  const patologiasBody = [
    ["Patología", "Presencia", "Severidad"].map((t) => ({
      text: t,
      fontSize: 7.5,
      bold: true,
      color: COLORS.white,
      fillColor: COLORS.primary,
      margin: [6, 5, 6, 5],
    })),
    ...((informe as any).patologias ?? []).map((p: any, i: number) => {
      const sev =
        typeof p.severidad === "string" && p.severidad in SEVERIDAD_LABELS
          ? p.severidad
          : null;
      const fill = i % 2 ? COLORS.rowEven : COLORS.rowOdd;
      return [
        {
          text: p.tipo,
          fontSize: 8.5,
          bold: true,
          fillColor: fill,
          margin: [6, 4, 6, 4],
        },
        {
          text: p.presente ? "Presente" : "No detectada",
          fontSize: 8.5,
          fillColor: fill,
          margin: [6, 4, 6, 4],
          color: p.presente ? COLORS.text : COLORS.textMuted,
        },
        p.presente && sev
          ? {
              text: (SEVERIDAD_LABELS as any)[sev],
              fontSize: 8,
              bold: true,
              alignment: "center",
              color: SEV[sev].fg,
              fillColor: SEV[sev].bg,
              margin: [6, 4, 6, 4],
            }
          : {
              text: "—",
              fontSize: 8.5,
              color: COLORS.textMuted,
              fillColor: fill,
              margin: [6, 4, 6, 4],
            },
      ];
    }),
  ];

  // Sectores afectados
  const sectores = ((informe as any).sectoresAfectados ?? []).map((s: any) => {
    const elemento = elementoOptions.find(
      (e: any) => e.value === s.elemento,
    )?.label;
    const sector = sectorElementoOptionsByElemento[s.elemento]?.find(
      (se: any) => se.value === s.sectorElemento,
    )?.label;
    const patologias = (s.tiposPatologia ?? [])
      .map(
        (tp: string) =>
          tipoPatologiaSectorOptions.find((o: any) => o.value === tp)?.label,
      )
      .filter(Boolean)
      .join(", ");
    const colores = s.colorMancha?.length
      ? ` (${s.colorMancha
          .map(
            (c: string) =>
              colorManchaOptions.find((o: any) => o.value === c)?.label,
          )
          .filter(Boolean)
          .join(", ")})`
      : "";

    return {
      unbreakable: true,
      margin: [0, 0, 0, 6],
      table: {
        widths: [3, "*"],
        body: [
          [
            { text: "", fillColor: COLORS.primary },
            {
              fillColor: COLORS.rowEven,
              margin: [8, 6, 8, 6],
              stack: [
                {
                  text: `${s.ambienteNombre}${s.esExterior ? " (exterior)" : ""}`,
                  fontSize: 9.5,
                  bold: true,
                },
                {
                  text: [elemento, sector].filter(Boolean).join(" — "),
                  fontSize: 8.5,
                  margin: [0, 2, 0, 0],
                },
                {
                  text: `${patologias}${colores}${s.tamanio ? ` · ${s.tamanio}` : ""}`,
                  fontSize: 8.5,
                },
                ...(s.observaciones
                  ? [
                      {
                        text: s.observaciones,
                        fontSize: 8.5,
                        color: COLORS.textMuted,
                        margin: [0, 2, 0, 0],
                      },
                    ]
                  : []),
              ],
            },
          ],
        ],
      },
      layout: {
        hLineWidth: () => 0.5,
        vLineWidth: () => 0,
        hLineColor: () => COLORS.border,
      },
    };
  });

  // Fotos en grilla de 2 columnas
  const fotoCells = img.fotos.map((f) =>
    f
      ? { image: f, fit: [250, 190], margin: [0, 0, 0, 8] }
      : { text: "Imagen no disponible", fontSize: 8, color: COLORS.textMuted },
  );
  const fotoRows: any[] = [];
  for (let i = 0; i < fotoCells.length; i += 2) {
    fotoRows.push({
      columns: [fotoCells[i], fotoCells[i + 1] ?? { text: "" }],
      columnGap: 15,
      unbreakable: true,
    });
  }

  const instrumentos = ((informe as any).instrumentosUtilizados ??
    []) as string[];

  return [
    generales,

    // 01 + 02
    sectionHeader("Sección 01 / 02", "Cliente e Inmueble"),
    {
      columns: [
        {
          width: "*",
          stack: [
            {
              text: "DATOS DEL CLIENTE",
              fontSize: 8,
              bold: true,
              color: COLORS.primary,
              margin: [0, 0, 0, 6],
            },
            field("Nombre", cliente.nombre),
            field("Teléfono", cliente.telefono),
            field("Email", cliente.email),
          ],
        },
        {
          width: "*",
          stack: [
            {
              text: "DATOS DEL INMUEBLE",
              fontSize: 8,
              bold: true,
              color: COLORS.primary,
              margin: [0, 0, 0, 6],
            },
            field("Dirección", inmueble.direccion),
            field("Barrio / Ciudad", inmueble.barrioCiudad),
            field(
              "Tipo de propiedad",
              TIPO_PROPIEDAD_LABELS[inmueble.tipoPropiedad] ??
                inmueble.tipoPropiedad,
            ),
            field("Antigüedad", `${inmueble.antiguedadAnios} años`),
            field("Reformas", inmueble.tieneReformas ? "Sí" : "No registra"),
            ...(inmueble.tieneReformas && inmueble.detalleReformas
              ? [field("Detalle de reformas", inmueble.detalleReformas)]
              : []),
          ],
        },
      ],
      columnGap: 20,
    },

    // 03
    sectionHeader("Sección 03", "Motivo de Consulta"),
    chips(informe.motivosConsulta as any, MOTIVO_LABELS),
    (informe.motivosConsulta as any)?.includes("OTRO")
      ? obsBox('Detalle "Otro"', informe.motivoOtroDetalle)
      : null,
    obsBox("Observaciones del cliente", informe.observacionesCliente),

    // 04
    sectionHeader("Sección 04", "Inspección General del Inmueble"),
    { text: "Exterior", fontSize: 10, bold: true, margin: [0, 0, 0, 4] },
    chips(informe.inspeccionGeneral?.sectoresExterior as any, EXTERIOR_LABELS),
    obsBox(
      "Observaciones exteriores",
      informe.inspeccionGeneral?.observacionesExterior,
    ),
    { text: "Interior", fontSize: 10, bold: true, margin: [0, 10, 0, 4] },
    chips(informe.inspeccionGeneral?.sectoresInterior as any, INTERIOR_LABELS),
    obsBox(
      "Observaciones interiores",
      informe.inspeccionGeneral?.observacionesInterior,
    ),

    // 05
    sectionHeader(
      "Sección 05",
      "Relevamiento Patológico",
      "Presencia y nivel de severidad de cada patología detectada.",
    ),
    {
      table: { headerRows: 1, widths: ["*", 100, 80], body: patologiasBody },
      layout: noBorderLayout,
    },

    // 06
    sectionHeader(
      "Sección 06",
      "Sectores Afectados por Ambiente",
      "Problema detectado, medición aproximada y observaciones por ambiente.",
    ),
    ...(sectores.length
      ? sectores
      : [
          {
            text: "Sin sectores registrados.",
            fontSize: 9,
            color: COLORS.textMuted,
          },
        ]),

    // 07
    sectionHeader(
      "Sección 07",
      "Hipótesis Preliminar",
      "Posibles causas detectadas.",
    ),
    chips(hipotesisPreliminar?.hipotesis, HIPOTESIS_LABELS),
    obsBox("Observaciones técnicas", hipotesisPreliminar?.observacionesTecnicas),

    // 08
    sectionHeader("Sección 08", "Registro Fotográfico"),
    {
      text: informe.registroFotografico
        ? "✓ Registro fotográfico realizado"
        : "Sin registro fotográfico.",
      fontSize: 9,
      bold: !!informe.registroFotografico,
      margin: [0, 0, 0, 8],
    },
    ...fotoRows,

    // 09
    sectionHeader("Sección 09", "Instrumentos Utilizados"),
    instrumentos.length
      ? chips(instrumentos, INSTRUMENTO_LABELS)
      : {
          text: "Sin instrumentos registrados.",
          fontSize: 9,
          color: COLORS.textMuted,
        },
    instrumentos.includes("OTRO")
      ? obsBox('Detalle "Otro"', informe.instrumentoOtroDetalle)
      : null,

    // 10
    sectionHeader("Sección 10", "Cierre de Visita"),
    {
      columns: [
        firmaBox(
          "Firma profesional",
          informe.arquitectaResponsable,
          img.firmaPro,
        ),
        firmaBox("Firma del cliente", cliente.nombre, img.firmaCli),
      ],
      columnGap: 25,
      unbreakable: true,
    },
    {
      text: `ID del informe: ${informe.id} · Generado el ${formatFecha(informe.createdAt as any)}`,
      fontSize: 7,
      color: COLORS.textMuted,
      alignment: "center",
      margin: [0, 24, 0, 0],
    },
  ].filter(Boolean);
}

// ── Hook ─────────────────────────────────────────────────────────────

export function useDescargarInformePDF() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const descargarPDF = useCallback(async (informe: Informe) => {
    setIsLoading(true);
    setError(null);

    try {
      const fotosUrls: string[] = (
        (informe as any).registroFotografico?.fotos ?? []
      ).map((f: any) => f.url);

      const [pdfMake, logo, fotos, firmaPro, firmaCli] = await Promise.all([
        cargarPdfMake(),
        cargarLogoBase64(),
        Promise.all(fotosUrls.map((u) => cargarImagenBase64(optimize(u)))),
        informe.firmaProfesionalUrl
          ? cargarImagenBase64(informe.firmaProfesionalUrl)
          : Promise.resolve(null),
        informe.firmaClienteUrl
          ? cargarImagenBase64(informe.firmaClienteUrl)
          : Promise.resolve(null),
      ]);

      const fechaEmision = formatFecha(new Date() as any);

      const docDefinition: any = {
        pageSize: "A4",
        pageMargins: [40, 90, 40, 60],
        defaultStyle: { font: "Roboto" },
        images: logo ? { logo } : undefined,

        header: {
          margin: [40, 20, 40, 0],
          stack: [
            {
              columns: [
                logo
                  ? { image: "logo", width: 55 }
                  : {
                      text: NOMBRE_ESTUDIO,
                      bold: true,
                      fontSize: 12,
                      color: COLORS.text,
                    },
                {
                  stack: [
                    {
                      text: "INFORME DE RELEVAMIENTO",
                      fontSize: 7.5,
                      color: COLORS.textMuted,
                      alignment: "right",
                      characterSpacing: 1,
                    },
                    {
                      text: `Expediente Nº ${informe.numeroExpediente}`,
                      fontSize: 13,
                      bold: true,
                      color: COLORS.primary,
                      alignment: "right",
                    },
                  ],
                },
              ],
            },
            {
              canvas: [
                {
                  type: "line",
                  x1: 0,
                  y1: 8,
                  x2: 515,
                  y2: 8,
                  lineWidth: 1.5,
                  lineColor: COLORS.primary,
                },
              ],
            },
          ],
        },

        footer: (currentPage: number, pageCount: number) => ({
          margin: [40, 0, 40, 20],
          columns: [
            {
              text: `Emitido el ${fechaEmision}`,
              fontSize: 8,
              color: "#9ca3af",
            },
            {
              text: `Página ${currentPage} de ${pageCount}`,
              alignment: "right",
              fontSize: 8,
              color: "#9ca3af",
            },
          ],
        }),

        content: buildContent(informe, { fotos, firmaPro, firmaCli }),
      };

      pdfMake
        .createPdf(docDefinition)
        .download(`informe-${informe.numeroExpediente}.pdf`);
    } catch (err) {
      console.error("Error al generar el PDF del informe:", err);
      setError("No se pudo generar el PDF. Intentá nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { descargarPDF, isLoading, error };
}