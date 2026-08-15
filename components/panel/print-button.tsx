"use client"

import { FileText } from "lucide-react"

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-foreground/15 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/25 print:hidden"
    >
      <FileText className="h-4 w-4" aria-hidden="true" />
      Imprimir / PDF
    </button>
  )
}
