"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { BarChart3, FileText, Settings, X } from "lucide-react";
import { Button } from "../ui/button";

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
  console.log("🚀 ~ AppSidebar ~ session:", session?.user.name);

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
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between gap-2 border-b border-sidebar-border px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <FileText className="size-4" />
            </div>
            <span className="text-sm font-semibold">Centro de Informes</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
            aria-label="Cerrar menú"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="flex flex-col gap-1">
            {menuGroups.map((group) => {
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

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-xs font-semibold">
              {session?.user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {session?.user.name}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/60">
                Administrador
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
      </aside>
    </>
  );
}
