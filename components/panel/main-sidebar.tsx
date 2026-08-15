"use client"

import { useState } from "react"
import {
  BarChart3,
  ChevronDown,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LineChart,
  PieChart,
  Settings,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type MenuItem = { label: string; icon: React.ElementType }

type MenuGroup = {
  id: string
  label: string
  icon: React.ElementType
  items: MenuItem[]
}

const menuGroups: MenuGroup[] = [
  {
    id: "informes",
    label: "Informes",
    icon: FileText,
    items: [
      { label: "Todos los informes", icon: FolderKanban },
      { label: "Ventas", icon: BarChart3 },
      { label: "Finanzas", icon: LineChart },
      { label: "Marketing", icon: PieChart },
    ],
  },
  {
    id: "analitica",
    label: "Analítica",
    icon: BarChart3,
    items: [
      { label: "Panel general", icon: LayoutDashboard },
      { label: "Tendencias", icon: LineChart },
    ],
  },
  {
    id: "administracion",
    label: "Administración",
    icon: Settings,
    items: [
      { label: "Usuarios", icon: Users },
      { label: "Configuración", icon: Settings },
    ],
  },
]

export function AppSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose?: () => void
}) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    informes: true,
  })
  const [active, setActive] = useState("Todos los informes")

  function toggleGroup(id: string) {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
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
              const isOpen = openGroups[group.id]
              return (
                <li key={group.id}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <group.icon className="size-4 shrink-0" />
                    <span className="flex-1 text-left">{group.label}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {isOpen && (
                    <ul className="mt-1 flex flex-col gap-0.5 pl-4">
                      {group.items.map((item) => {
                        const isActive = active === item.label
                        return (
                          <li key={item.label}>
                            <button
                              type="button"
                              onClick={() => setActive(item.label)}
                              className={cn(
                                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                isActive
                                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              )}
                            >
                              <item.icon className="size-4 shrink-0" />
                              <span className="text-left">{item.label}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-xs font-semibold">
              AT
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Ana Torres</p>
              <p className="truncate text-xs text-sidebar-foreground/60">Administradora</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
