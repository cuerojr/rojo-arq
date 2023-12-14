import ButtonComponent from '../common/button'
import MisionButtonComponent from '../common/mision-button'
import s from './style.module.scss'

export default function ContactForm() {
  return (
  <div className={ s.footer_form }>
    <form>
      <div className={ s.form_group }>
          <input type="text" id='name' placeholder='Nombre'/>
      </div>
      <div className={ s.form_group }>
          <input type="email" id='email'  placeholder='Email'/>
      </div>
      <div className={ s.form_group }>
          <input type="email" id='telephone'  placeholder='Teléfono'/>
      </div>
      <div className={ s.form_group }>
          <textarea id='message' placeholder='Consulta'></textarea>
      </div>
      <div className='d-flex align-center justify-center'>
          <MisionButtonComponent>
            <span>Enviar</span>
          </MisionButtonComponent>
      </div>
    </form>
  </div>
  )
}
