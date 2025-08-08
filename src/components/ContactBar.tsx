import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export default function ContactBar(){
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [copiedMsg, setCopiedMsg] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement|null>(null)
  const toggleBtnRef = useRef<HTMLButtonElement|null>(null)

  const close = useCallback(()=> setOpen(false),[])

  useEffect(()=>{
    if(!open) return
    const onKey = (e:KeyboardEvent)=>{ if(e.key==='Escape'){ close(); toggleBtnRef.current?.focus() } }
    window.addEventListener('keydown',onKey)
    return ()=> window.removeEventListener('keydown',onKey)
  },[open, close])

  useEffect(()=>{
    if(!open) return
    const onDown = (e:MouseEvent)=>{
      if(panelRef.current && !panelRef.current.contains(e.target as Node) && toggleBtnRef.current && !toggleBtnRef.current.contains(e.target as Node)){
        close()
      }
    }
    window.addEventListener('mousedown', onDown)
    return ()=> window.removeEventListener('mousedown', onDown)
  },[open, close])

  useEffect(()=>{ if(copiedMsg){ const id = setTimeout(()=> setCopiedMsg(null), 2000); return ()=> clearTimeout(id) } },[copiedMsg])

  const handleCopyEmail = () => {
    const email = 'quentin.artigala@gmail.com'
    if(navigator.clipboard?.writeText){
      navigator.clipboard.writeText(email).then(()=> setCopiedMsg(t('contact.copied','Copié !')))
        .catch(()=> fallback())
    } else fallback()
    function fallback(){
      try { const ok = window.prompt(t('contact.copyEmail','Copier l\'email'), email); if(ok!==null) setCopiedMsg(t('contact.copied','Copié !')) } catch { /* ignore */ }
    }
  }

  return (
    <>
      <button
        ref={toggleBtnRef}
        id="list"
        className={open? 'decendre':'remonte'}
        aria-expanded={open}
        aria-controls="contact-panel"
        aria-label={open? t('contact.closePanel','Fermer le panneau de contact'): t('contact.openPanel','Ouvrir le panneau de contact')}
        onClick={()=> setOpen(o=> !o)}
      >
        <i className={`icofont-arrow-down ${open? 'icofont-rotate-180':''}`}></i>{t('contact.toggle','Contact')}
      </button>
      <div id="contact-panel" className="contact" style={{display: open? 'block':'none'}}>
        <div ref={panelRef} className={`lien ${open? 'dérouler':'enroule'}`} role="group" aria-label={t('contact.toggle','Contact')}>
          <div id="mail" className="contact-item">
            <a
              href="mailto:quentin.artigala@gmail.com"
              className="contact-btn"
              data-kind="email"
              aria-label={`${t('contact.email','Email')} : quentin.artigala@gmail.com`}
              rel="noopener noreferrer"
            >
              <i className="icofont-ui-email" aria-hidden="true"></i>
              <span>{t('contact.email','Email')}</span>
            </a>
            <button
              type="button"
              className={`copy-action${copiedMsg? ' copied':''}`}
              onClick={handleCopyEmail}
              aria-label={t('contact.copyEmail','Copier l\'email')}
              data-copied={t('contact.copied','Copié !')}
            >
              <i className="icofont-copy" aria-hidden="true"></i>
              <span className="visually-hidden">{t('contact.copyEmail','Copier l\'email')}</span>
            </button>
          </div>
          <div id="Git" className="contact-item">
            <a
              href="https://github.com/atari643"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
              data-kind="github"
              aria-label={t('contact.github','GitHub')}
            >
              <img src="/images/github-mark.png" alt="GitHub" />
              <span>{t('contact.github','GitHub')}</span>
            </a>
          </div>
          <div id="linkedin" className="contact-item">
            <a
              href="https://www.linkedin.com/in/quentin-artigala-182a53266"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
              data-kind="linkedin"
              aria-label={t('contact.linkedin','LinkedIn')}
            >
              <i className="icofont-linkedin" aria-hidden="true"></i>
              <span>{t('contact.linkedin','LinkedIn')}</span>
            </a>
          </div>
          <div aria-live="polite" aria-atomic="true" className="visually-hidden contact-announce">{copiedMsg || ''}</div>
        </div>
      </div>
    </>
  )
}
