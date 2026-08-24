// actions/crear-orden.ts
"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { tipoPropiedadMap } from "@/lib/mappers/inspection-enums";

const ordenSchema = z
  .object({
    clientName: z.string().min(2, "Ingresa el nombre del cliente"),
    phone: z.string().min(8, "Ingresa un teléfono válido"),
    email: z.string().email("Ingresa un correo válido"),
    address: z.string().min(5, "Ingresa la dirección del inmueble"),
    city: z.string().min(2, "Ingresa la ciudad o barrio"),
    propertyType: z.string().min(1, "Selecciona un tipo de inmueble"),
    age: z.coerce
      .number()
      .int()
      .min(0, "Debe ser 0 o mayor")
      .max(200, "Revisa la antigüedad"),
    reforms: z.preprocess((val) => val === "true", z.boolean()),
    reformDetails: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.reforms &&
      (!data.reformDetails || data.reformDetails.trim().length < 3)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["reformDetails"],
        message: "Describe brevemente las reformas",
      });
    }
  });

export type OrdenData = z.infer<typeof ordenSchema>;

export type OrdenState =
  | { status: "idle" }
  | { status: "success"; ordenId: string }
  | { status: "error"; errors?: Record<string, string>; message?: string };

export async function createOrden(
  _prevState: OrdenState,
  formData: FormData,
): Promise<OrdenState> {
  const raw = Object.fromEntries(formData) as Record<string, unknown>;
  //console.log("🚀 ~ createOrden ~ formData:", formData)
 //console.log("🚀 ~ createOrden ~ raw:", raw)

  const parsed = ordenSchema.safeParse(raw);
  //console.log("🚀 ~ createOrden ~ parsed:", parsed)

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
        },
      });
    });

    revalidatePath("/ordenes");
    return { status: "success", ordenId: orden.id };
  } catch (err) {
    console.error("Error creando orden:", err);
    return { status: "error", message: "No se pudo guardar la orden" };
  }
}

export async function getOrdenes() {
  try {
    return await prisma.orden.findMany({
      include: { cliente: true, inmueble: true, visitaTecnica: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error obteniendo órdenes:", err);
    return [];
  }
}

export async function getOrdenDetalle(id: string) {
  try {
    return await prisma.orden.findUnique({
      where: { id },
      include: { cliente: true, inmueble: true, visitaTecnica: true },
    });
  } catch (err) {
    console.error("Error obteniendo orden:", err);
    return null;
  }
}