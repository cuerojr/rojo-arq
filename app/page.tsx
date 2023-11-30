'use client'
import s from './style.module.scss';
import { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import Footer from "./components/footer";
import Header from "./components/header";
import ServicesList from "./components/services-list";
import Slogan from "./components/slogan";
import MisionComponent from "./components/mision";
import Navbar from './components/navbar';
import HeroImage from './components/hero-image';
import Quote from './components/home-quote';


export default function Home() {  
  const lenisRef: any = useRef();

  /*useEffect(() => {
    
    function update(time: any) {
      lenisRef.current?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => {
      gsap.ticker.remove(update)
    }

  }, []);*/
  
  return (
    <main>        
      <Navbar />
      <Header />
      <HeroImage />
      <Quote />
      <ServicesList />
      <MisionComponent />
      <Footer />      
    </main>
  )
}
