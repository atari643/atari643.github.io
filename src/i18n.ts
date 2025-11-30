import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './locales/fr.json'
import en from './locales/en.json'

// Récupérer la langue stockée dans localStorage avant l'initialisation
const getStoredLanguage = (): string => {
	try {
		const stored = localStorage.getItem('lang')
		if (stored && ['fr', 'en'].includes(stored)) {
			return stored
		}
	} catch { /* ignore */ }
	return 'fr' // langue par défaut
}

if(!i18n.isInitialized){
	i18n
		.use(initReactI18next)
		.init({
			resources:{ fr:{ translation: fr }, en:{ translation: en } },
			lng: getStoredLanguage(),
			fallbackLng: 'en',
			interpolation:{ escapeValue:false }
		})
}

export default i18n
