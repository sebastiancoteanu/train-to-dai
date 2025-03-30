"use server";

import { cookies } from "next/headers";
import { getSession } from "../auth/session";
import getUserByIdAction from "./get-user-by-id.action";
import { getNextAuthUser } from "../auth/nextAuth";

export default async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = await getSession(cookieStore);
  const userId = session?.payload.sub;

  const nextAuthUser = await getNextAuthUser(cookieStore);

  if (nextAuthUser) {
    return nextAuthUser;
  }

  if (!userId) {
    return null;
  }

  return getUserByIdAction(userId);
}
