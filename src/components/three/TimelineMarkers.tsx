import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

interface Props { count:number }

/**
 * Marqueurs 3D alignés dynamiquement sur les éléments DOM de la timeline.
 * L'ancien composant utilisait une hauteur estimée (count * 120) -> mauvais alignement.
 * Maintenant on mesure réellement la hauteur et les positions Y des .timeline .container.
 */
export default function TimelineMarkers({ count }:Props){
  const ref = useRef<HTMLDivElement|null>(null)
  useEffect(()=>{
    const host = ref.current; if(!host || !count) return
    const reduced = prefersReducedMotion()

    // Récupération des éléments de la timeline frères
    const wrapper = host.closest('.timeline-3d-wrapper') as HTMLElement | null
    const timeline = wrapper?.querySelector('.timeline') as HTMLElement | null
    if(!timeline) return

  const scene = new THREE.Scene()
    // Caméra orthographique en coordonnées pixels (origine en haut-gauche)
  const initialW = host.clientWidth || 90
  const size = { w: initialW, h: 10 } // h sera recalculée
    const camera = new THREE.OrthographicCamera(0, size.w, size.h, 0, -10, 10)
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    host.appendChild(renderer.domElement)

    // Couleurs
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#6366f1'
    const accentAlt = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-alt').trim() || '#ec4899'

    // Groupes
    const root = new THREE.Group()
    scene.add(root)
    const markersGroup = new THREE.Group()
    root.add(markersGroup)

    // Ligne centrale (gradient simulé via plusieurs segments transparents)
    const lineGroup = new THREE.Group()
    root.add(lineGroup)

    const markerGeo = new THREE.SphereGeometry(5, 24, 24) // rayon 5 px
    const glowGeo = new THREE.RingGeometry(8, 11, 32)

    const markers: { core: THREE.Mesh; glow: THREE.Mesh }[] = []

    function rebuild(){
      // Nettoyage précédent
      while(markersGroup.children.length) markersGroup.remove(markersGroup.children[0])
      while(lineGroup.children.length) lineGroup.remove(lineGroup.children[0])
      markers.length = 0

      const containers = Array.from(timeline.querySelectorAll('.container')) as HTMLElement[]
      if(!containers.length) return

      // Hauteur réelle
  const tlRect = timeline.getBoundingClientRect()
      const firstTop = containers[0].getBoundingClientRect().top
      const lastBottom = containers[containers.length-1].getBoundingClientRect().bottom
      const totalH = (lastBottom - firstTop) + 40 // marge

  size.h = totalH
  // Important: top doit être supérieur à bottom pour une camera orthographique THREE
  camera.top = totalH
  camera.bottom = 0
      // Recalcule largeur si CSS a changé
      const newW = host.clientWidth || size.w
      if(newW !== size.w){
        size.w = newW
        camera.right = size.w
      }
      camera.updateProjectionMatrix()
      renderer.setSize(size.w, size.h)

      // Position du host pour caler en CSS
      host.style.height = `${totalH}px`

      // Ligne: segments avec opacité variable pour léger gradient
      const segCount = Math.ceil(totalH / 34)
      for(let i=0;i<segCount;i++){
        const segHeight = 28
        const y = (i/segCount) * totalH
        const mat = new THREE.MeshBasicMaterial({ color: i%2? accentAlt:accent, transparent:true, opacity:.18 + (i%2)*0.08 })
  const geo = new THREE.PlaneGeometry(4, segHeight)
        const m = new THREE.Mesh(geo, mat)
        m.position.set(size.w/2, y + segHeight/2, 0)
        lineGroup.add(m)
      }

      // Marqueurs alignés sur le centre vertical de chaque container
      containers.forEach((c,idx)=>{
        const r = c.getBoundingClientRect()
        const yCenter = (r.top + r.height/2) - firstTop + 20
        const baseMat = new THREE.MeshBasicMaterial({ color: accent, transparent:true, opacity:.9 })
        const core = new THREE.Mesh(markerGeo, baseMat)
        core.position.set(size.w/2, yCenter, 1)

        const glowMat = new THREE.MeshBasicMaterial({ color: accentAlt, transparent:true, opacity:.25, side:THREE.DoubleSide })
        const glow = new THREE.Mesh(glowGeo, glowMat)
        glow.rotation.x = Math.PI/2
        glow.position.set(size.w/2, yCenter, 0)

        markersGroup.add(glow)
        markersGroup.add(core)
        markers.push({ core, glow })
      })
    }

    rebuild()

    // Observateurs pour resize & mutations (si traduction change par ex.)
  const ro = new ResizeObserver(()=> rebuild())
  ro.observe(timeline)
  const hostRO = new ResizeObserver(()=> rebuild())
  hostRO.observe(host)
    const mo = new MutationObserver(()=> rebuild())
    mo.observe(timeline, { childList:true, subtree:true })

    let raf=0, t=0, running=true
    function animate(){
      if(!running) return
      t+=0.02
      if(!reduced){
        markers.forEach((m,i)=>{
          const s = 1 + Math.sin(t*1.3 + i*.55)*0.18
          m.core.scale.setScalar(s)
          ;(m.core.material as THREE.MeshBasicMaterial).opacity = .55 + (Math.sin(t + i)*0.5 + .5)*0.4
          m.glow.rotation.z = t*0.2 + i*.2
          ;(m.glow.material as THREE.MeshBasicMaterial).opacity = .18 + (Math.sin(t*1.4 + i)*0.5 + .5)*0.22
        })
        // lineGroup.rotation.z = Math.sin(t*0.05)*0.015 // Désactivé pour éviter le tangage
      }
      renderer.render(scene,camera)
      if(!reduced) raf = requestAnimationFrame(animate)
    }
    animate()

    const onVis = () => { running = !document.hidden; if(running && !reduced){ raf=requestAnimationFrame(animate) } }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running=false
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
  ro.disconnect(); hostRO.disconnect(); mo.disconnect()
      renderer.dispose()
      host.removeChild(renderer.domElement)
      markerGeo.dispose(); glowGeo.dispose()
    }
  },[count])
  return <div ref={ref} className="timeline-markers" aria-hidden="true" />
}
