import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").optional(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres").optional(),
  image: z.string().url("URL inválida").optional().or(z.literal("")),
  isSuperAdmin: z.boolean().optional().default(false),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;