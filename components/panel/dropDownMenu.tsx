"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { BarChart3, FileText, Menu, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserDropdown() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Usuario";
  const userEmail = session?.user?.email ?? "";
  const initials = userName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="size-9 rounded-full cursor-pointer hover:underline"
        aria-label="Abrir menú de usuario"
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={userName}
            width={36}
            height={36}
            className="size-9 rounded-full"
          />
        ) : (
          <span className="flex size-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold">
            {initials}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="truncate text-sm font-medium">{userName}</p>
            <p className="truncate text-xs font-normal text-muted-foreground">
              {userEmail}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            render={<Link href="/panel" />}
            className="cursor-pointer hover:underline"
          >
            <BarChart3 data-icon="inline-start" />
            Órdenes
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href="/panel/informes" />}
            className="cursor-pointer hover:underline"
          >
            <FileText data-icon="inline-start" />
            Informes
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/acceso" })}
            className="cursor-pointer hover:underline"
          >
            <LogOut data-icon="inline-start" />
            Salir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
