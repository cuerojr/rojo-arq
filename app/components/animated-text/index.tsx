import React from 'react';
import s from './style.module.scss'

export default function AnimatedText() {
  return (
    <div className={ s.inner_headings } data-testid="animated-text">
      <span>
        construir <br />
        invertir <br />
        habitar <br />
        vivir <br />
      </span>
    </div>
  )
}
