// actions/crear-orden.ts
"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { tipoPropiedadMap } from "@/lib/mappers/inspection-enums";
import { orderSchema } from "@/lib/schemas/ordenes";

export type OrdenData = z.infer<typeof orderSchema>;

export type OrdenState =
  | { status: "idle" }
  | { status: "success"; ordenId: string }
  | { status: "error"; errors?: Record<string, string>; message?: string };

export async function createOrden(
  _prevState: OrdenState,
  formData: FormData,
): Promise<OrdenState> {
  const raw = Object.fromEntries(formData) as Record<string, unknown>;
  const parsed = orderSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return { status: "error", errors, message: "Revisá los campos marcados" };
  }

  const data = parsed.data;

  try {
    const orden = await prisma.$transaction(async (tx) => {
      const cliente = await tx.cliente.create({
        data: {
          nombre: data.clientName,
          telefono: data.phone || null,
          email: data.email || null,
        },
      });

      const inmueble = await tx.inmueble.create({
        data: {
          clienteId: cliente.id,
          direccion: data.address,
          barrioCiudad: data.city || null,
          tipoPropiedad: tipoPropiedadMap[data.propertyType],
          antiguedadAnios: data.age,
          tieneReformas: data.reforms,
          detalleReformas: data.reformDetails || null,
        },
      });

      return tx.orden.create({
        data: {
          clienteId: cliente.id,
          inmuebleId: inmueble.id,
          sena: data.sena,
          fechaVisita: new Date(data.visitDate),
          horaVisita: data.visitTime,
        },
      });
    });

    revalidatePath("/panel");
    return { status: "success", ordenId: orden.id };
  } catch (err) {
    console.error("Error creando orden:", err);
    return { status: "error", message: "No se pudo guardar la orden" };
  }
}

export async function getOrdenes() {
  try {
    return await prisma.orden.findMany({
      include: { cliente: true, inmueble: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    //console.error("Error obteniendo órdenes:", err);
    return [];
  }
}

export async function getOrdenDetalle(id: string) {
  try {
    return await prisma.orden.findUnique({
      where: { id },
      include: { cliente: true, inmueble: true, visitaTecnica: {
        include: {
          patologias: true,
          sectoresAfectados: true,
          inspeccionGeneral: true,
          hipotesisPreliminar: true,
          registroFotografico: {
            include: {
              fotos: true,
            },
          },
        }
      } },
    });
  } catch (err) {
    console.error("Error obteniendo orden:", err);
    return null;
  }
}