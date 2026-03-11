import ContactForm from "../contact-form";

function Cotizador() {
  return (
    <>
      <div className="fixed top-1/2 -right-11 -translate-y-1/2 -rotate-90 bg-rojoarq-black z-50 text-rojoarq-white p-1 border border-rojoarq-arena cursor-pointer">
        <span className="px-5">Cotizador</span>
      </div>

      <div className=" fixed inset-0 bg-rojoarq-black/70 z-60 p-20">
        <div className="bg-rojoarq-arena h-full p-20">
            <h2>Asesoría</h2>
            <ContactForm />
        </div>
      </div>
    </>
  );
}

export default Cotizador;
