"use client";

import { Building2 } from "lucide-react";

function Header({ title = "Informes", description = "Consulta, filtra y descarga tus informes" }: { title?: string; description?: string }) {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Building2 />
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground sm:text-lg">
              {title}
            </h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              {description}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
