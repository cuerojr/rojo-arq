import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config";

import Informe from "@/components/panel/informe";
import { AppSidebar } from "@/components/panel/main-sidebar";
import { ReportsList } from "@/components/panel/reports-list";

import { getOrdenes } from "@/lib/actions/crear-orden";
import SidebarButtons from "@/components/panel/sidebar-buttons";
export const dynamic = "force-dynamic";

export default async function Page() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) redirect("/acceso");
  if (session.user.role !== "ADMIN") redirect("/panel/informes");
  const ordenes = await getOrdenes();


  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar open={true} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/*<Header title="Ordenes" description="Gestiona tus órdenes de trabajo" />*/}
        <main className="flex-1 p-4 sm:p-6">
          <Informe />
          <ReportsList
            titulo="Orden"
            reports={Array.isArray(ordenes) ? ordenes : []}
          />
        </main>
      </div>
    </div>
  );
}
