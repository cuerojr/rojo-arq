"use client";
import { motion } from "framer-motion";
import { brandVariants } from "@/app/utils/leftOpacityAnimation";

export default function Header() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between h-full w-full lg:flex">
      <motion.svg
        id="Capa_1"
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 227.44 117.88"
        overflow="visible"
        style={{
          maxWidth: '500px'
        }}
      >
        <motion.path
          variants={brandVariants}
          initial="hidden"
          animate="visible"
          d="M70.39,77.52,53.13,117H59.7l22.62-9.29L86.38,117h7.19L76.32,77.52Zm9.28,24.12L64.23,108l9.12-20.85Z"
        />
        <motion.path
          variants={brandVariants}
          initial="hidden"
          animate="visible"
          d="M124.58,100.5a13.46,13.46,0,0,0-9.52-23H98.46V117h6.6V104.45h8.63L121.51,117h7.77l-8.58-13.74A13.42,13.42,0,0,0,124.58,100.5ZM121.93,91a6.88,6.88,0,0,1-6.87,6.88h-10V84.11h10A6.88,6.88,0,0,1,121.93,91Z"
        />
        <motion.path
          variants={brandVariants}
          initial="hidden"
          animate="visible"
          d="M170.13,109a20.24,20.24,0,1,0-4.66,4.66l4.19,4.19,4.66-4.66Zm-2.8-11.79a13.5,13.5,0,0,1-2,7l-3.71-3.71L157,105.23l3.71,3.71a13.5,13.5,0,0,1-7,2,13.65,13.65,0,1,1,13.65-13.65Z"
        />
        <motion.path
          variants={brandVariants}
          initial="hidden"
          animate="visible"
          d="M33.77,42.16,47.84,64.67h-9.4L25.15,43.41H8V64.67H0V.89H26.58a21.26,21.26,0,0,1,15,36.29A21.09,21.09,0,0,1,33.77,42.16Zm-7.19-6.72a13.29,13.29,0,1,0,0-26.58H8V35.44Z"
        />
        <motion.path
          variants={brandVariants}
          initial="hidden"
          animate="visible"
          d="M111.59,9.6A32.79,32.79,0,1,1,88.41,0,32.69,32.69,0,0,1,111.59,9.6ZM106,50.32a24.82,24.82,0,1,0-17.54,7.26A24.69,24.69,0,0,0,106,50.32Z"
        />
        <motion.path
          variants={brandVariants}
          initial="hidden"
          animate="visible"
          d="M217.84,9.6A32.77,32.77,0,1,1,194.67,0,32.69,32.69,0,0,1,217.84,9.6ZM212.2,50.32a24.81,24.81,0,1,0-17.53,7.26A24.65,24.65,0,0,0,212.2,50.32Z"
        />
        <motion.path
          variants={brandVariants}
          initial="hidden"
          animate="visible"
          d="M153.08,32.78a31.89,31.89,0,0,1-31.89,31.89v-8a23.93,23.93,0,0,0,23.92-23.92V.89h8Z"
        />
      </motion.svg>
    </section>
  );
}
