import { useEffect } from 'react'

export function useReveal(rootSelector?: string){
  useEffect(()=>{
    const rootEl = rootSelector ? document.querySelector(rootSelector) ?? document : document
    const containers = rootEl.querySelectorAll?.('.timeline .container') || []
    if(!containers.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('show')
          obs.unobserve(e.target)
        }
      })
    },{ threshold: .15 })
    containers.forEach(el=>obs.observe(el))
    return ()=> obs.disconnect()
  },[rootSelector])
}

export default useReveal
