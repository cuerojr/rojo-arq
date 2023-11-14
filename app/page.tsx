
import s from './style.module.scss';

import Footer from "./components/footer";
import Header from "./components/header";
import ServicesList from "./components/services-list";
import Slogan from "./components/slogan";
import MisionComponent from "./components/mision";
import Navbar from './components/navbar';

export default function Home() {  

  return (
    <>
      <Navbar />
      <Header />
      <Slogan />
      <MisionComponent />
      <ServicesList />
      <Footer />
    </>
  )
}
