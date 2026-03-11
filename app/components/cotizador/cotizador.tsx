import Image from "next/image";
import ContactForm from "../contact-form";

function Cotizador() {
  return (
    <>
      <div className="fixed top-1/2 -right-11 -translate-y-1/2 -rotate-90 bg-rojoarq-black z-50 text-rojoarq-white p-1 border border-rojoarq-arena cursor-pointer">
        <span className="px-5">Cotizador</span>
      </div>

      <div className="min-h-screen fixed inset-0 bg-rojoarq-black/70 z-60 p-20">
        <div className="bg-rojoarq-white h-full">
          <div className="flex gap-5 h-full">
            <div className="w-2/5 relative overflow-hidden">
              <Image
                src="/hero-bg.png"
                alt="Construcciones y reformas en la ciudad de Rosario"
                height={540}
                width={960}
                className="absolute inset-0 w-full h-full object-cover "
              />
            </div>
            <div className="w-3/5 py-15 px-10 ">
              <h2 className="text-lg underline mb-4">Contactanos</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cotizador;
