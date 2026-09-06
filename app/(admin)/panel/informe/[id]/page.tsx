import { InformeDetalle } from "@/components/panel/informe-detalle";
import { getInformeDetalle } from "@/lib/actions/inspection";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const informe = (await getInformeDetalle(id)) as any;
  return (
    <div className="md:max-w-4xl md:mx-auto">
      <Link
        href="/panel/informes"
        className="flex justify-end items-center gap-2 mb-4 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto"
      >
        <ArrowLeft /> Volver a informes
      </Link>
      <main>
        <InformeDetalle informe={informe as any} />
      </main>
    </div>
  );
}

export default Page;
