import { useTranslation } from 'react-i18next'
import React from 'react'
import HeroBackground from './three/HeroBackground'

export default function Hero(){
  const { t, i18n } = useTranslation()
  const cvHref = i18n.language === 'fr' ? '/pdf/ENSEEIHT_CV_Quentin_Artigala_FR.pdf' : '/pdf/ENSEEIHT-CV-Quentin-Artigala-EN.pdf'
  return (
    <header className="hero" id="Presentation" role="banner">
  <HeroBackground />
      <div className="animation" aria-hidden="true">
        <div className="etoile Top"></div>
        <div className="etoile Right"></div>
        <div className="etoile Left"></div>
        <div className="etoile Bottom"></div>
      </div>
      <div className="hero__inner">
        <div className="hero__media">
          <div className="portrait-wrap">
            <img className="profile" src="./images/profil.jpg" alt="Portrait Quentin Artigala" loading="lazy" />
            <span className="portrait-ring" aria-hidden="true"></span>
          </div>
        </div>
        <div className="hero__content info">
          <h1 className="headline" data-animate="fade">
            <span className="headline__welcome accent-gradient">{t('welcome')}</span>
            <span className="headline__name">{t('name')}</span>
          </h1>
          <p className="intro" data-animate="fade-delay">{t('intro')}</p>
          <nav className="Acess" aria-label="Navigation rapide">
            <a className="a-btn primary" href="#Experience">{t('nav.experience')}</a>
            <a className="a-btn" href="#Cursus">{t('nav.cursus')}</a>
            <a className="a-btn" href="#activites">{t('nav.activities')}</a>
            <a className="a-btn" href="#intership">{t('nav.internships')}</a>
            <a className="a-btn" href="#Internationalisation">{t('nav.intl')}</a>
            <a className="a-btn outline" href={cvHref} target="_blank" rel="noreferrer">CV</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
