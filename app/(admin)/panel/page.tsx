import { AppSidebar } from "@/components/panel/main-sidebar";
import { ReportsList } from "@/components/panel/reports-list";
import { getReports } from "@/lib/actions/inspection";
import { Menu } from "lucide-react";

export default async function Page() {
  const reports = await getReports();

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar open={false} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-3 border-b border-border bg-background px-4 sm:px-6">
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>
          <div>
            <h1 className="text-base font-semibold text-foreground sm:text-lg">
              Informes
            </h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Consulta, filtra y descarga tus informes
            </p>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <ReportsList reports={Array.isArray(reports) ? reports : []} />
        </main>
      </div>
    </div>
  );
}
