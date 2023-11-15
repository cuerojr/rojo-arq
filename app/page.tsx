'use client'
import s from './style.module.scss';

import Footer from "./components/footer";
import Header from "./components/header";
import ServicesList from "./components/services-list";
import Slogan from "./components/slogan";
import MisionComponent from "./components/mision";
import Navbar from './components/navbar';
import { useEffect } from 'react';

export default function Home() {  

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]') as HTMLElement,
        smooth: true
    });
    })();
  }, []);
  
  return (
    <main data-scroll-container>
      <Navbar />
      <Header />
      <Slogan />
      <MisionComponent />
      <ServicesList />
      <Footer />
    </main>
  )
}
