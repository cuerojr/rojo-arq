import React from "react";

export default function Auto() {
  return (
    <section className="border-1 border-t relative">
      <div className="footer_container">
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
