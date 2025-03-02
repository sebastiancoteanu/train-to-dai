"use server";

import { z } from "zod";
import argon2 from "argon2";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createSession } from "@/lib/auth/session";
import { FormState } from "../auth-form/auth-form.types";

const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must not exceed 64 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character (!@#$%^&*)"
    ),
});

export async function signup(_state: FormState, formData: FormData) {
  const validatedFields = signupSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const hashedPassword = await argon2.hash(password);

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    await createSession(user.id);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          errors: {
            email: ["This email is already registered"]
          },
        };
      }
    }

    return {
      errors: {
        general: ["Failed to create account, please try again."],
      },
    };
  }

  redirect("/dashboard");
}
