import React from 'react'

interface SectionDividerProps {
  variant?: 'gradient' | 'glow' | 'dots'
  ariaLabel?: string
}

// Decorative section divider (accessible: aria-hidden unless ariaLabel provided)
export default function SectionDivider({ variant='gradient', ariaLabel }: SectionDividerProps){
  return (
    <div
      className={`section-divider section-divider--${variant}`}
      role={ariaLabel? 'separator': undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel? undefined : 'true'}
    >
      <span className="sd-line left" />
      <span className="sd-core" />
      <span className="sd-line right" />
    </div>
  )
}
