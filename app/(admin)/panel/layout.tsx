"use client";
import { useState, ReactNode } from "react";
import { AppSidebar } from "@/components/panel/main-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col p-6 pt-0 min-h-screen">
      <AppSidebar open={true} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col pt-20">
        

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
