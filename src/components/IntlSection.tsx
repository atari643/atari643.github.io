import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'
import React, { useState } from 'react'
import { useInView } from './three/useInView'
import Globe from './three/Globe'
import CareerEvolutionPlan from './CareerEvolutionPlan'

interface IntlItem {
  year: string
  title: string
  subtitle?: string
  text: string
  image?: string
  tags?: string[]
}

export default function IntlSection(){
  const { t } = useTranslation()
  const items = t('intl.items',{ returnObjects:true }) as IntlItem[] || []
  const [activeTab, setActiveTab] = useState<'experiences' | 'cep'>('experiences')
  useReveal('#Internationalisation')
  const { ref: globeRef, inView: globeInView } = useInView<HTMLDivElement>({ threshold:.2 })
  
  return (
    <section id="Internationalisation" aria-labelledby="intl-title" className="intl-section">
      <h1 id="intl-title" className="section-title">
        <span className="accent-gradient">{t('intl.title')}</span>
      </h1>
      
      <div ref={globeRef} className="intl-globe-wrapper" aria-describedby="intl-globe-desc">
        <div className="globe-backdrop" aria-hidden="true" />
        {globeInView && <Globe markers={[
          {lat:45.4408, lon:12.3155},  // Venice (Croatia nearby)
          {lat:48.8566, lon:2.3522},   // Paris
          {lat:43.6047, lon:1.4442}    // Toulouse
        ]} />}
        <p id="intl-globe-desc" className="visually-hidden">Globe 3D décoratif indiquant quelques villes internationales.</p>
        <span className="globe-caption" aria-hidden="true">Global Experience</span>
      </div>
      
      {/* Tabs Navigation */}
      <div className="intl-tabs" role="tablist" aria-label={t('intl.tabsLabel')}>
        <button
          role="tab"
          aria-selected={activeTab === 'experiences'}
          aria-controls="intl-experiences-panel"
          onClick={() => setActiveTab('experiences')}
          className={`intl-tab ${activeTab === 'experiences' ? 'active' : ''}`}
        >
          <i className="icofont-globe" aria-hidden="true"></i>
          {t('intl.tabs.experiences')}
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'cep'}
          aria-controls="intl-cep-panel"
          onClick={() => setActiveTab('cep')}
          className={`intl-tab ${activeTab === 'cep' ? 'active' : ''}`}
        >
          <i className="icofont-rocket-alt-2" aria-hidden="true"></i>
          {t('intl.tabs.cep')}
        </button>
      </div>

      {/* Experiences Tab Content */}
      <div 
        id="intl-experiences-panel"
        role="tabpanel"
        aria-labelledby="intl-experiences-tab"
        hidden={activeTab !== 'experiences'}
        className="intl-tab-content"
      >
        <div className="intl-content">
        {items.map((item, i) => (
          <article key={i} className={`intl-card ${i%2?'reverse':''}`}>
            {item.image && (
              <div className="intl-image-wrapper">
                <div className="intl-image-badge">
                  <i className="icofont-trophy" aria-hidden="true"></i>
                </div>
                <img src={item.image} alt={item.title} className="intl-image" loading="lazy" />
              </div>
            )}
            
            <div className="intl-text">
              <div className="intl-header">
                <span className="intl-year">{item.year}</span>
                <h3 className="intl-title">{item.title}</h3>
                {item.subtitle && <p className="intl-subtitle">{item.subtitle}</p>}
              </div>
              
              <div className="intl-description">
                {item.text.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h4 key={idx} className="intl-subheading">{paragraph.replace(/\*\*/g, '')}</h4>
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={idx} className="intl-list">
                        {paragraph.split('\n').filter(l => l.startsWith('- ')).map((line, li) => (
                          <li key={li}>
                            <i className="icofont-check-circled" aria-hidden="true"></i>
                            {line.substring(2)}
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return <p key={idx}>{paragraph}</p>
                })}
              </div>
              
              {item.tags && item.tags.length > 0 && (
                <div className="intl-tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
        </div>
      </div>

      {/* CEP Tab Content */}
      <div 
        id="intl-cep-panel"
        role="tabpanel"
        aria-labelledby="intl-cep-tab"
        hidden={activeTab !== 'cep'}
        className="intl-tab-content"
      >
        <CareerEvolutionPlan />
      </div>
    </section>
  )
}
