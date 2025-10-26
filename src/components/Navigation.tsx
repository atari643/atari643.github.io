import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      // Detect active section
      const sections = ['hero', 'achievements', 'skills', 'cursus', 'career', 'projects', 'intl']
      for (const section of sections) {
        const element = document.getElementById(section === 'hero' ? 'main' : section.charAt(0).toUpperCase() + section.slice(1))
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId === 'hero' ? 'main' : sectionId.charAt(0).toUpperCase() + sectionId.slice(1))
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }

  const navItems = [
    { id: 'hero', label: 'Accueil', icon: 'icofont-home' },
    { id: 'achievements', label: t('nav.achievements'), icon: 'icofont-trophy' },
    { id: 'skills', label: t('nav.skills'), icon: 'icofont-code' },
    { id: 'cursus', label: t('nav.cursus'), icon: 'icofont-graduate' },
    { id: 'career', label: t('nav.career'), icon: 'icofont-briefcase' },
    { id: 'projects', label: t('cta.projects'), icon: 'icofont-folder-open' },
    { id: 'intl', label: t('nav.intl'), icon: 'icofont-globe' }
  ]

  return (
    <nav className={`main-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                aria-label={item.label}
              >
                <i className={item.icon} />
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
