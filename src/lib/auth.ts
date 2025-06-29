import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuthApiHandler } from "@/http/auth/get-auth";
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
          const user = await loginApiHandler({
            login,
            password,
          });

          if (!user) return null;
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.access_token = user.token;
        token.sub = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const access_token = token.access_token as string;
      const auth = await getAuthApiHandler(access_token);

      return { ...session, user: auth, access_token };
    },
  },
};

const authHandler = NextAuth(authOptions);

export default authHandler;
