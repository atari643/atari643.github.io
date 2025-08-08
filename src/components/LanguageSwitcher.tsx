import { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Language switcher button group (FR / EN)
 * - Persists choice in localStorage (key: lang)
 * - Highlights active language
 * - Accessible (keyboard + aria)
 */
export default function LanguageSwitcher(){
  const { i18n } = useTranslation()

  // Load persisted language once
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang')
      if(stored && ['fr','en'].indexOf(stored) !== -1 && stored !== i18n.language){
        i18n.changeLanguage(stored)
      }
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLang = useCallback((lng:string) => {
    if(lng === i18n.language) return
    i18n.changeLanguage(lng)
    try { localStorage.setItem('lang', lng) } catch {/* ignore */}
  }, [i18n])

  return (
    <div className="lang-switcher" role="group" aria-label="Language selector">
      {(['fr','en'] as const).map(code => {
        const active = i18n.language === code
        return (
          <button
            key={code}
            type="button"
            className={active ? 'active' : ''}
            aria-pressed={active}
            aria-current={active ? 'true':undefined}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
