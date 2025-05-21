import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "./generated/prisma";
import { nextCookies } from "better-auth/next-js";
import { env } from "@/env";

const prisma = new PrismaClient()

export const auth = betterAuth({
  baseUrl: env.VERCEL_URL ?? env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, 
    },
  },
  plugins: [nextCookies()]
})