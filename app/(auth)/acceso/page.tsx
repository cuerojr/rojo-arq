
import Link from "next/link";

import { Button } from "@/components/ui/button";
import LogInForm from "@/components/login-form/login-form";

import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default async function LogIn() {
  const session: Session | null = await getServerSession(authOptions);  
  if (session) redirect("/panel");

  return (
    <section className="min-h-screen relative flex items-center justify-center p-4" id="acces-body">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-bold text-3xl text-white">
              ¡Ingresa aquí!
            </h1>
            <p className="text-white text-sm">
              Accede a tu cuenta para continuar
            </p>
          </div>          
          <div className="text-center space-y-4">
            
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </section>
  );
}
