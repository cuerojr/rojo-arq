import Header from "@/components/panel/header";
import Informe from "@/components/panel/informe";
import { AppSidebar } from "@/components/panel/main-sidebar";
import { ReportsList } from "@/components/panel/reports-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrdenes } from "@/lib/actions/crear-orden";

export default async function Page() {
  const ordenes = await getOrdenes();
  //console.log("🚀 ~ Page ~ ordenes:", ordenes)
  
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar open={false} />

      <div className="flex min-w-0 flex-1 flex-col">        
        {/*<Header title="Ordenes" description="Gestiona tus órdenes de trabajo" />*/}
        <main className="flex-1 p-4 sm:p-6">
          <Informe />
          <ReportsList titulo="Orden" reports={Array.isArray(ordenes) ? ordenes : []} />
        </main>
      </div>
    </div>
  );
}
