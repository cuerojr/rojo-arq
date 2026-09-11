// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { DrupalField } from "@/auth.config";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name: string;
      lastName: string;
      email: string;
      isSuperAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    lastName: string;
    role: string;
    isSuperAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    name: string;
    isSuperAdmin: boolean;
  }
}