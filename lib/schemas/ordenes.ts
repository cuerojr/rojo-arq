// lib/schemas/ordenes.ts
import { z } from "zod";

export const orderSchema = z
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
    sena: z.coerce.number().min(0, "La seña no puede ser negativa"),
    visitDate: z.string().min(1, "Selecciona la fecha de la visita"),
    visitTime: z.string().optional(),
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

export type OrderForm = z.infer<typeof orderSchema>;