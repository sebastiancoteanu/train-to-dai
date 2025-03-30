"use server";

import { jwtVerify, SignJWT } from "jose";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

const secretKey = process.env.AUTH_SECRET;

if (!secretKey) {
  throw new Error("AUTH_SECRET is missing");
}

const encodedKey = Buffer.from(secretKey, "base64");
const alg = "HS256";
const cookieKey = "session";

export async function createSession(userId: string) {
  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setSubject(userId.toString())
    .setExpirationTime("7d")
    .sign(encodedKey);

  const cookieStore = await cookies();
  cookieStore.set(cookieKey, jwt, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
}

export async function getSession(
  cookies: RequestCookies | ReadonlyRequestCookies
) {
  const token = cookies.get(cookieKey)?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await jwtVerify(token, encodedKey, { algorithms: [alg] });

    return payload;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieKey);
}
