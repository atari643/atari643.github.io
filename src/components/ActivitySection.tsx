import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'
import TimelineMarkers from './three/TimelineMarkers'

export default function ActivitySection(){
  const { t } = useTranslation()
  const items = t('activities.items',{ returnObjects:true }) as any[] || []
  useReveal('#activites')
  return (
    <section id="activites" aria-labelledby="activities-title" style={{position:'relative'}}>
      <span id="activités" style={{position:'relative',top:'-80px'}}></span>{/* ancre legacy */}
      <h1 id="activities-title" className="section-title"><span className="accent-gradient">{t('activities.title')}</span></h1>
      <div className="timeline-3d-wrapper" style={{position:'relative'}}>
        <TimelineMarkers count={items.length} />
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
      </div>
    </section>
  )
}
