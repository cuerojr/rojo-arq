import type { DatosInformeIA } from "../informe/preparar-datos";

type Recomendacion = {
  titulo: string;
  descripcion: string;
};

export function obtenerRecomendaciones(
  datos: DatosInformeIA,
): Recomendacion[] {
  const recomendaciones: Recomendacion[] = [];

  const patologiasPresentes = datos.patologias
    .filter((p) => p.presente)
    .map((p) => p.tipo);

  // ==========================================================
  // CONDENSACIÓN
  // ==========================================================

  if (patologiasPresentes.includes("CONDENSACION")) {
    recomendaciones.push(
      {
        titulo: "Mejorar la ventilación",
        descripcion:
          "Favorecer una adecuada renovación del aire del sector afectado y mantener una ventilación acorde a las condiciones de uso del ambiente.",
      },
      {
        titulo: "Controlar la humedad ambiental",
        descripcion:
          "Reducir, cuando corresponda, las condiciones de humedad ambiental que puedan favorecer la aparición de condensación superficial.",
      },
    );
  }

  // ==========================================================
  // HUMEDAD ASCENDENTE / CAPILARIDAD
  // ==========================================================

  if (
    patologiasPresentes.includes(
      "HUMEDAD_ASCENDENTE_CAPILARIDAD",
    )
  ) {
    recomendaciones.push({
      titulo: "Verificar el origen de la humedad",
      descripcion:
        "Se recomienda verificar las condiciones de contacto del muro con el terreno y la existencia y estado de las barreras de impermeabilización correspondientes antes de definir la intervención.",
    });
  }

  // ==========================================================
  // FILTRACIÓN / PÉRDIDA DE CAÑERÍA
  // ==========================================================

  if (
    patologiasPresentes.includes(
      "FILTRACION_PERDIDA_CANERIA",
    )
  ) {
    recomendaciones.push({
      titulo: "Verificar instalaciones",
      descripcion:
        "Se recomienda verificar las instalaciones sanitarias involucradas y descartar pérdidas de cañerías antes de realizar reparaciones superficiales.",
    });
  }

  // ==========================================================
  // GRIETA
  // ==========================================================

  if (patologiasPresentes.includes("GRIETA_MURO")) {
    recomendaciones.push({
      titulo: "Realizar seguimiento de la grieta",
      descripcion:
        "Se recomienda evaluar la evolución de la grieta y, cuando corresponda, realizar un seguimiento que permita determinar si presenta cambios en el tiempo.",
    });
  }

  // ==========================================================
  // FISURA
  // ==========================================================

  if (patologiasPresentes.includes("FISURA_MURO")) {
    recomendaciones.push({
      titulo: "Evaluar la evolución de la fisura",
      descripcion:
        "Se recomienda verificar el comportamiento de la fisura y su evolución antes de definir una reparación definitiva.",
    });
  }

  return recomendaciones;
}