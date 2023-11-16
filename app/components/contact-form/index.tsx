import ButtonComponent from '../common/button'
import s from './style.module.scss'

export default function ContactForm() {
  return (
  <div className={ s.footer_form }>
    <form>
      <div className={ s.form_group }>
          <label htmlFor="name">Nombre</label>
          <input type="text" id='name'/>
      </div>
      <div className={ s.form_group }>
          <label htmlFor='email'>Email</label>
          <input type="email" id='email'/>
      </div>
      <div className={ s.form_group }>
          <label htmlFor='telephone'>Teléfono</label>
          <input type="email" id='telephone'/>
      </div>
      <div className={ s.form_group }>
          <label htmlFor='message'>Consulta</label>
          <textarea id='message'></textarea>
      </div>
      <div className='d-flex align-center justify-center'>
          <ButtonComponent>
            <span>Enviar</span>
          </ButtonComponent>
      </div>
    </form>
  </div>
  )
}
