import { InformeDetalle } from "@/components/panel/informe-detalle";
import { getOrdenDetalle } from "@/lib/actions/crear-orden";

async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const informe = (await getOrdenDetalle(id)) as any;
  return (
    <div><InformeDetalle informe={informe as any} /></div>
  )
}

export default Page