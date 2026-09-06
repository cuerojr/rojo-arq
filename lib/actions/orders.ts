"use server";
import { prisma } from "@/prisma";
import type { TipoPropiedad, EstadoOrden } from "@/generated/prisma/client"; // ajustá el path al output de tu schema
 
export type OrdenParaPDF = {
  id: string;
  estado: EstadoOrden;
  sena: number | null;
  disclamer: string | null;
  createdAt: Date;
  numeroExpediente: string | null;
  cliente: {
    nombre: string;
    telefono: string | null;
    email: string | null;
  };
  inmueble: {
    direccion: string;
    barrioCiudad: string | null;
    tipoPropiedad: TipoPropiedad;
    antiguedadAnios: number | null;
  };
};
 
/**
 * Trae únicamente los datos que necesita el PDF de la Orden.
 * Incluye numeroExpediente (de la VisitaTecnica asociada, si existe)
 * porque suele ser el número de referencia del documento profesional.
 */
export async function obtenerOrdenParaDescarga(
  ordenId: string
): Promise<OrdenParaPDF> {
  const orden = await prisma.orden.findUniqueOrThrow({
    where: { id: ordenId },
    select: {
      id: true,
      estado: true,
      sena: true,
      disclamer: true,
      createdAt: true,
      visitaTecnica: { select: { numeroExpediente: true } },
      cliente: { select: { nombre: true, telefono: true, email: true } },
      inmueble: {
        select: {
          direccion: true,
          barrioCiudad: true,
          tipoPropiedad: true,
          antiguedadAnios: true,
        },
      },
    },
  });
 
  return {
    id: orden.id,
    estado: orden.estado,
    sena: orden.sena,
    disclamer: orden.disclamer,
    createdAt: orden.createdAt,
    numeroExpediente: orden.visitaTecnica?.numeroExpediente ?? null,
    cliente: orden.cliente,
    inmueble: orden.inmueble,
  };
}