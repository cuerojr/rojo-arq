import React from 'react'
import s from './style.module.scss'
import Image from 'next/image'

interface Title {
    preTitle: string
    title: string
    backgroundImage?: string
    titleColor?: string
}

export default function SectionTitle({ props }: { props: Title }) {
    const { title, preTitle, titleColor = '#1e1e1c' } = props; 
      
    return (
        <div className={ s.title_container } >            
            <div className="text-centered" style={{
                textAlign: 'center',
                }}>
                <div className={ s.s2 }>{ preTitle }</div>
                <h2 className={ s.text_size_h2 }
                    style={{
                        color: titleColor
                    }}>{ title }</h2>
            </div>
        </div>
    )
}
