import Header from "@/components/panel/header";
import { AppSidebar } from "@/components/panel/main-sidebar";
import { ReportsList } from "@/components/panel/reports-list";
import { getReports } from "@/lib/actions/inspection";
import { Building2, Menu } from "lucide-react";

export default async function Page() {
  const reports = await getReports();

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar open={false} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/*<Header title="Informes" description="Consulta, filtra y descarga tus informes" />*/}

        <main className="flex-1 p-4 sm:p-6">
          <div className="bg-muted/30 text-foreground">
            <div className="mx-auto max-w-7xl p-6 ">
              <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight">
                    Informes de inspección
                  </h2>
                  <p className="mt-2 max-w-2xl text-muted-foreground">
                    Consulta, filtra y descarga tus informes de inspección de
                    manera rápida y sencilla
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ReportsList reports={Array.isArray(reports) ? reports : []} />
        </main>
      </div>
    </div>
  );
}
