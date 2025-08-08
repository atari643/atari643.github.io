import { useTranslation } from 'react-i18next'

export default function EngagementSection(){
  const { t } = useTranslation()
  return (
    <section id="Engagement">
      <h1 className="section-title">{t('engagement.title')}</h1>
      <div className="engagement-box">
        <p>{t('engagement.text')}</p>
        <img src="https://article-1.eu/wp-content/uploads/2017/08/logo.png" alt="Article 1" />
      </div>
    </section>
  )
}
