"use client";
import Link from "next/link";
import ContactForm from "../contact-form";
import Image from "next/image";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { EMAIL_ADDRESS_LINK, INSTAGRAM, LINKEDIN } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useNavbarSection } from "@/hooks/use-navbar-section";

interface HeroVideoProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
}

export default function Footer() {
  const ref = useNavbarSection("light");
  const videoRef = useRef<HTMLVideoElement>(null);
  const data: HeroVideoProps = {
    videoSrc: "/fondo.mp4",
    title: "Tu Título Aquí",
    subtitle: "Una descripción memorable que invite a la acción.",
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay bloqueado por el navegador — silencioso
    });
  }, []);

  const socialBtnsStyle =
    "border-rojoarq-black border p-4 hover:bg-rojoarq-black hover:text-rojoarq-white transition-all ease-in-out duration-300";

  return (
    <footer
      ref={ref as React.RefObject<HTMLElement>}
      className="max-w-[1440px] mx-auto min-h-screen flex flex-col justify-between p-4 md:p-10 bg-rojoarq-white text-rojoarq-black"
    >
      <div className="">
        <h2 className="text-lg  underline underline-offset-8 decoration-1 mb-4">
          Contacto
        </h2>
      </div>
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10 items-end border-b border-rojoarq-arena pb-5 md:pb-10">
          <div className="relative col-span-1 md:col-span-5 aspect-video">
            <div className="absolute inset-0 bg-rojoarq-black opacity-60 z-10"></div>
            <video
              ref={videoRef}
              src={data.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
              aria-hidden="true"
            />
          </div>
          <div className="col-span-1 md:col-span-7 flex flex-col gap-10 py-10">
            <h2 className=" md:indent-9 text-[clamp(1.5rem,3rem,4vw)] leading-[1.24] ">
              Diseño y construcción para cada espacio
            </h2>
            <p className="text-lg font-light leading-[1.1] text-balance pr-2">
              Reformas de consultorios, oficinas, comercios y casas. Analizamos
              la factibilidad de tu construcción para que tomes la mejor
              decisión a la hora de invertir. Agendá una asesoría técnica de
              cortesía.
            </p>
          </div>
        </div>
        <div className="footer_form pt-5 md:pt-10">
          {/*<ContactForm />*/}
          <div className="flex flex-col md:flex-row items-center gap-5 justify-between">
            <Image
              src={"/colegio-de-arquitectos.png"}
              width={150}
              height={80}
              alt="Colegio de Arquitectos de la provincia de Santa Fe"
            />
            <div className="flex gap-4 ">
              <Link
                href={EMAIL_ADDRESS_LINK}
                target="_blank"
                className={cn(socialBtnsStyle)}
              >
                <Mail />
              </Link>
              <Link
                href={LINKEDIN}
                target="_blank"
                className={cn(socialBtnsStyle)}
              >
                <Linkedin />
              </Link>
              <Link
                href={INSTAGRAM}
                target="_blank"
                className={cn(socialBtnsStyle)}
              >
                <Instagram />
              </Link>
            </div>
            <Image
              src={"/black-logo.png"}
              width={140}
              height={60}
              alt="Estudio de arquitectura de la ciudad de Rosario"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
