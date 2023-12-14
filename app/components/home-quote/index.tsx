import React from "react";
import s from './style.module.scss'
import { Autoplay, Controller, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

export default function Quote() {
  return (
    <section id="quote" className={ s.home_quote_section }>
      <div className={ s.container }>            
        <div id="content1" className={s.home_quote_layout}>
          <div className={s.margin_bottom_1em}>
            <div className={s.s2}>cumplí tus sueños</div>
          </div>
          <Swiper 
            modules={[Pagination, Autoplay]}
            loop={true}
            autoplay={{
              delay: 10000,
              pauseOnMouseEnter: true
            }}> 
            <SwiperSlide>
                <div className={s.text_centered}>
                  <div className={s.text_container}>
                    <img
                      src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
                      loading="lazy"
                      alt=""
                      className={s.first_quote}/>
                    <div className={s.body_large}>ROJO arq diseña espacios modernos, económicos y confortables que se pueden construir en 12 meses</div>
                    <img
                      src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
                      loading="lazy"
                      alt=""
                      className={s.second_quote}/>
                  </div>
                </div>
            </SwiperSlide>   
            <SwiperSlide>
                <div className={s.text_centered}>
                  <div className={s.text_container}>
                    <img
                      src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
                      loading="lazy"
                      alt=""
                      className={s.first_quote}/>
                    <div className={s.body_large}>ROJO arq es la respuesta a las necesidades de las personas. La necesidad de uno mismo, un hogar seguro. Y la necesidad de la casa propia.</div>
                    <img
                      src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
                      loading="lazy"
                      alt=""
                      className={s.second_quote}/>
                  </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={s.text_centered}>
                  <div className={s.text_container}>
                    <img
                      src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
                      loading="lazy"
                      alt=""
                      className={s.first_quote}/>
                    <div className={s.body_large}>ROJO arq construye espacios con arquitectura moderna que permite vivir en el entorno de tus sueños. La experiencia de sus diseñadores y profesionales crean un concepto sostenible en el habitat.</div>
                    <img
                      src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
                      loading="lazy"
                      alt=""
                      className={s.second_quote}/>
                  </div>
                </div>
            </SwiperSlide>
          </Swiper>             
          <div className={s.quote_author_box}>
            <img
              src="/juli.jpg"
              loading="lazy"
              alt=" - Chief Technology officer, founder of LVNG"
              className={s.quote_author}
            />
            <div className={s.author_box_text}>
              <h5 className={s.text_size_h5}>Julieta Rojo</h5>                
              <div className={s.s2}>
                Arquitecta.
              </div>
            </div>
          </div>
        </div>          
      </div>
    </section>
  );
}

export function SingleQuote() {

    return (
        <></>
    )
}