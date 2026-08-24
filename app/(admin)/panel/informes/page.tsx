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
        
        <Header title="Informes" description="Consulta, filtra y descarga tus informes" />

        <main className="flex-1 p-4 sm:p-6">
          <ReportsList reports={Array.isArray(reports) ? reports : []} />
        </main>
      </div>
    </div>
  );
}
