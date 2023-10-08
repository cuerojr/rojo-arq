import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:py-16 md:px-24">
      <Header />     
      <Footer />
    </main>
  )
}
