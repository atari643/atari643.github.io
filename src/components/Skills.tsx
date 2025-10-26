import { useTranslation } from 'react-i18next'
import { useInView } from './three/useInView'

export default function Skills() {
  const { t } = useTranslation()
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 })

  const categories = [
    { key: 'languages', icon: 'icofont-code' },
    { key: 'frameworks', icon: 'icofont-stack-overflow' },
    { key: 'tools', icon: 'icofont-tools-alt-2' },
    { key: 'networks', icon: 'icofont-network-tower' },
    { key: 'learning', icon: 'icofont-learn' },
    { key: 'management', icon: 'icofont-briefcase-1' },
    { key: 'soft', icon: 'icofont-users-alt-4' }
  ]

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <h1 className="section-title">
        <span className="accent-gradient">{t('skills.title')}</span>
      </h1>
      <div className="skills-container">
        {categories.map((cat, idx) => {
          const items = t(`skills.items.${cat.key}`, { returnObjects: true }) as string[]
          return (
            <div
              key={cat.key}
              className={`skill-category ${inView ? 'visible' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="category-header">
                <i className={cat.icon} aria-hidden="true"></i>
                <h3>{t(`skills.categories.${cat.key}`)}</h3>
              </div>
              <div className="skills-grid">
                {Array.isArray(items) && items.map((skill, i) => (
                  <div
                    key={i}
                    className="skill-badge"
                    style={{ animationDelay: `${(idx * 0.1) + (i * 0.05)}s` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
