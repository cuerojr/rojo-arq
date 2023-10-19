import Footer from "./components/footer";
import Header from "./components/header";
import ServicesList from "./components/services-list";
import Slogan from "./components/slogan";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Slogan />
      <ServicesList />  
      <Footer />
    </main>
  )
}
