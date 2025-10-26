import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'
import TimelineMarkers from './three/TimelineMarkers'

interface CareerItem {
  year: string
  company: string
  title: string
  location?: string
  duration?: string
  description: string
  technologies?: string[]
  achievements?: string[]
}

export default function CareerSection(){
  const { t } = useTranslation()
  const items = t('career.items',{ returnObjects:true }) as CareerItem[] || []
  useReveal('#intership')
  
  return (
    <section id="intership" className="career-list" aria-labelledby="career-title" style={{position:'relative'}}>
      <span id="stages" style={{position:'relative',top:'-80px'}}></span>
      <h1 id="career-title" className="section-title">
        <span className="accent-gradient">{t('career.title')}</span>
      </h1>
      <div className="timeline-3d-wrapper" style={{position:'relative'}}>
        <TimelineMarkers count={items.length} />
        <div className="timeline career-timeline">
          {items.map((item, i) => (
            <div key={i} className={`container show career-item ${i%2?'right':'left'}`}>
              <div className="content career-content">
                <div className="career-header">
                  <span className="career-year">{item.year}</span>
                  <h3 className="career-title">{item.title}</h3>
                  <div className="career-company">
                    <i className="icofont-building" aria-hidden="true"></i>
                    <strong>{item.company}</strong>
                    {item.location && <span className="career-location"> • {item.location}</span>}
                  </div>
                  {item.duration && <span className="career-duration">{item.duration}</span>}
                </div>
                
                <p className="career-description">{item.description}</p>
                
                {item.technologies && item.technologies.length > 0 && (
                  <div className="career-technologies">
                    <strong>Technologies :</strong>
                    <div className="tech-badges">
                      {item.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {item.achievements && item.achievements.length > 0 && (
                  <div className="career-achievements">
                    <strong>Réalisations :</strong>
                    <ul>
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx}>
                          <i className="icofont-check-circled" aria-hidden="true"></i>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
