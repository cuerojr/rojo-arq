'use client'

import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import ServicesList from "@/app/components/services-list";
import MisionComponent from "@/app/components/mision";
import Navbar from '@/app/components/navbar';
import HeroImage from '@/app/components/hero-image';
import Quote from '@/app/components/home-quote';
import { Toaster } from '@/components/ui/toaster';
import Autor from "@/app/components/autor/autor";

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
      <Autor />  
      <Toaster />    
    </main>
  )
}
