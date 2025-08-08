import { useTranslation } from 'react-i18next'

export default function Mentors(){
  const { t } = useTranslation()
  const list = t('mentors.items',{ returnObjects:true }) as any[] || []
  return (
    <section id="mentors" className="mentors" aria-labelledby="mentors-title">
      <h1 id="mentors-title" className="section-title"><span className="accent-gradient">{t('mentors.title')}</span></h1>
      <div className="mentors-grid">
        {list.map((m,i)=>(
          <figure key={i} className="mentor-card" data-animate="fade">
            <div className="mentor-avatar">
              {m.img ? <img src={m.img} alt={m.name} loading="lazy" /> : <div className="placeholder" aria-hidden="true">{m.name?.[0] || '?'}</div>}
            </div>
            <figcaption>
              <p className="mentor-name">{m.name}</p>
              <p className="mentor-role">{m.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
