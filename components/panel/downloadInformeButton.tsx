// components/panel/download-pdf-button.tsx
"use client";

import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDescargarInformePDF } from "@/hooks/useDescargarInforme";
import type { Informe } from "@/lib/schemas/informe-detalle";

export default function DownloadInfirmePdfButton({ informe }: { informe: Informe }) {
  const { descargarPDF, isLoading, error } = useDescargarInformePDF();

  return (
    <div className="flex flex-col items-end gap-1">
      <Button variant="secondary" onClick={() => descargarPDF(informe)} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        {isLoading ? "Generando..." : "Descargar PDF"}
      </Button>
      {error && <span className="text-xs text-primary-foreground">{error}</span>}
    </div>
  );
}