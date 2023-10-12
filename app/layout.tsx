import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Navbar from './components/navbar'
 
const montserrat = Montserrat({ subsets: ['latin'], weight: ['900', '700', '500', '400'] })

export const metadata: Metadata = {
  title: 'ROJO ARQ',
  description: 'Diseñamos arquitectura',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
