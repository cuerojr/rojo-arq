"use client";

import { Button } from "@/components/ui/button";
import { useDescargarOrdenPDF } from "@/hooks/usedescargarordenpdf";

function DownloadButton({ ordenId }: { ordenId: string }) {
  const { descargarPDF, isLoading, error } = useDescargarOrdenPDF();
  const handleDownload = () => {
    console.log("Descargando orden:", ordenId);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => descargarPDF(ordenId)}
        disabled={isLoading}
      >
        {isLoading ? "Generando..." : "Descargar orden"}
      </Button>
    </>
  );
}

export default DownloadButton;
