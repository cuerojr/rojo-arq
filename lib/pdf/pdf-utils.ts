const LOGO_URL = "/black-logo.png";

export async function cargarPdfMake() {
  // pdfmake toca `window`, por eso se importa dinámicamente
  const pdfMakeModule = await import("pdfmake/build/pdfmake");
  const pdfFontsModule = await import("pdfmake/build/vfs_fonts");
  const pdfMake: any = (pdfMakeModule as any).default ?? pdfMakeModule;
  const pdfFonts: any = (pdfFontsModule as any).default ?? pdfFontsModule;
  pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;
  return pdfMake;
}

/** URL (pública o remota con CORS) -> dataURL base64. Devuelve null si falla. */
export async function cargarImagenBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
    const blob = await response.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("Error al cargar imagen para el PDF:", url, err);
    return null;
  }
}

export const cargarLogoBase64 = () => cargarImagenBase64(LOGO_URL);