import { useTranslation } from 'react-i18next'

export default function CareerEvolutionPlan() {
  const { t } = useTranslation()

  return (
    <div className="cep-container">
      <h2 className="cep-title">{t('cep.title')}</h2>
      
      <div className="cep-pdf-wrapper">
        <iframe
          src="/pdf/CEP.pdf"
          title={t('cep.title')}
          className="cep-pdf-viewer"
        />
        <a 
          href="/pdf/CEP.pdf" 
          download 
          className="cep-download-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-download" aria-hidden="true"></i>
          {t('cep.downloadPdf')}
        </a>
      </div>

      <div className="bibliography-container">
        <h3>{t('cep.bibliography.title')}</h3>
        <p className="subtitle">{t('cep.bibliography.subtitle')}</p>

        <div className="bibliography-section">
          <h4>{t('cep.bibliography.referencesTitle')}</h4>
          <ol className="references-list">
            <li>
              Grand View Research, "Quantum Computing Market Size, Share & Trends Analysis Report By Component, By Technology," 2024. [Online]. Available: <a href="https://www.grandviewresearch.com/industry-analysis/quantum-computing-market" className="reference-link" target="_blank" rel="noopener noreferrer">https://www.grandviewresearch.com/industry-analysis/quantum-computing-market</a>
            </li>
            <li>
              Market Research Future, "Quantum Computing Aerospace & Defense Market Analysis 2025-2035," 2025. [Online]. Available: <a href="https://www.marketresearchfuture.com/reports/quantum-computing-aerospace-defense-market-7788" className="reference-link" target="_blank" rel="noopener noreferrer">https://www.marketresearchfuture.com/reports/quantum-computing-aerospace-defense-market-7788</a>
            </li>
            <li>
              Airbus, BMW Group, and Quantinuum, "Quantum Computing for Industrial Applications: Fuel Cell Catalyst Modeling," Aug. 2023. [Online]. Available: <a href="https://www.quantinuum.com/press-releases/bmw-group-airbus-and-quantinuum-collaborate-to-fast-track-sustainable-mobility-research-using-cutting-edge-quantum-computers" className="reference-link" target="_blank" rel="noopener noreferrer">https://www.quantinuum.com/press-releases/bmw-group-airbus-and-quantinuum-collaborate-to-fast-track-sustainable-mobility-research-using-cutting-edge-quantum-computers</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
