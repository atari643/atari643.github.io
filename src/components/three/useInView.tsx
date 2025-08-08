import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit){
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(()=>{
    if(!ref.current || inView) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e=>{ if(e.isIntersecting){ setInView(true); obs.disconnect() } })
    }, options || { threshold:.1 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  },[options, inView])
  return { ref, inView }
}

export default useInView
