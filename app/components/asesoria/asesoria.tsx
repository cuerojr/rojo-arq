"use client";
import Image from "next/image";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ContactForm from "../contact-form";
import { Button } from "@/components/ui/button";

import { useGlobal } from "@/lib/store";
import { X } from "lucide-react";

function Asesoria() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setScroller = useGlobal((s) => s.setScroller);

  const handleModal = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Button
        onClick={handleModal}
        className="rounded-none cursor-pointer fixed top-1/2 -right-9 -translate-y-1/2 -rotate-90 bg-rojoarq-black z-70 text-rojoarq-white p-1 border border-rojoarq-arena cursor-pointer"
      >
        <span className="px-5">Asesoría</span>
      </Button>

      <div
        className={cn(
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
          "select-none transition-all duration-300 ease-in-out min-h-screen fixed inset-0 bg-rojoarq-black/70 z-60 p-4 md:p-20",
        )}
      >
        <div className="bg-rojoarq-white h-full">
          <div className="flex flex-col md:flex-row gap-5 h-full">
            <div className="w-full aspect-video md:w-2/5 relative overflow-hidden">
              <Image
                src="/hero-bg.png"
                alt="Construcciones y reformas en la ciudad de Rosario"
                height={540}
                width={960}
                className="absolute inset-0 w-full h-full object-cover object-bottom"
              />
            </div>
            <div className="w-full md:w-3/5 py-6 md:py-15 px-5 md:px-10">
              <div className="flex gap-4 justify-between">
                <div>
                  <h2 className="text-lg underline mb-4">
                    Contactanos por una asesoría
                  </h2>
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <X />
                  </Button>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Asesoria;
