// actions/user.actions.ts
"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { CreateUserInput, createUserSchema } from "../schemas/user";

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

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}
