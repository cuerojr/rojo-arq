import { InformeDetalle } from "@/components/panel/informe-detalle";
import { getInformeDetalle } from "@/lib/actions/inspection";

async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const informe = (await getInformeDetalle(id)) as any;
  return (
    <div><InformeDetalle informe={informe as any} /></div>
  )
}

export default Page