import { useTranslation } from 'react-i18next'
import { useInView } from './three/useInView'

interface Achievement {
  icon: string
  title: string
  year: string
  description: string
  tags: string[]
}

export default function Achievements() {
  const { t } = useTranslation()
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.15 })
  
  const achievements = t('achievements.items', { returnObjects: true }) as Achievement[]

  return (
    <section id="achievements" className="achievements-section" ref={ref}>
      <h1 className="section-title">
        <span className="accent-gradient">{t('achievements.title')}</span>
      </h1>
      <div className="achievements-grid">
        {Array.isArray(achievements) && achievements.map((achievement, idx) => (
          <div
            key={idx}
            className={`achievement-card ${inView ? 'visible' : ''}`}
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <div className="achievement-icon">
              <i className={achievement.icon} aria-hidden="true"></i>
            </div>
            <div className="achievement-header">
              <h3>{achievement.title}</h3>
              <span className="achievement-year">{achievement.year}</span>
            </div>
            <p className="achievement-description">{achievement.description}</p>
            {achievement.tags && achievement.tags.length > 0 && (
              <div className="achievement-tags">
                {achievement.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
