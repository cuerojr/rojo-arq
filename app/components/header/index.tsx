'use client'
import Image from "next/image"
import s from './page.module.scss'

export default function Header() {
  return (
    <section className={`p-8 md:py-16 md:px-24 ${s.header_section} flex min-h-screen items-center h-full w-full lg:flex`}>
       <div style={{
        width: '50%'
       }}>
        <h1 className={`${ s.header_title } text-lg`}>Es posible</h1>
        <p className={`${ s.header_subtitle }`}>Estás llegando</p>
       </div>       
       <div className={s.header_box}>
          <Image className={ s.image } src={'/header-bg-n.webp'} alt={'ad'} fill={true} />
       </div>
    </section>
  );
}
