"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../db/prisma";
import { SafeUser } from "@/types/user";

export default async function getUserByIdAction(
  userId: string
): Promise<SafeUser | null> {
  "use cache";

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        dateOfBirth: true,
        weight: true,
        height: true,
        sex: true,
        createdAt: true,
        updatedAt: true,
        image: true,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error(error, "User doesn't exist.");
    } else {
      console.error(error, "Failed to get user details.");
    }

    return null;
  }
}
