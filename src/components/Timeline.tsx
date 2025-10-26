import { useEffect, useRef } from 'react'
interface Item { 
	year: string
	text: string
	description?: string
	skills?: string[]
	img?: string
}

export default function Timeline({ items }:{ items: Item[] }){
	const ref = useRef<HTMLDivElement|null>(null)

	useEffect(()=>{
		const el = ref.current; if(!el) return
		const observer = new IntersectionObserver(entries =>{
			entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show') })
		},{ threshold:0.2 })
		el.querySelectorAll('.container').forEach(c=> observer.observe(c))
		return ()=> observer.disconnect()
	},[])

	return (
		<div className="timeline" ref={ref}>
			{items.map((it,i)=>(
				<div key={it.year+ i} className={`container ${i%2? 'right':'left'}`}>
					<div className="content">
						<h2>{it.year}</h2>
						<h3>{it.text}</h3>
						{it.description && <p className="timeline-description">{it.description}</p>}
						{it.skills && it.skills.length > 0 && (
							<div className="timeline-skills">
								{it.skills.map((skill, idx) => (
									<span key={idx} className="timeline-skill-badge">{skill}</span>
								))}
							</div>
						)}
						{it.img && <img src={it.img} alt={it.year}/>}        
					</div>
				</div>
			))}
		</div>
	)
}
