import Link from "next/link";
import ContactForm from "../contact-form";
import Image from "next/image";
import s from "./style.module.scss";
import MisionButtonComponent from "../common/mision-button";
import SectionTitle from "../section-title";
import { Title } from "@/app/types/types";
import StripesContainer from "../common/stripes";

export default function Footer() {
  const titleData: Title = {
    preTitle: `Contacto`,
    title: `Nuestras redes`,
    backgroundImage: "/juli.jpg",
    titleColor: "",
  };

  return (
    <section className={s.footer_container}>
      <StripesContainer />
      <SectionTitle props={titleData}></SectionTitle>

      <div className={s.stripe_container}>
        <MisionButtonComponent>
          <a
            href="https://wa.me/549341153830273"
            target="_blank"
            className="regulations_card w-inline-block"
          >
            <div className={s.card_wrapper}>
              <h2 className="button-main_text">WHATSAPP</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="8"
                fill="currentColor"
                viewBox="0 0 9 8"
              >
                <path d="M8.055 0H.71v.445h7.036L.5 7.685.815 8 8.055.766v7.018H8.5V0h-.445Z"></path>
              </svg>
            </div>
            <div className="background-circle legal"></div>
          </a>
        </MisionButtonComponent>
        <MisionButtonComponent>
          <a
            data-w-id="4c6cc4d4-5adf-56d9-ccc1-7a7e3dd901a3"
            href="https://www.linkedin.com/in/julietarojoarq/"
            target="_blank"
            className={s.card_wrapper_second_child}
          >
            <div className={s.card_wrapper}>
              <h2 className="button-main_text">INSTAGRAM</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="8"
                fill="currentColor"
                viewBox="0 0 9 8"
              >
                <path d="M8.055 0H.71v.445h7.036L.5 7.685.815 8 8.055.766v7.018H8.5V0h-.445Z"></path>
              </svg>
            </div>
            <div className="background-circle legal"></div>
          </a>
        </MisionButtonComponent>
        <MisionButtonComponent>
          <a
            href="https://www.linkedin.com/in/julietarojoarq/"
            target="_blank"
            className="regulations_card w-inline-block"
          >
            <div className={s.card_wrapper}>
              <h2 className="button-main_text">LinkedIn</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="8"
                fill="currentColor"
                viewBox="0 0 9 8"
              >
                <path d="M8.055 0H.71v.445h7.036L.5 7.685.815 8 8.055.766v7.018H8.5V0h-.445Z"></path>
              </svg>
            </div>
            <div className="background-circle legal"></div>
          </a>
        </MisionButtonComponent>
      </div>

      <div className={s.footer_info}>
        <div className={s.footer_info_wrapper}>
          <div className="footer_logo w-embed">
            <Image src={"/logo.png"} width={100} height={50} alt="rojoarq" />
          </div>
          <div className="margin-bottom _2em">
            <div className={s.body_small}>
              ROJO arq es una nueva forma de proyectar y construir: casas,
              negocios y equipamientos para vivir, alquilar o invertir.
            </div>
          </div>
          <div className={s.footer_socials}>
            <div className="body-small">Escribinos</div>
            <a
              href="mailto:rojoarqdiseno@gmail.com"
              className="home-link w-inline-block"
            >
              rojoarqdiseno@gmail.com
            </a>
          </div>
          <div className={s.footer_socials}>
            <Link
              href="https://www.linkedin.com/in/julietarojoarq/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/rojoarqdiseno/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className={s.footer_form}>
          <ContactForm></ContactForm>
        </div>
      </div>
    </section>
  );
}
