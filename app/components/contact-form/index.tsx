import ButtonComponent from '../common/button'
import s from './style.module.scss'

export default function ContactForm() {
  return (
  <div className={ s.footer_form }>
    <form>
      <div className={ s.form_group }>
          <label>NOMBRE</label>
          <input type="text" />
      </div>
      <div className={ s.form_group }>
          <label>EMAIL</label>
          <input type="email"/>
      </div>
      <div className={ s.form_group }>
          <label>TELÉFONO</label>
          <input type="email"/>
      </div>
      <div className={ s.form_group }>
          <label>CONSULTA</label>
          <textarea></textarea>
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
