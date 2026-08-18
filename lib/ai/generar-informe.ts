import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import {
  INFORME_SYSTEM_PROMPT,
  PROMPT_VERSION,
} from "./informe-prompt";

import {
  informeGeneradoSchema,
  type InformeGenerado,
} from "./informe-schema";

import { obtenerRecomendaciones } from "./informe-recomendaciones";

import type { DatosInformeIA } from "../informe/preparar-datos";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generarInformeIA(
  datos: DatosInformeIA,
): Promise<{
  contenido: InformeGenerado;
  modelo: string;
  promptVersion: string;
}> {
  const recomendaciones =
    obtenerRecomendaciones(datos);

  const input = `
DATOS DE LA VISITA TÉCNICA
==========================

${JSON.stringify(datos, null, 2)}


RECOMENDACIONES TÉCNICAS DISPONIBLES
=====================================

${JSON.stringify(recomendaciones, null, 2)}


INSTRUCCIONES ESPECÍFICAS
=========================

Redactá el informe utilizando exclusivamente los datos
proporcionados.

El documento debe mantener lenguaje técnico arquitectónico
y constructivo.

La hipótesis profesional cargada debe ser respetada y
desarrollada técnicamente sin transformarla automáticamente
en una certeza.

Las recomendaciones deben basarse en las recomendaciones
técnicas disponibles.

Si la información no permite realizar una afirmación,
no inventes información y expresá la limitación.
`;

  const model = process.env.OPENAI_MODEL;

  if (!model) {
    throw new Error(
      "Falta configurar OPENAI_MODEL en las variables de entorno",
    );
  }

  const response = await openai.responses.parse({
    model,

    instructions: INFORME_SYSTEM_PROMPT,

    input,

    text: {
      format: zodTextFormat(
        informeGeneradoSchema,
        "informe_diagnostico_constructivo",
      ),
    },
  });

  if (!response.output_parsed) {
    throw new Error(
      "OpenAI no devolvió un informe estructurado",
    );
  }

  return {
    contenido: response.output_parsed,
    modelo: model,
    promptVersion: PROMPT_VERSION,
  };
}