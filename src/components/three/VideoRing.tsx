import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

interface Props { progress:number; playing:boolean }

export default function VideoRing({ progress, playing }:Props){
  const ref = useRef<HTMLDivElement|null>(null)
  const progRef = useRef(progress)
  progRef.current = progress
  useEffect(()=>{
    const el = ref.current; if(!el) return
    const reduced = prefersReducedMotion()
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,10)
    camera.position.z = 2
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640
  const renderer = new THREE.WebGLRenderer({ antialias:!isMobile, alpha:true })
  // Sur mobile, garder un pixelRatio à 1 pour limiter la charge GPU
  renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio,2))
    renderer.setSize(140,140)
    el.appendChild(renderer.domElement)
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#6366f1'
    const accentAlt = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-alt').trim() || '#ec4899'

    const baseMat = new THREE.MeshBasicMaterial({ color:'#1e293b', transparent:true, opacity:.55 })
    const base = new THREE.Mesh(new THREE.RingGeometry(.64,.9, 64), baseMat)
    scene.add(base)
    const progMat = new THREE.MeshBasicMaterial({ color:accent, transparent:true, opacity:1 })
    const segGeo = new THREE.RingGeometry(.64,.9, 128)
    const ring = new THREE.Mesh(segGeo, progMat)
    scene.add(ring)
    const glow = new THREE.Mesh(new THREE.RingGeometry(.92,1.05, 64), new THREE.MeshBasicMaterial({ color:accentAlt, transparent:true, opacity:.15 }))
    scene.add(glow)

    progMat.onBeforeCompile = (shader)=>{
      shader.uniforms.uProgress = { value: progRef.current }
      shader.fragmentShader = shader.fragmentShader.replace('void main() {','uniform float uProgress;\nvoid main(){')
      shader.fragmentShader = shader.fragmentShader.replace('#include <output_fragment>', `
        vec2 uv = vUv - 0.5;
        float ang = atan(uv.y, uv.x); // [-pi,pi]
        float normA = (ang + 3.14159265) / (6.2831853); // 0..1
        if(normA > uProgress) discard; 
        #include <output_fragment>
      `)
      ;(ring.material as any).userData.shader = shader
    }

    let raf=0, t=0, running=true
    const animate=()=>{
      if(!running) return
      t+=0.016
      if(!reduced){
        glow.rotation.z += 0.0025
        ring.rotation.z = -progRef.current * Math.PI*0.04
      }
      const shader = (ring.material as any).userData.shader
      if(shader){ shader.uniforms.uProgress.value = progRef.current }
      renderer.render(scene,camera)
      // Ne boucle que si la vidéo joue; sinon un seul rendu suffit
      if(playing) raf=requestAnimationFrame(animate)
    }
    animate()
    const onVis=()=>{ running=!document.hidden; if(running && playing){ raf=requestAnimationFrame(animate) } }
    document.addEventListener('visibilitychange', onVis)
    return ()=>{ running=false; cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVis); renderer.dispose(); el.removeChild(renderer.domElement) }
  },[playing])
  return <div ref={ref} className="video-ring" aria-hidden="true" />
}
