import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/** Decorative rotating wireframe orb */
export default function ProjectsOrb(){
  const wrapRef = useRef<HTMLDivElement | null>(null)
  useEffect(()=>{
    const wrap = wrapRef.current
    if(!wrap) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.z = 8
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    const size = Math.min(420, wrap.clientWidth)
    renderer.setSize(size,size)
    wrap.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)
    const accentA = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#6366f1'
    const accentB = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-alt').trim() || '#ec4899'
    const mat1 = new THREE.MeshBasicMaterial({ color: accentA, wireframe:true, transparent:true, opacity:.5 })
    const mat2 = new THREE.MeshBasicMaterial({ color: accentB, wireframe:true, transparent:true, opacity:.35 })
    const geo1 = new THREE.TorusKnotGeometry(2.4, .55, 128, 16, 2, 5)
    const geo2 = new THREE.IcosahedronGeometry(1.8,1)
    const mesh1 = new THREE.Mesh(geo1, mat1)
    const mesh2 = new THREE.Mesh(geo2, mat2)
    group.add(mesh1)
    group.add(mesh2)

    // Subtle particles shell
    const pGeo = new THREE.BufferGeometry()
    const pCount = 900
    const pos = new Float32Array(pCount*3)
    for(let i=0;i<pCount;i++){
      const i3=i*3
      const r = 4 + Math.random()*2.5
      const theta = Math.random()*Math.PI*2
      const phi = Math.acos(2*Math.random()-1)
      pos[i3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i3+1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i3+2] = r * Math.cos(phi)
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos,3))
    const pMat = new THREE.PointsMaterial({ size:.04, color:'#ffffff', transparent:true, opacity:.65 })
    const pts = new THREE.Points(pGeo,pMat)
    scene.add(pts)

    let raf=0, t=0
    const animate=()=>{
      t+=0.006
      mesh1.rotation.x += 0.003
      mesh1.rotation.y += 0.004
      mesh2.rotation.x -= 0.002
      mesh2.rotation.y -= 0.003
      group.rotation.z = Math.sin(t*.4)*.4
      pts.rotation.y += 0.0008
      renderer.render(scene,camera)
      raf=requestAnimationFrame(animate)
    }
    animate()

    const handleResize=()=>{
      const s = Math.min(420, wrap.clientWidth)
      renderer.setSize(s,s)
    }
    window.addEventListener('resize', handleResize)
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', handleResize); geo1.dispose(); geo2.dispose(); pGeo.dispose(); renderer.dispose(); wrap.removeChild(renderer.domElement) }
  },[])
  return <div className="projects-orb" ref={wrapRef} aria-hidden="true" />
}
