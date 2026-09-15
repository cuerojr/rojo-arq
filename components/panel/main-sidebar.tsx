"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { BarChart3, FileText, Menu, Settings, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import UserDropdown from "./dropDownMenu";

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
          "fixed left-6 right-6 bg-white py-4 px-6 z-40 flex gap-4 justify-between items-center text-sidebar-foreground transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-start justify-between gap-2 ">
          <div className="flex items-center gap-2">
            <Image
              alt="Rojo arquitectura"
              src="/black-logo.png"
              width={60}
              height={50}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <nav className="hidden overflow-y-auto">
            <ul className="flex flex-col md:flex-row gap-1">
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
                        "flex w-full underline items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
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
          <div className="flex items-center gap-2">
            
            <UserDropdown />
          </div>
        </div>
      </aside>
    </>
  );
}
