import { NextResponse } from "next/server";
import { createInformeGenerado, getInformeDetalle } from "@/lib/actions/inspection"; 
import { prepararDatosInforme } from "@/lib/informe/preparar-datos";
import { generarInformeIA } from "@/lib/ai/generar-informe";

export async function POST(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Falta el ID del informe",
        },
        {
          status: 400,
        },
      );
    }

    // ========================================================
    // 1. Obtener información desde Prisma
    // ========================================================

    const informe =
      await getInformeDetalle(id);

    if (!informe) {
      return NextResponse.json(
        {
          error: "Informe no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    // ========================================================
    // 2. Transformar Prisma → datos para IA
    // ========================================================

    const datos =
      prepararDatosInforme(informe);

    // ========================================================
    // 3. Generar informe con IA
    // ========================================================

    const resultado =
      await generarInformeIA(datos);

      await createInformeGenerado(
        resultado,
        id,
      );

    // ========================================================
    // 4. Devolver resultado
    // ========================================================

    return NextResponse.json({
      success: true,
      informeId: id,
      modelo: resultado.modelo,
      promptVersion:
        resultado.promptVersion,
      contenido:
        resultado.contenido,
    });
  } catch (error) {
    console.error(
      "Error generando informe con IA:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No se pudo generar el informe",
      },
      {
        status: 500,
      },
    );
  }
}