"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { BarChart3, FileText, Settings, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { opendir } from "fs/promises";

type MenuGroup = {
  id: string;
  label: string;
  icon: React.ElementType;
  link: string;
};

const menuGroups: MenuGroup[] = [
  {
    id: "ordenes",
    label: "Órdenes",
    icon: BarChart3,
    link: "/panel",
  },
  {
    id: "informes",
    label: "Informes",
    icon: FileText,
    link: "/panel/informes",
  },
];

export function AppSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const { data: session, status } = useSession();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    informes: true,
  });

  const [active, setActive] = useState("Todos los informes");

  function toggleGroup(id: string) {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <>
      {/* Overlay para móvil */}

      <aside
        className={cn(
          "fixed w-full p-4 z-40 bg-white flex justify-between text-sidebar-foreground transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-start justify-between gap-2 px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <FileText className="size-4" />
            </div>
            <span className="text-sm font-semibold">Centro de Informes</span>
          </div>
        </div>

        <div className="flex flex-row gap-12">
          <nav className="overflow-y-auto">
            <ul className="flex flex-row gap-1">
              {menuGroups.map((group) => {
                if (group.id === "ordenes" && !session?.user.isSuperAdmin) {
                  return null; // Oculta el grupo "Órdenes" si el usuario no es superadministrador
                }
                const isOpen = openGroups[group.id];
                return (
                  <li key={group.label}>
                    <Link
                      href={group.link}
                      onClick={() => setActive(group.label)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      )}
                    >
                      <group.icon className="size-4 shrink-0" />
                      <span className="text-left">{group.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="">
            <div className="flex items-start gap-3 ">
              <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-xs font-semibold">
                {session?.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    className="size-8 rounded-full"
                    width={32}
                    height={32}
                  />
                ) : (
                  session?.user.name?.charAt(0).toUpperCase()
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {session?.user.name}
                </p>
                <p className="truncate text-xs text-sidebar-foreground/60">
                  {session?.user.email}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  onClick={() => signOut({ callbackUrl: "/acceso" })}
                >
                  Salir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
