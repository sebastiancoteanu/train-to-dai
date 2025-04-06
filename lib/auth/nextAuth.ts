import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../db/prisma";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import { NextRequest } from "next/server";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { SafeUser } from "@/types/user";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user.id) {
        session.user.id = user.id;
      }

      return session;
    },
    async signIn({ user, account }) {
      if (!user.email || !account) {
        return false;
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        return true;
      }

      const linkedAccount = await prisma.account.findFirst({
        where: {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        },
      });

      if (!linkedAccount) {
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            type: account.type,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            id_token: account.id_token,
            expires_at: account.expires_at,
          },
        });
      }

      return true;
    },
  },
};

export function getNextAuthSessionCookie(req: NextRequest) {
  return req.cookies.get("next-auth.session-token")?.value;
}

export function hasNextAuthSessionCookie(req: NextRequest) {
  return Boolean(getNextAuthSessionCookie(req));
}

export async function getNextAuthUser(
  cookieStore: ReadonlyRequestCookies
): Promise<SafeUser | null> {
  const token = cookieStore.get("next-auth.session-token")?.value;
  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { sessionToken: token },
    include: { user: true },
  });

  return session?.user ?? null;
}
