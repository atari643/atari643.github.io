import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'
import React from 'react'
import { useInView } from './three/useInView'
import Globe from './three/Globe'

export default function IntlSection(){
  const { t } = useTranslation()
  const items = t('intl.items',{ returnObjects:true }) as any[] || []
  useReveal('#Internationalisation')
  const { ref: globeRef, inView: globeInView } = useInView<HTMLDivElement>({ threshold:.2 })
  return (
    <section id="Internationalisation" aria-labelledby="intl-title">
      <h1 id="intl-title" className="section-title"><span className="accent-gradient">{t('intl.title')}</span></h1>
      <div ref={globeRef} className="intl-globe-wrapper" aria-describedby="intl-globe-desc">
        <div className="globe-backdrop" aria-hidden="true" />
        {globeInView && <Globe markers={[{lat:48.8566,lon:2.3522},{lat:51.5072,lon:-0.1276},{lat:40.7128,lon:-74.006},{lat:35.6762,lon:139.6503}]} />}
        <p id="intl-globe-desc" className="visually-hidden">Globe 3D décoratif indiquant quelques villes internationales.</p>
        <span className="globe-caption" aria-hidden="true">Global Reach</span>
      </div>
      <div className="timeline">
        {items.map((it,i)=>(
          <div key={i} className={`container ${i%2?'right':'left'}`}>
            <div className="content">
              <h2>{it.year}</h2>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
