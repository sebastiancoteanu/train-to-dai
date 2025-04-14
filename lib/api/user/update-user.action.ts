"use server";

import { revalidatePath } from "next/cache";
import { userSchema } from "@/schemas/user.schema";
import { SafeUser } from "@/types/user";
import prisma from "@/lib/db/prisma";

export default async function updateUserAction(
  user: Omit<SafeUser, "createdAt" | "updatedAt" | "image">
) {
  const { id, ...dataToValidate } = user;

  const { data, success, error } = userSchema.safeParse(dataToValidate);

  if (!success) {
    console.error(error.format());
    throw new Error("Invalid data provided.");
  }

  console.log(user);

  await prisma.user.update({
    where: { id },
    data: {
      username: data.username,
      dateOfBirth: data.dateOfBirth,
      weight: data.weight,
      height: data.height,
      sex: data.sex,
    },
  });

  revalidatePath("/profile");
}
