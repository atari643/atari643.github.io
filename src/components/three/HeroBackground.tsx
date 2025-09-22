import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

/** Subtle animated star / particle field for hero header */
export default function HeroBackground(){
  const mountRef = useRef<HTMLDivElement | null>(null)
  const [theme, setTheme] = useState(() => document.body.getAttribute('data-theme') || 'dark')
  
  // Observer pour détecter les changements de thème
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setTheme(document.body.getAttribute('data-theme') || 'dark')
        }
      })
    })
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
    
    return () => observer.disconnect()
  }, [])
  
  useEffect(()=>{
    const mount = mountRef.current
    if(!mount) return
    
    // Détecter le thème actuel
    const isLightTheme = theme === 'light'
    
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 42
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    // Stars - couleurs adaptées au thème
    const starCount = 1600
    const positions = new Float32Array(starCount * 3)
    for(let i=0;i<starCount;i++){
      const i3 = i*3
      positions[i3+0] = (Math.random()-0.5)*160
      positions[i3+1] = (Math.random()-0.5)*160
      positions[i3+2] = (Math.random()-0.5)*160
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
    
    // Couleurs adaptées au thème
    const starColor = isLightTheme ? '#64748b' : '#ffffff'
    const starOpacity = isLightTheme ? 0.3 : 0.85
    const material = new THREE.PointsMaterial({ 
      size: .8, 
      sizeAttenuation:true, 
      color: new THREE.Color(starColor), 
      transparent:true, 
      opacity: starOpacity 
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Particules interactives centrales désactivées pour éviter les carrés
    const interactiveGroup = new THREE.Group()
    // Commenté pour éviter les carrés bleus
    /*
    const miniCount = 30
    const miniPositions = new Float32Array(miniCount*3)
    for(let i=0;i<miniCount;i++){
      const i3=i*3
      miniPositions[i3] = (Math.random()-0.5)*12
      miniPositions[i3+1] = (Math.random()-0.5)*6
      miniPositions[i3+2] = (Math.random()-0.5)*12
    }
    const miniGeo = new THREE.BufferGeometry()
    miniGeo.setAttribute('position', new THREE.BufferAttribute(miniPositions,3))
    
    const miniColor = isLightTheme ? '#3b82f6' : '#8ab4ff'
    const miniOpacity = isLightTheme ? 0.1 : 0.3
    const miniMat = new THREE.PointsMaterial({ 
      size: 0.8,
      sizeAttenuation:true, 
      color: miniColor, 
      transparent:true, 
      opacity: miniOpacity 
    })
    const miniPoints = new THREE.Points(miniGeo, miniMat)
    interactiveGroup.add(miniPoints)
    */
    scene.add(interactiveGroup)

    let targetRotX = 0, targetRotY = 0
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      const x = ((e.clientX - rect.left)/rect.width)*2 - 1
      const y = ((e.clientY - rect.top)/rect.height)*2 - 1
      targetRotY = x * 0.25
      targetRotX = y * 0.2
    }
    mount.addEventListener('pointermove', onPointerMove)

    // Light faint gradient plane for depth tint - adapté au thème
    const planeGeo = new THREE.PlaneGeometry(400,400,1,1)
    const planeColor = isLightTheme ? 0xf1f5f9 : 0x111623
    const planeOpacity = isLightTheme ? 0.2 : 0.35
    const planeMat = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color(planeColor), 
      transparent:true, 
      opacity: planeOpacity 
    })
    const plane = new THREE.Mesh(planeGeo, planeMat)
    plane.position.z = -120
    scene.add(plane)

    let frame = 0, raf = 0, running = true
    const reduced = prefersReducedMotion()
    const animate = () => {
      if(!running) return
      frame++
      const t = frame * 0.0005
      if(!reduced){
        points.rotation.y = t * 2
        points.rotation.x = Math.sin(t)*0.15
        interactiveGroup.rotation.y += (targetRotY - interactiveGroup.rotation.y)*0.04
        interactiveGroup.rotation.x += (targetRotX - interactiveGroup.rotation.x)*0.04
      }
      renderer.render(scene,camera)
      if(!reduced) raf = requestAnimationFrame(animate)
    }
    animate()

    const onVis = () => { running = !document.hidden; if(running && !reduced){ raf = requestAnimationFrame(animate) } }
    document.addEventListener('visibilitychange', onVis)

    const handleResize = () => {
      if(!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)
  return () => { running=false; cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVis); mount.removeEventListener('pointermove', onPointerMove); window.removeEventListener('resize', handleResize); geometry.dispose(); material.dispose(); renderer.dispose(); mount.removeChild(renderer.domElement) }
  },[theme])
  return <div className="three-hero-bg" ref={mountRef} aria-hidden="true" />
}
