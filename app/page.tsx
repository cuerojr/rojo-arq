'use client'

import s from './style.module.scss';
import Footer from "./components/footer";
import Header from "./components/header";
import ServicesList from "./components/services-list";
import Slogan from "./components/slogan";
import MisionComponent from "./components/mision";

export default function Home() {  

  return (
    <main className={ s.main }>
      <Header />
      <Slogan />
      <MisionComponent />
      <ServicesList />
      <Footer />
    </main>
  )
}
