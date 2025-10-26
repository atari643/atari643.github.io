import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function ActivitySection(){
  const { t } = useTranslation()
  const items = t('activities.items',{ returnObjects:true }) as any[] || []
  
  // Animation révélation des cartes
  useEffect(() => {
    const cards = document.querySelectorAll('.activity-card')
    if (!cards.length) return
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Délai progressif pour effet cascade
          setTimeout(() => {
            entry.target.classList.add('show')
          }, index * 150)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    
    cards.forEach(card => observer.observe(card))
    
    return () => observer.disconnect()
  }, [items])
  
  return (
    <section id="activites" aria-labelledby="activities-title" className="activities-section">
      <span id="activités" style={{position:'relative',top:'-80px'}}></span>{/* ancre legacy */}
      <h1 id="activities-title" className="section-title"><span className="accent-gradient">{t('activities.title')}</span></h1>
      <div className="activities-grid">
        {items.map((item, i) => (
          <div key={i} className="activity-card" style={{transitionDelay: `${i * 0.15}s`}}>
            <div className="activity-icon">
              {item.icon && <i className={item.icon}></i>}
            </div>
            <h3 className="activity-title">{item.title}</h3>
            <p className="activity-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
