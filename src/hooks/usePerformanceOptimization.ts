import { useEffect } from 'react'

export function usePerformanceOptimization() {
  useEffect(() => {
    // Reduce animations based on connection speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        document.documentElement.style.setProperty('--animation-duration-scale', '0.5')
      }
    }

    // Pause animations when page is not visible
    const handleVisibilityChange = () => {
      const shouldPause = document.hidden
      document.documentElement.style.setProperty(
        '--animation-play-state', 
        shouldPause ? 'paused' : 'running'
      )
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Reduce motion for users with motion sensitivity
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration-scale', '0.1')
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
}
