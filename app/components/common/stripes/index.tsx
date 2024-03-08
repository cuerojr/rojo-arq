import React from 'react'
import s from './style.module.scss'

export default function StripesContainer() {
  return (
    <div className={ s.stripes_container } data-testid="stripes-container">
        <div className={ s.stripes }></div>
        <div className={ s.stripes }></div>
        <div className={ s.stripes }></div>
    </div>
  )
}