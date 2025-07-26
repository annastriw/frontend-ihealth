// src/lib/auth.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginApiHandler } from "@/http/auth/login";
import { User as Auth } from "@/types/user/user";
import { LoginType } from "@/validators/auth/login-validator";

declare module "next-auth" {
  interface User {
    token?: string;
  }

  interface Session {
    user: Auth;
    access_token: string;
  }

  interface JWT {
    access_token?: string;
    user?: Auth;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        login: { label: "Email / Username / Nomor Telepon", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { login, password } = credentials as LoginType;
        if (!login || !password) return null;

        try {
          const user = await loginApiHandler({ login, password });
          return user;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || "Login gagal");
        }
      },
    }),
  ],
  callbacks: {
    // Simpan access_token dan user ke JWT saat login
    jwt: async ({ token, user }) => {
      if (user) {
        token.access_token = user.token;
        token.user = user;
      }
      return token;
    },

    // Ambil user dan access_token dari JWT, tanpa request ulang ke backend
    session: async ({ session, token }) => {
      session.access_token = token.access_token as string;
      session.user = token.user as Auth;
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);
export default authHandler;
