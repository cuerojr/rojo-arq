import React, { useEffect, useRef } from "react";
import s from "./style.module.scss";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import StripesContainer from "../common/stripes";

const sliderData: any = [
  {
    id: "slider1",
    text: "ROJO arq diseña espacios modernos, económicos y confortables que se pueden construir en 12 meses.",
  },
  {
    id: "slider2",
    text: "ROJO arq es la respuesta a las necesidades de las personas. La necesidad de uno mismo, un hogar seguro. Y la necesidad de la casa propia.",
  },
  {
    id: "slider3",
    text: "ROJO arq construye espacios con arquitectura moderna que permite vivir en el entorno de tus sueños. La experiencia de sus diseñadores y profesionales crean un concepto sostenible en el habitat.",
  },
];

export default function Quote() {
  const sectionContainer = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(slidesRef.current, {
        y: 20,
      });

      const titleAnimation = gsap
        .timeline({ paused: false })
        .to(slidesRef.current, {
          opacity: 1,
          y: 0,
        });

      // scroll trigger titulo imagen pineada
      ScrollTrigger.create({
        trigger: sectionContainer.current,
        start: "top +=300px",
        end: `bottom bottom`,
        animation: titleAnimation,
        markers: false,
        scrub: false,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionContainer}
      id="quote"
      className={`${s.home_quote_section} md:h-screen md:flex md:items-center`}
    >
      <StripesContainer />
      <div className={`${s.container} py-20 md:p-0`}>
        <div
          ref={slidesRef}
          id="content1"
          className={`${s.home_quote_layout} opacity-0`}
        >
          <div className={s.margin_bottom_1em}>
            <div className={s.s2}>cumplí tus sueños</div>
          </div>
          <Swiper
            modules={[Pagination, Autoplay]}
            loop={true}
            autoplay={{
              delay: 10000,
              pauseOnMouseEnter: true,
            }}
          >
            {sliderData &&
              sliderData.map((slide: any) => (
                <SwiperSlide key={slide.id}>
                  <div className={s.text_centered}>
                    <div className={`${s.text_container}`}>
                      <img
                        src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
                        loading="lazy"
                        alt="Quote"
                        className={s.first_quote}
                      />
                      <div className={`text-sm md:text-3xl font-light md:leading-10`}>{slide.text}</div>
                      <img
                        src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
                        loading="lazy"
                        alt="Quote"
                        className={s.second_quote}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div
            className={`${s.quote_author_box} gap-5 flex items-center mt-10`}
          >
            <img
              src="/juli.jpg"
              loading="lazy"
              alt="Julieta Rojo - Arquitecta - Diseñadora. Jefa de desarrollo, planeamiento y dirección de obra."
              className={s.quote_author}
            />
            <div className={s.author_box_text}>
              <h5 className={``}>Julieta Rojo</h5>
              <div className={s.s2}>Arquitecta, Fundadora</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SingleQuote() {
  return <></>;
}
