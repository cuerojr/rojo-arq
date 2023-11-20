'use client'
import Link from 'next/link';
import Image from 'next/image';
import s from './style.module.scss'

export default function Navbar() {
  return (
    <>
      <nav className={ s.navbar_container }>
          <div className={ s.navbar }>
            <Link href={'/'}
              style={{
                maxWidth: '100px'
              }}>
                <Image
                  src={'/logo.png'}
                  width={100}
                  height={50}
                  alt="rojoarq"/>
            </Link>
            <ul 
                className={`${s.dropdown_menu} d-flex justify-end gap-2 p-2`}>
                <li 
                  className={s.navbar_li}>
                    <Link 
                        href="https://www.linkedin.com/in/julietarojoarq/" 
                        target="_blank">
                          <svg xmlns="http://www.w3.org/2000/svg" 
                            height="1em"
                            viewBox="0 0 448 512">
                              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                          </svg>
                        </Link>
                </li>
                <li className={s.navbar_li}>
                    <Link 
                        href="https://www.instagram.com/rojoarqdiseno/" 
                        target="_blank">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="1em" 
                            viewBox="0 0 448 512">
                              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                          </svg>
                        </Link>
                </li>
            </ul>
          </div>
      </nav>
      
      <div className={ s.stripes }>
        <div className={s.stripes_wrapper}>
          <div className={s.stripe_container}>
            <div id="w-node-_7ee2322c-333b-0214-5dbb-a142688a222e-4c451fe0" className={s.stripe}></div>
            <div id="w-node-_9546edc1-c069-caee-74dd-479059466453-4c451fe0" className={s.stripe}></div>
            <div id="w-node-_93cb9ad3-ad3e-0eba-18c1-4988c39f1562-4c451fe0" className={s.two_stripes}>
              <div className="stripe mob-r"></div><div className="stripe right"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
