import { useTranslation } from 'react-i18next'
import React from 'react'

interface Aspiration {
  fields: string
  goal: string
  marketContext: string[]
}

interface Driver {
  icon: string
  label: string
}

interface TimelineStep {
  title: string
  description: string
}

export default function CareerEvolutionPlan() {
  const { t } = useTranslation()

  return (
    <>
    <div className="cep-container">
      <h2 className="cep-title">{t('cep.title')}</h2>
      
      <div className="cep-content-area">
        
        {/* Aspirations Box */}
        <div className="cep-box cep-aspirations">
          <h3>{t('cep.aspirations.title')}</h3>
          <p><strong>{t('cep.aspirations.fieldsLabel')}:</strong> {t('cep.aspirations.fields')}</p>
          <p><strong>{t('cep.aspirations.goalLabel')}:</strong> {t('cep.aspirations.goal')}</p>
          
          <div className="cep-sources">
            <p><strong>{t('cep.aspirations.marketContextLabel')}:</strong></p>
            <ul>
              {(t('cep.aspirations.marketContext', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Drivers Box */}
        <div className="cep-box cep-drivers">
          <h3>{t('cep.drivers.title')}</h3>
          <ul className="cep-drivers-list">
            {(t('cep.drivers.list', { returnObjects: true }) as Driver[]).map((driver, idx) => (
              <li key={idx}>
                <i className={driver.icon} aria-hidden="true"></i>
                {driver.label}
              </li>
            ))}
          </ul>
          <p>{t('cep.drivers.description')}</p>
        </div>

        {/* Values Box */}
        <div className="cep-box cep-values">
          <h3>{t('cep.values.title')}</h3>
          <ul className="cep-values-list">
            {(t('cep.values.list', { returnObjects: true }) as string[]).map((value, idx) => (
              <li key={idx}>{value}</li>
            ))}
          </ul>
        </div>

        {/* Roadmap Box */}
        <div className="cep-roadmap">
          <h3>{t('cep.roadmap.title')}</h3>
          <div className="cep-timeline-layout">
            <div className="cep-timeline-line" aria-hidden="true"></div>
            {(t('cep.roadmap.timeline', { returnObjects: true }) as TimelineStep[]).map((step, idx) => (
              <div key={idx} className="cep-timeline-item">
                <div className="cep-content-wrapper">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>

    {/* Additional Context Section */}
    <div className="cep-additional-context">
      <div className="cep-context-section">
        <h3 className="cep-context-title">
          <i className="fa-solid fa-chart-line" aria-hidden="true"></i>
          {t('cep.context.marketTitle')}
        </h3>
        <div className="cep-context-content">
          {(t('cep.context.market', { returnObjects: true }) as string[]).map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>
      </div>

      <div className="cep-context-section">
        <h3 className="cep-context-title">
          <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
          {t('cep.context.whyTitle')}
        </h3>
        <div className="cep-context-content">
          <ul className="cep-context-list">
            {(t('cep.context.why', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="cep-context-section cep-references">
        <h3 className="cep-context-title">
          <i className="fa-solid fa-book" aria-hidden="true"></i>
          {t('cep.context.referencesTitle')}
        </h3>
        <div className="cep-context-content">
          <ol className="cep-references-list">
            {(t('cep.context.references', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
    </>
  )
}
