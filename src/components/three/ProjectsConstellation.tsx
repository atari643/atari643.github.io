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
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.z = 14
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    const size = Math.min(520, el.clientWidth)
    renderer.setSize(size, size*.62)
    el.appendChild(renderer.domElement)

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#6366f1'
    const accentAlt = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-alt').trim() || '#ec4899'

    const radius = 6
    const group = new THREE.Group()
    scene.add(group)
    const nodeGeo = new THREE.SphereGeometry(.38, 18, 18)
    const activeGeo = new THREE.SphereGeometry(.55, 22, 22)
    const edgeMat = new THREE.LineBasicMaterial({ color:'#ffffff', transparent:true, opacity:.22 })
    const baseMat = new THREE.MeshBasicMaterial({ color:accent, transparent:true, opacity:.8 })
    const activeMat = new THREE.MeshBasicMaterial({ color:accentAlt, transparent:true, opacity:1 })

    interface NodeMesh { mesh: THREE.Mesh; data: NodeData; angle:number }
    const nodeMeshes: NodeMesh[] = []
    nodes.forEach((n,i)=>{
      const angle = (i / nodes.length) * Math.PI * 2
      const geo = (active && n.key===active)? activeGeo : nodeGeo
      const mat = (active && n.key===active)? activeMat : baseMat
      const mesh = new THREE.Mesh(geo, mat.clone())
      mesh.position.set(Math.cos(angle)*radius, Math.sin(angle)*radius*0.62, 0)
      mesh.userData.label = n.label
      group.add(mesh)
      nodeMeshes.push({ mesh, data:n, angle })
    })

    if(nodes.length>1){
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const a = nodeMeshes[i].mesh.position
          const b = nodeMeshes[j].mesh.position
          const geo = new THREE.BufferGeometry().setFromPoints([a.clone(), b.clone()])
          const line = new THREE.Line(geo, edgeMat.clone())
          ;(line.material as THREE.LineBasicMaterial).opacity = .09 + Math.random()*0.18
          group.add(line)
        }
      }
    }

    const pGeo = new THREE.BufferGeometry()
    const pCount = 160
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
    const pMat = new THREE.PointsMaterial({ size:.12, color:'#ffffff', transparent:true, opacity:.7 })
    const pts = new THREE.Points(pGeo,pMat)
    scene.add(pts)

    let raf=0, t=0, running=true
    const animate=()=>{
      if(!running) return
      t+=0.006
      if(!reduced){
        group.rotation.z += 0.0015
        pts.rotation.y += 0.0008
        nodeMeshes.forEach(nm=>{
          if(active && nm.data.key===active){
            const s = 1 + Math.sin(t*3)*0.08
            nm.mesh.scale.setScalar(s)
          }
        })
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
