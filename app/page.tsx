'use client'
import s from './style.module.scss';
import { useEffect, useRef } from 'react';
import Footer from "./components/footer";
import Header from "./components/header";
import ServicesList from "./components/services-list";
import Slogan from "./components/slogan";
import MisionComponent from "./components/mision";
import Navbar from './components/navbar';
import HeroImage from './components/hero-image';
import Quote from './components/home-quote';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {  
  
  return (
    <main>        
      <Navbar />
      <Header />
      <HeroImage />
      <Quote />
      <ServicesList />
      <MisionComponent />
      <Footer />  
      <Toaster />    
    </main>
  )
}
