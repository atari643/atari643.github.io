import { useTranslation } from 'react-i18next'
import { useEffect, useState, useCallback } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import VideoSection from './components/VideoSection'
import ActivitySection from './components/ActivitySection'
import CareerSection from './components/CareerSection'
import IntlSection from './components/IntlSection'
import EngagementSection from './components/EngagementSection'
import Mentors from './components/Mentors'
import LanguageSwitcher from './components/LanguageSwitcher'
import ContactBar from './components/ContactBar'
import SectionDivider from './components/SectionDivider'

export default function App(){
  const { i18n, t } = useTranslation()
  const [theme, setTheme] = useState<'dark'|'light'>(()=> (localStorage.getItem('theme')==='light'? 'light':'dark'))

  // Apply theme to body
  useEffect(()=>{ document.body.dataset.theme = theme; localStorage.setItem('theme', theme) },[theme])
  const toggleTheme = useCallback(()=> setTheme(t=> t==='dark'? 'light':'dark'),[])

  // Sync html lang
  useEffect(()=>{ document.documentElement.lang = i18n.language },[i18n.language])

  // Legacy-like etoile animation
  useEffect(() => {
    const top = document.querySelector('.Top') as HTMLElement | null
    const bottom = document.querySelector('.Bottom') as HTMLElement | null
    const right = document.querySelector('.Right') as HTMLElement | null
    const left = document.querySelector('.Left') as HTMLElement | null
    if(!top || !bottom || !right || !left) return
    let n = 0, r = 0
    const id = window.setInterval(() => {
      top.style.paddingLeft = n + '%'
      bottom.style.paddingLeft = n + '%'
      left.style.paddingBottom = r + '%'
      right.style.paddingTop = r + '%'
      if(n < 90) n += 0.5; else window.clearInterval(id)
      if(r < 30) r += 0.17
    }, 16)
    return () => window.clearInterval(id)
  }, [])

  return (
  <div className="app-shell">
      <a href="#main" className="skip-link">{t('access.skip','Aller au contenu')}</a>
  <ContactBar />
  <LanguageSwitcher />

  <main id="main">
  <Hero />
    <SectionDivider />
      <section id="Cursus">
        <h1 className="section-title"><span className="accent-gradient">{t('nav.cursus')}</span></h1>
        <Timeline items={(t('timeline.cursus',{ returnObjects:true }) as any[]).map((o,i)=>({ year:o.year, text:o.text }))} />
      </section>
    <SectionDivider variant="glow" />
    <Projects />
    <SectionDivider variant="dots" />
  <VideoSection />
  <Mentors />
  <ActivitySection />
  <CareerSection />
  <IntlSection />
  <EngagementSection />
  </main>
    </div>
  )
}
