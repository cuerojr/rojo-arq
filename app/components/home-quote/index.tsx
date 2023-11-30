import React from "react";
import s from './style.module.scss'

export default function Quote() {
  return (
    <section id="quote" className={ s.home_quote_section }>
      <div className={ s.container }>
        <div className="page-padding">

          <div id="content1" className={s.home_quote_layout}>
            <div className={s.margin_bottom_1em}>
              <div className={s.s2}>cumplí tus sueños</div>
            </div>
            <div className={s.margin_bottom_3em}>
              <div className={s.text_centered}>
                <div className={s.body_large}>
                <img
              src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
              loading="lazy"
              alt=""
              className="quote_img hidden"
            />ROJO arq construye espacios con arquitectura moderna que permite vivir en el entorno de tus
                sueños. La experiencia de sus diseñadores y profesionales crean un concepto sostenible en el
                habitat.<img
              src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
              loading="lazy"
              alt=""
              className="quote_img hidden"
            />
                </div>
              </div>
            </div>
            <div className={s.quote_author_box}>
              <img
                src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edfeb402f94ac66447c60f_witbor_pho.png"
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

          <div
            id="content2"
            className="home-quote_layout"
            style={{
              display: "none",
            }}
          >
            <div className="margin-bottom _1em">
              <div className="s2">fulfil your dreams</div>
            </div>
            <div className="margin-bottom _3em">
              <div className="text-centered">
                <div className="body-large">
                  LVNG is a modern, economical, and comfortable home that can be
                  built in just 99 days from today.
                </div>
              </div>
            </div>
            <div className="quote-author_box">
              <img
                src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63fdb9a3a5e3b79aaa88f3f7_Sebastian-Jakubiak.png"
                loading="lazy"
                alt="Sebastian Jakubiak - Cheif Executive Officer, Founder of LVNG"
                className="quote_author"
              />
              <div className="author-box_text">
                <div className="margin-bottom _05em">
                  <div className="text-size-h5">Sebastian Jakubiak</div>
                </div>
                <div className="s2">
                  Chief Executive Officer, founder of LVNG
                </div>
              </div>
            </div>
            <img
              src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
              loading="lazy"
              alt=""
              className="quote_img hidden"
            />
            <div className="quote_img w-embed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="3em"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M20 24c0 5-2 8-8 11m28-11c0 5-2 8-8 11M20 24H10a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9Zm20 0H30a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9Z"
                ></path>
              </svg>
            </div>
          </div>

          <div
            id="content3"
            className="home-quote_layout"
            style={{
              display: "none",
            }}
          >
            <div className="margin-bottom _1em">
              <div className="s2">fulfil your dreams</div>
            </div>
            <div className="margin-bottom _3em">
              <div className="text-centered">
                <div className="body-large">
                  LVNG is the answer to people’s needs. The need for one’s own,
                  safe home. One’s own asylum.
                </div>
              </div>
            </div>
            <div className="quote-author_box">
              <img
                src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/6454ada0740d8695b90bfeca_lvng-founder3-img.webp"
                loading="lazy"
                alt="mgr inż. arch. Jakub Sobczyk - Creative Architect, founder of LVNG"
                className="quote_author"
              />
              <div className="author-box_text wider">
                <div className="margin-bottom _05em">
                  <div className="text-size-h5">
                    mgr inż. arch. Jakub Sobczyk
                  </div>
                </div>
                <div className="s2">
                  creative architect,
                  <br />
                  founder of lvng
                </div>
              </div>
            </div>
            <img
              src="https://assets-global.website-files.com/63edd6d4291b030b472abf35/63edff8f3465de643bc21997_quote_img.svg"
              loading="lazy"
              alt=""
              className="quote_img hidden"
            />
            <div className="quote_img w-embed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="3em"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M20 24c0 5-2 8-8 11m28-11c0 5-2 8-8 11M20 24H10a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9Zm20 0H30a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9Z"
                ></path>
              </svg>
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