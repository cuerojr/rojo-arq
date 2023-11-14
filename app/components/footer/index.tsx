'use client'
import { motion } from 'framer-motion';
import { socialBtnVariants } from '@/app/utils/bottomOpacityAnimation';
import s from './style.module.scss'
import { Input } from 'postcss';

export default function Footer() {
    return (
        <section 
            className={`${ s.footer_container } flex min-h-screen items-end justify-between h-full w-full`}>            
            <div className={s.footer_text}>
                <h2 style={{
                    fontWeight: '600',
                    fontSize: '1.5rem'
                }}>Contactate con nosotros para empezar a diseñar tu proyecto!</h2>
                <ul>
                    <li>                                                      
                        <a target="_blank" 
                            aria-label="Chat on WhatsApp" 
                            href="https://wa.me/549341153830273"
                            className={s.footer_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                            </svg> <span>0341-153830273</span>
                        </a>                        
                    </li>
                    <li>                         
                        <a href="mailto:rojoarqdiseno@gmail.com"
                             className={s.footer_button}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                height="1em" 
                                viewBox="0 0 512 512">
                                <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
                            </svg> <span className={s.footer_span}>rojoarqdiseno@gmail.com</span>
                        </a>                        
                    </li>
                </ul>
                <div className={s.back_text}></div>
            </div>
            <div>
                <form>
                    <div>
                        <label>NOMBRE</label>
                        <input type="text" placeholder="Consulta"/>
                    </div>
                    <div>
                        <label>EMAIL</label>
                        <input type="email"/>
                    </div>
                    <div>
                        <label>TELÉFONO</label>
                        <input type="email"/>
                    </div>
                    <div>
                        <label>CONSULTA</label>
                        <textarea></textarea>
                    </div>
                    <div>
                        <button type="submit">ENVIAR</button>
                    </div>
                </form>
            </div>
        </section>
    )
}