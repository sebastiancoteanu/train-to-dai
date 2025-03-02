"use server";

import { z } from "zod";
import argon2 from "argon2";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth/session";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FormState } from "../auth-form/auth-form.types";

const loginSchema = z.object({
  email: z.string().min(1, "Email required").email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

export async function login(_state: FormState, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });

    const passwordsAreMatching = await argon2.verify(user.password, password);

    if (!passwordsAreMatching) {
      return {
        errors: {
          general: ["Email and password do not match."],
        },
      };
    }

    await createSession(user.id);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        errors: {
          email: ["User with provided email doesn't exist."],
        },
      };
    }

    return {
      errors: {
        general: ["Failed to login, please try again."],
      },
    };
  }

  redirect("/dashboard");
}
