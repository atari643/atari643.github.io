import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'
import TimelineMarkers from './three/TimelineMarkers'

export default function CareerSection(){
  const { t } = useTranslation()
  const items = t('career.items',{ returnObjects:true }) as any[] || []
  useReveal('#intership')
  return (
    <section id="intership" className="career-list" aria-labelledby="career-title" style={{position:'relative'}}>
      <span id="stages" style={{position:'relative',top:'-80px'}}></span>{/* ancre alternative */}
      <h1 id="career-title" className="section-title"><span className="accent-gradient">{t('career.title')}</span></h1>
      <div className="timeline-3d-wrapper" style={{position:'relative'}}>
        <TimelineMarkers count={items.length} />
        <div className="timeline">
        {items.map((it,i)=>(
          <div key={i} className={`container show ${i%2?'right':'left'}`}>
            <div className="content">
              <h2>{it.year}</h2>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}
