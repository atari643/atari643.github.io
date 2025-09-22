import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

interface NodeData { key:string; label:string }
interface Props { nodes: NodeData[]; active?: string|null }

export default function ProjectsConstellation({ nodes, active }: Props){
  const ref = useRef<HTMLDivElement|null>(null)
  useEffect(()=>{
    const el = ref.current; if(!el || !nodes.length) return
    const reduced = prefersReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.z = 14
  const renderer = new THREE.WebGLRenderer({ antialias:!isMobile, alpha:true })
  renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio,2))
    const size = Math.min(520, el.clientWidth)
    renderer.setSize(size, size*.62)
    el.appendChild(renderer.domElement)

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#6366f1'
    const accentAlt = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-alt').trim() || '#ec4899'

    const radius = 6
    const group = new THREE.Group()
    scene.add(group)
  const nodeGeo = new THREE.SphereGeometry(.38, isMobile? 8:12, isMobile? 8:12) // Reduced segments
  const activeGeo = new THREE.SphereGeometry(.55, isMobile? 10:16, isMobile? 10:16) // Reduced segments
    const edgeMat = new THREE.LineBasicMaterial({ color:'#ffffff', transparent:true, opacity:.22 })
    const baseMat = new THREE.MeshBasicMaterial({ color:accent, transparent:true, opacity:.8 })
    const activeMat = new THREE.MeshBasicMaterial({ color:accentAlt, transparent:true, opacity:1 })

    // Pre-create materials to avoid recreation
    const baseMats = new Map<string, THREE.MeshBasicMaterial>()
    const activeMats = new Map<string, THREE.MeshBasicMaterial>()

    interface NodeMesh { mesh: THREE.Mesh; data: NodeData; angle:number }
    const nodeMeshes: NodeMesh[] = []
    nodes.forEach((n,i)=>{
      const angle = (i / nodes.length) * Math.PI * 2
      const isActive = active && n.key===active
      const geo = isActive ? activeGeo : nodeGeo
      
      // Reuse materials
      let mat: THREE.MeshBasicMaterial
      if(isActive) {
        if(!activeMats.has(n.key)) {
          activeMats.set(n.key, activeMat.clone())
        }
        mat = activeMats.get(n.key)!
      } else {
        if(!baseMats.has(n.key)) {
          baseMats.set(n.key, baseMat.clone())
        }
        mat = baseMats.get(n.key)!
      }
      
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(Math.cos(angle)*radius, Math.sin(angle)*radius*0.62, 0)
      mesh.userData.label = n.label
      group.add(mesh)
      nodeMeshes.push({ mesh, data:n, angle })
    })

    if(nodes.length>1){
      // Further reduce connections for better performance
      const maxEdges = isMobile ? 8 : 20
      let edges = 0
      for(let i=0;i<nodes.length && edges<maxEdges;i++){
        for(let j=i+1;j<nodes.length && edges<maxEdges;j++){
          // Only create connections between nearby nodes
          if(Math.abs(i-j) <= 2 || Math.random() < 0.3) {
            const a = nodeMeshes[i].mesh.position
            const b = nodeMeshes[j].mesh.position
            const geo = new THREE.BufferGeometry().setFromPoints([a.clone(), b.clone()])
            const line = new THREE.Line(geo, edgeMat.clone())
            ;(line.material as THREE.LineBasicMaterial).opacity = .06 + Math.random()*0.12
            group.add(line)
            edges++
          }
        }
      }
    }

    const pGeo = new THREE.BufferGeometry()
  const pCount = isMobile ? 60 : 100 // Reduced particle count
    const pPos = new Float32Array(pCount*3)
    for(let i=0;i<pCount;i++){
      const i3=i*3
      const r = Math.random()*radius*0.9
      const a = Math.random()*Math.PI*2
      const y = (Math.random()-0.5)*radius*0.8
      pPos[i3] = Math.cos(a)*r
      pPos[i3+1] = y
      pPos[i3+2] = Math.sin(a)*r*0.2
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos,3))
    // Points désactivés pour éviter les carrés visibles
    /*
    const pMat = new THREE.PointsMaterial({ size:.05, color:'#ffffff', transparent:true, opacity:.2 })
    const pts = new THREE.Points(pGeo,pMat)
    scene.add(pts)
    */

    let raf=0, t=0, running=true, lastTime=0
    const animate=(currentTime:number=0)=>{
      if(!running) return
      
      // Limit to 30fps for better performance
      if(currentTime - lastTime < 33.33) {
        if(!reduced) raf=requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime
      
      t+= isMobile? 0.002:0.003 // Reduced animation speed
      if(!reduced){
        group.rotation.z += isMobile? 0.0005:0.0008 // Reduced rotation speed
        // pts.rotation.y += isMobile? 0.0003:0.0005 // Points désactivés
        
        // Only animate active node, and with less frequency
        if(active && Math.floor(t*10) % 3 === 0) {
          nodeMeshes.forEach(nm=>{
            if(nm.data.key===active){
              const s = 1 + Math.sin(t*2)*(isMobile? 0.04:0.06) // Reduced scale animation
              nm.mesh.scale.setScalar(s)
            }
          })
        }
      }
      renderer.render(scene,camera)
      if(!reduced) raf=requestAnimationFrame(animate)
    }
    animate()
    const onVis=()=>{ running = !document.hidden; if(running && !reduced){ raf=requestAnimationFrame(animate) } }
    document.addEventListener('visibilitychange', onVis)
    const onResize=()=>{ const w=Math.min(520, el.clientWidth); renderer.setSize(w, w*.62) }
    window.addEventListener('resize', onResize)
    return ()=>{ running=false; cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('resize', onResize); pGeo.dispose(); nodeGeo.dispose(); activeGeo.dispose(); renderer.dispose(); el.removeChild(renderer.domElement) }
  },[nodes, active])
  return <div ref={ref} className="projects-constellation" aria-hidden="true" />
}
