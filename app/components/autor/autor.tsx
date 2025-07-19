import React from "react";
import s from "./style.module.scss";
import StripesContainer from "../common/stripes";

export default function Auto() {
  return (
    <section className="border-1 border-t relative">
      <div className={s.footer_container}>
        <StripesContainer />
        <p
          className="text-balance font-thin p-3 uppercase"
          style={{
            fontSize: "10px",
          }}
        >
          © {new Date().getFullYear()} rojoarq / Rojo Nicolás
        </p>
      </div>
    </section>
  );
}
