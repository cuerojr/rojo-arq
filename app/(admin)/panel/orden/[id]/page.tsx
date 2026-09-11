
import { Cliente, Inmueble, Orden, VisitaTecnica } from "@/generated/prisma/client";
import DownloadButton from "@/components/panel/downloadButton";
import { InspectionForm } from "@/components/panel/inspection-form";

import { getOrdenDetalle } from "@/lib/actions/crear-orden";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orden = (await getOrdenDetalle(id)) as Orden | null;
  console.log("🚀 ~ Page ~ orden:", orden)

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Link
        href="/panel"
        className="flex justify-end items-center gap-2 mb-4 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto"
      >
        <ArrowLeft /> Volver a órdenes
      </Link>
      <h1 className="text-2xl font-bold mb-4">Inspección de orden</h1>
      <p className="mb-6 text-muted-foreground">
        Completá los datos de la inspección y guardá el informe.
      </p>
      <DownloadButton ordenId={id} />
      
      <main>
        <InspectionForm ordenId={id} orden={orden as Orden & { visitaTecnica: VisitaTecnica | null; cliente: Cliente; inmueble: Inmueble; }} />
      </main>
    </div>
  );
}

export default Page;
