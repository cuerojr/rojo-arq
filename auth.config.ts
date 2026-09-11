import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail } from "./lib/actions/user";
//import { loginUser } from "@/lib/services/user/user.services";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/panel",
    signOut: "/",
    error: "/",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        const resp = await getUserByEmail(user.email);
        if (!resp) return false;
      }
      return true;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user: any;
      account: any;
    }) {
      // Solo en el login inicial (cuando `user` viene definido)
      if (user?.email) {
        const dbUser = await getUserByEmail(user.email);
        if (dbUser) {
          const { password, ...props } = dbUser;
          token.name = props.name ?? "";
          token.email = props.email;
          token.role = props.isSuperAdmin ? "ADMIN" : "USER";
          token.isSuperAdmin = props.isSuperAdmin;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.isSuperAdmin = token.isSuperAdmin as boolean;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
