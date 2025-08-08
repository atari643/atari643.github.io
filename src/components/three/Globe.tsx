import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

interface Marker { lat:number; lon:number }
interface GlobeProps { markers?: Marker[]; arcs?: boolean }

function latLonToVec3(lat:number, lon:number, r:number){
  const phi = (90 - lat) * (Math.PI/180)
  const theta = (lon + 180) * (Math.PI/180)
  const x = -r * Math.sin(phi) * Math.cos(theta)
  const z = r * Math.sin(phi) * Math.sin(theta)
  const y = r * Math.cos(phi)
  return new THREE.Vector3(x,y,z)
}

export default function Globe({ markers = [], arcs = true }: GlobeProps){
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(()=>{
    const el = ref.current
    if(!el) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0,0,5.2)
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

    // Responsive taille carré basé sur conteneur
    function resize(){
      const s = Math.min(360, el.clientWidth || 260)
      renderer.setSize(s,s)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }
    resize()
    el.appendChild(renderer.domElement)

    const gradientTex = new THREE.CanvasTexture((()=>{
      const c=document.createElement('canvas'); c.width=256; c.height=256; const ctx=c.getContext('2d')!
      const g=ctx.createLinearGradient(0,0,256,256)
      g.addColorStop(0,'#1f2937'); g.addColorStop(1,'#0f172a')
      ctx.fillStyle=g; ctx.fillRect(0,0,256,256)
      return c
    })())
  const sphereMat = new THREE.MeshStandardMaterial({ map: gradientTex, wireframe:false, metalness:.2, roughness:.85, color:'#1e293b', emissive:'#111827', emissiveIntensity:.25 })
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(2,64,64), sphereMat)
    scene.add(sphere)
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(2.02,28,20)), new THREE.LineBasicMaterial({ color:'#475569', transparent:true, opacity:.35 }))
    scene.add(wire)

  const light = new THREE.DirectionalLight(0xffffff, 1.1)
  light.position.set(4,6,3)
    scene.add(light)
  scene.add(new THREE.AmbientLight(0xffffff, .48))

  // Atmosphère subtile
  const atmMat = new THREE.MeshBasicMaterial({ color:'#3b82f6', transparent:true, opacity:.12, blending:THREE.AdditiveBlending })
  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2.22, 48,48), atmMat)
  scene.add(atmosphere)

    const reduced = prefersReducedMotion()
    // Markers (limités)
    const mGroup = new THREE.Group()
  const mMat = new THREE.MeshBasicMaterial({ color:'#ec4899', transparent:true, opacity:1 })
    const markerList = markers.slice(0,48)
    markerList.forEach(m=>{
      const pos = latLonToVec3(m.lat,m.lon,2.05)
  const dot = new THREE.Mesh(new THREE.SphereGeometry(.06,10,10), mMat.clone())
      dot.position.copy(pos)
      mGroup.add(dot)
    })
    scene.add(mGroup)

    // Arcs séquentiels
    let arcsGroup: THREE.Group | null = null
    if(arcs && markerList.length>1){
      arcsGroup = new THREE.Group()
      for(let i=0;i<markerList.length-1;i++){
        const a = markerList[i]
        const b = markerList[i+1]
        const va = latLonToVec3(a.lat,a.lon,2.02)
        const vb = latLonToVec3(b.lat,b.lon,2.02)
        const mid = va.clone().add(vb).multiplyScalar(.5)
        const peak = mid.clone().normalize().multiplyScalar(2.8)
        const segs = 40
        const pts: THREE.Vector3[] = []
        for(let s=0;s<=segs;s++){
          const tt = s/segs
          const p = new THREE.Vector3(
            (1-tt)*(1-tt)*va.x + 2*(1-tt)*tt*peak.x + tt*tt*vb.x,
            (1-tt)*(1-tt)*va.y + 2*(1-tt)*tt*peak.y + tt*tt*vb.y,
            (1-tt)*(1-tt)*va.z + 2*(1-tt)*tt*peak.z + tt*tt*vb.z
          )
          pts.push(p)
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        const mat = new THREE.LineBasicMaterial({ color:'#8b5cf6', transparent:true, opacity:0 })
        const line = new THREE.Line(geo, mat) as any
        line.userData.phase = Math.random()
        arcsGroup.add(line)
      }
      scene.add(arcsGroup)
    }

        let raf=0, t=0, running=true
        const animate=()=>{
          if(!running) return
          t+=0.005
          if(!reduced){
            sphere.rotation.y += 0.0022
            wire.rotation.copy(sphere.rotation)
            mGroup.rotation.copy(sphere.rotation)
            atmosphere.rotation.y = sphere.rotation.y * 1.15
            const basePulse = (Math.sin(t*2)+1)*0.5
            mGroup.children.forEach((c,i)=>{
              const pulse = 0.75 + basePulse*0.35 + Math.sin(t*4 + i)*0.04
              c.scale.setScalar(pulse)
              const mat = c.material as THREE.MeshBasicMaterial
              mat.opacity = 0.55 + basePulse*0.4
            })
            if(arcsGroup){
              arcsGroup.children.forEach((c:any)=>{
                const mat = c.material as THREE.LineBasicMaterial
                const ph = c.userData.phase || 0
                const a = (Math.sin(t*1.3 + ph*6)+1)/2
                mat.opacity = 0.12 + a*0.5
              })
            }
          }
          renderer.render(scene,camera)
          if(!reduced) raf=requestAnimationFrame(animate)
        }
        animate()
        const onVis = () => { running = !document.hidden; if(running && !reduced){ raf=requestAnimationFrame(animate) } }
        document.addEventListener('visibilitychange', onVis)
        const onResize = () => resize()
        window.addEventListener('resize', onResize)
        return ()=>{ running=false; cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); renderer.dispose(); el.removeChild(renderer.domElement); sphere.geometry.dispose(); sphereMat.dispose(); atmMat.dispose(); }
  },[markers])
  return <div className="intl-globe" ref={ref} aria-hidden="true" />
}
