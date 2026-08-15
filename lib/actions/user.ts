// actions/user.actions.ts
"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").optional(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres").optional(),
  image: z.string().url("URL inválida").optional().or(z.literal("")),
  isSuperAdmin: z.boolean().optional().default(false),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export async function createUser(input: CreateUserInput) {
  const parsed = createUserSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, image, isSuperAdmin } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Ya existe un usuario con ese email",
      };
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: image || undefined,
        isSuperAdmin,
      },
    });

    revalidatePath("/admin/users"); // ajustá la ruta según tu proyecto

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: "Error al crear el usuario",
    };
  }
}

