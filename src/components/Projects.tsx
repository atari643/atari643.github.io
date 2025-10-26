import { useEffect, useRef, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { useInView } from './three/useInView'
import ProjectsOrb from './three/ProjectsOrb'
import ProjectsConstellation from './three/ProjectsConstellation'

interface ProjectDetail {
  title: string
  text: string
  image?: string
  video?: string
  url?: string        // resource to download / open
  link?: string       // clickable image link
  buttonLabel?: string
  mediaWidth?: string // optional custom width (e.g., linux markdown case)
  // future: gallery?: string[]
}

interface ProjectItem {
  id: string
  image: string
  title: string
  summary: string
  details: ProjectDetail
}

// Données projets FR (legacy indexFR.js)
const projectsDataFR: Record<string, ProjectItem[]> = {
  java: [
    {
      id:'j1',
      image:'/images/java/projet-1/Code-typing-bro.png',
      title:'Projet météorologique',
      summary:'Compléter un projet en cours',
      details:{
        title:'Projet météorologique',
        image:'/images/java/projet-1/projet-odomo.png',
  text:"Dans ce projet une grande difficulté, c’était le sens de lecture des valeurs dans un tableau ou une matrice. La façon donc les valeurs sont agencées n’est pas forcément comment on aimerait les afficher. J’ai réussi à faire que pour chaque histogramme selon son ordre de lecture, les valeurs se rangent dans l’ordre attendu.\nLa lecture un tableau/matrice était essentiel dans la réalisation de ce projet",
        url:'/pdf/java/Portfolio-Quentin-java-1.pdf',
        buttonLabel:'PDF'
      }
    },
    {
      id:'j2',
      image:'/images/java/projet-2/Programming-amico.png',
      title:'Biosphère7 : jeu + IA',
      summary:'Créer une IA à partir de rien',
      details:{
        title:'Projet conception d\'un jeu et une IA',
        image:'/images/java/projet-2/projet-biosphère.png',
  text:"Le projet se nomme Biosphère7 qui est écrit en java. C’est un jeu de plateau à 15 niveaux qui permet d’effectuer différentes actions selon les règles du niveau qui se cumule. Ma contribution est la réalisation, jusqu’au niveau 11, du tableau des actions possibles selon les nouvelles règles de chaque niveau. La deuxième partie du projet a été pour moi la plus enrichissante avec l’implémentation d’une IA avec le choix de la méthode à suivre, et j’ai réussi à faire une méthode d’apprentissage par renforcement avec un algorithme QLearning (off policy). ",
        url:'/pdf/java/Portfolio-Quentin-java-2.pdf',
        buttonLabel:'PDF'
      }
    }
  ],
  csharp: [
    {
      id:'c1',
      image:'/images/Csharp/projet-1/UI-UX-team-amico.png',
      title:'Application',
      summary:"Développement d'une application",
      details:{
        title:'Projet Application',
        image:'/images/Csharp/projet-1/projet-jeux.jpg',
        text:"Dans ce projet, le défi majeur résidait dans l'association harmonieuse entre la partie visuelle et le développement des fonctionnalités. Il était primordial de retranscrire, dans le contexte virtuel en deux dimensions, les éléments et les règles d'un jeu de société classique de manière à simplifier au maximum l'expérience de jeu pour les utilisateurs. Par exemple, nous avons automatisé les aspects tels que le mélange des cartes ou le positionnement des pions, de manière à laisser aux joueurs le soin de se concentrer sur leurs choix et leurs actions.",
        url:'/pdf/C%23/Portfolio-Quentin-C-1.pdf',
        buttonLabel:'PDF'
      }
    }
  ],
  python: [
    {
      id:'p1',
      image:'/images/Python/rsk/miniature.png',
      title:'Stratégie Gardien',
      summary:'Robot : Prédiction du tir adverse',
      details:{
        title:"Programmation d'une stratégie prédictif de gardien",
        video:'/Video/Python/Gardien/Prediction.mp4',
        text:"Dans le cadre d'une compétition de robot qui joue au foot, j'ai programmé, en python, une stratégie prédictive de gardien. Le but est de prédire la trajectoire du ballon et de se placer en conséquence pour l'arrêter. En utilisant l'orientation du robot adverse le plus proche du ballon, j'ai pu prédire le seul intervalle possible où la balle pourrait aller après le tir du robot adverse. Le plus difficile a été de résoudre le cas ou si le robot adverse modifie son orientation après son tir, le gardien ne doit pas modifier sa position. Cette stratégie a aidé mon équipe de 4 joueurs à être vice-champion d'Europe de robotique.",
        url:'/Video/Python/Gardien/Prediction.mp4',
        buttonLabel:'video'
      }
    }
  ],
  web: [
    {
      id:'w1',
      image:'/images/HCJ/maquetteSite.png',
      title:'Projet web',
      summary:'Créer et respecter la maquette du site',
      details:{
        title:"Projet de création d'un site web : Cliquer sur image",
        image:'/images/HCJ/maquetteSite.png',
        link:'https://atari643.github.io/projetWeb.github.io/Projet.html',
        text:"Pour notre projet web, nous avons divisé notre temps de projet en quatre parties. La première étape concerne la réalisation du personas . Ce dernier représente le type de personne qu'on vise lors de la création de notre site web. Nous avons choisi de viser une personne étudiant dans une école de gestion qui cherche des exemples de présentation d'entreprise. Cette dernière comprenant au moins une présentation des 7 fonctions et une analyse PESTEL.\nLa deuxième partie concerne la création de la maquette de notre site.",
        url:'/pdf/web/Portfolio-Quentin-web-1.pdf',
        buttonLabel:'PDF'
      }
    },
    {
      id:'w2',
      image:'/images/HCJ/portfolio.png',
      title:'Portfolio',
      summary:'Créer un portfolio en utilisant React',
      details:{
        title:"Projet de création d'un portfolio",
        image:'/images/HCJ/portfolio.png',
        link:'https://atari643.github.io/',
        text:"Cette expérience était la création d'un portfolio pour mettre l'ensemble de mes expériences et de mes projets. J'ai utilisé les langages HTML, CSS et JavaScript pour la réalisation de ce portfolio ainsi que l'utilisation et l'apprentissage du react pour facilité la création du site et la maintenance avec l'ajout rapide de nouvelles expériences. Ainsi le projet m'a permit de progresser dans le domaine du développement web ainsi que dans la découvert de l'apprentissage en autonomie qui ma donnée envie d'apprendre d'autre framework tels que Angular ou VueJS pour pouvoir créer des sites plus facilement et plus rapidement.",
        url:'https://atari643.github.io/',
        buttonLabel:'Site web'
      }
    }
  ],
  sql: [
    {
      id:'s1',
      image:'/images/SQL/MCD.jpg',
      title:'BD Festival',
      summary:'Création d’une base de données',
      details:{
        title:'Projet Base de données pour un festival',
        image:'/images/SQL/schemaBase.jpg',
        text:"La conclusion du projet est qu'il est intéressant d’un point de vue apprentissage. Le thème est jeune et\n        dynamique en matière de liberté de référence (artiste). Le thème de la qualité des données\n        est extrêmement important et je pense que l’avoir traité est primordial. Aujourd’hui, le\n        modèle économique mondial tant énormément dans la collecte, le traitement et l’utilisation\n        des données comme nouvelle monnaie.",
        url:'/pdf/SQL/Portfolio-Quentin-SQL-1.pdf',
        buttonLabel:'PDF'
      }
    }
  ],
  linux: [
    {
      id:'l1',
      image:'/images/Linux/schemaPoste.jpg',
      title:'Installation poste',
      summary:'Installation machine virtuelle',
      details:{
        title:"Installation d'un Poste pour un Client",
        image:'/images/Linux/installerPoste.jpg',
        text:"Le projet est une installation de poste pour un client souhaitant que nous lui configurions une Machine Virtuelle pour son équipe de développeurs utilisant golang pour du développement de jeux vidéo. Ce projet nous a permis de développer nos capacités d’administrateur machine comme par exemple créer des utilisateurs, installer certains programmes et surtout configurer une machine et son environnement pour qu’elle soit fonctionnelle.",
        url:'/pdf/setup/Portfolio-Quentin-setup-1.pdf',
        buttonLabel:'PDF'
      }
    },
    {
      id:'l2',
      image:'/images/Linux/schemaNetwork.jpg',
      title:'Service réseau',
      summary:'Installation de service informatique privé pour un client',
      details:{
        title:"Installation d'un service réseau",
        image:'/images/Linux/detailInstallation.png',
        text:"Dans ce projet d'installation d'un service réseau, ma participation a été la configuration des utilisateurs, service réseau (nextcloud, onlyoffice) dans un réseau émulé.  Le projet m'a permis de mettre ma connaissance théorique d'une configuration réseau en pratique. Ainsi que la conception d'un descriptif détaillant l'ensemble de l'installation destinée à une compréhension sans pré-requis d'une installation réseau.",
        url:'/pdf/setup/Rapport_ARTIGALA_AUBIER_S2B.md',
        buttonLabel:'Rapport Markdown',
        mediaWidth:'33%'
      }
    }
  ]
}

// Project data EN (legacy indexEN.js)
const projectsDataEN: Record<string, ProjectItem[]> = {
  java: [
    {
      id:'j1',
      image:'/images/java/projet-1/Code-typing-bro.png',
      title:'Meteorological Project',
      summary:'Complete an ongoing project',
      details:{
        title:'Meteorological Project',
        image:'/images/java/projet-1/projet-odomo.png',
        text:"In this project, a major difficulty was the reading order of values in a table or matrix. The way the values are arranged is not necessarily how we would like to display them. I managed to make it so that for each histogram according to its reading order, the values are arranged in the expected order. Reading a table/matrix was essential in the realization of this project.",
        url:'/pdf/java/Portfolio-Quentin-java-1.pdf',
        buttonLabel:'PDF'
      }
    },
    {
      id:'j2',
      image:'/images/java/projet-2/Programming-amico.png',
      title:'Biosphère7: game + AI',
      summary:'Create an AI from scratch',
      details:{
        title:'Project: Designing a game and an AI',
        image:'/images/java/projet-2/projet-biosphère.png',
        text:"The project is called Biosphère7, written in Java. It is a board game with 15 levels that allows different actions according to the rules of the level that accumulate. My contribution is the realization, up to level 11, of the table of possible actions according to the new rules of each level. The second part of the project was the most enriching for me with the implementation of an AI with the choice of the method to follow, and I managed to make a reinforcement learning method with a QLearning algorithm (off policy).",
        url:'/pdf/java/Portfolio-Quentin-java-2.pdf',
        buttonLabel:'PDF'
      }
    }
  ],
  csharp: [
    {
      id:'c1',
      image:'/images/Csharp/projet-1/UI-UX-team-amico.png',
      title:'Application',
      summary:'Development of an application',
      details:{
        title:'Application Project',
        image:'/images/Csharp/projet-1/projet-jeux.jpg',
        text:"In this project, the major challenge was the harmonious association between the visual part and the development of functionalities. It was essential to transcribe, in the virtual context in two dimensions, the elements and rules of a classic board game in a way that simplifies the gaming experience for users. For example, we automated aspects such as shuffling cards or positioning pawns, so that players could focus on their choices and actions.",
        url:'/pdf/C%23/Portfolio-Quentin-C-1.pdf',
        buttonLabel:'PDF'
      }
    }
  ],
  python: [
    {
      id:'p1',
      image:'/images/Python/rsk/miniature.png',
      title:'Goalkeeper Strategy',
      summary:"Robot: Predicting the opponent's shot",
      details:{
        title:'Programming a predictive goalkeeper strategy',
        video:'/Video/Python/Gardien/Prediction.mp4',
        text:"As part of a robot soccer competition, I programmed a predictive goalkeeper strategy in Python. The goal is to predict the trajectory of the ball and position accordingly to stop it. By using the orientation of the nearest opponent robot to the ball, I was able to predict the only possible interval where the ball could go after the opponent robot's shot. The most difficult part was solving the case where if the opponent robot changes its orientation after its shot, the goalkeeper should not change its position. This strategy helped my team of 4 players become vice-champions of Europe in robotics.",
        url:'/Video/Python/Gardien/Prediction.mp4',
        buttonLabel:'video'
      }
    }
  ],
  web: [
    {
      id:'w1',
      image:'/images/HCJ/maquetteSite.png',
      title:'Web project',
      summary:'Create and follow the site mockup',
      details:{
        title:'Web site creation project: Click on image',
        image:'/images/HCJ/maquetteSite.png',
        link:'https://atari643.github.io/projetWeb.github.io/Projet.html',
        text:"For our web project, we divided our project time into four parts. The first step concerns the realization of the personas. This represents the type of person we are targeting when creating our website. We chose to target a person studying in a management school who is looking for examples of company presentations. This includes at least one presentation of the 7 functions and a PESTEL analysis. The second part concerns the creation of the mockup of our site.",
        url:'/pdf/web/Portfolio-Quentin-web-1.pdf',
        buttonLabel:'PDF'
      }
    },
    {
      id:'w2',
      image:'/images/HCJ/portfolio.png',
      title:'Portfolio',
      summary:'Create a portfolio using React',
      details:{
        title:'Portfolio creation project',
        image:'/images/HCJ/portfolio.png',
        link:'https://atari643.github.io/',
        text:'This experience was the creation of a portfolio to put all my experiences and projects. I used HTML, CSS, and JavaScript languages for the realization of this portfolio as well as the use and learning of React to facilitate the creation of the site and maintenance with the quick addition of new experiences. Thus, the project allowed me to progress in the field of web development as well as in the discovery of self-learning which made me want to learn other frameworks such as Angular or VueJS to be able to create sites more easily and quickly.',
        url:'https://atari643.github.io/',
        buttonLabel:'website'
      }
    }
  ],
  sql: [
    {
      id:'s1',
      image:'/images/SQL/MCD.jpg',
      title:'Database Festival',
      summary:'Database creation',
      details:{
        title:'Database Project for a Festival',
        image:'/images/SQL/schemaBase.jpg',
        text:"The conclusion of the project is that it is interesting from a learning perspective. The theme is young and dynamic in terms of freedom of reference (artist). The theme of data quality is extremely important and I think treating it is essential. Today, the global economic model relies heavily on data collection, processing and use as a new currency.",
        url:'/pdf/SQL/Portfolio-Quentin-SQL-1.pdf',
        buttonLabel:'PDF'
      }
    }
  ],
  linux: [
    {
      id:'l1',
      image:'/images/Linux/schemaPoste.jpg',
      title:'Workstation installation',
      summary:'Virtual machine installation',
      details:{
        title:'Client Workstation Installation',
        image:'/images/Linux/installerPoste.jpg',
        text:'The project is a workstation installation for a client who wanted us to configure a Virtual Machine for his team of developers using Golang for video game development. This project allowed us to develop our machine administrator skills, such as creating users, installing certain programs, and especially configuring a machine and its environment to make it functional.',
        url:'/pdf/setup/Portfolio-Quentin-setup-1.pdf',
        buttonLabel:'PDF'
      }
    },
    {
      id:'l2',
      image:'/images/Linux/schemaNetwork.jpg',
      title:'Network service',
      summary:'Installation of private IT service for a client',
      details:{
        title:'Network Service Installation',
        image:'/images/Linux/detailInstallation.png',
        text:"In this network service installation project, my participation was the configuration of users, network service (Nextcloud, OnlyOffice) in an emulated network. The project allowed me to put my theoretical knowledge of network configuration into practice. As well as the design of a detailed description of the entire installation intended for an understanding without prerequisites of a network installation.",
        url:'/pdf/setup/Rapport_ARTIGALA_AUBIER_S2B.md',
        buttonLabel:'Rapport Markdown', // kept original label as legacy
        mediaWidth:'33%'
      }
    }
  ]
}

function Modal({ onClose, content, category }:{ onClose:()=>void, content: ProjectDetail, category: string }){
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const firstFocus = useRef<HTMLButtonElement | null>(null)
  const lastFocus = useRef<HTMLButtonElement | null>(null)
  if(!content) return null
  const isPdf = (u?: string) => !!u && /\.pdf($|\?)/i.test(u)
  const primaryLabel = content.link ? (content.buttonLabel || 'Open') : (content.buttonLabel || (isPdf(content.url) ? 'PDF' : 'Download'))
  const hasPrimary = !!(content.link || content.url)
  const tagList: string[] = []
  if(category) tagList.push(category.toUpperCase())
  if(content.video) tagList.push('VIDEO')
  if(isPdf(content.url)) tagList.push('PDF')
  if(content.link && !isPdf(content.link)) tagList.push('LINK')

  // Focus trap + ESC
  useEffect(()=>{
    const keyHandler = (e: KeyboardEvent) => {
      if(e.key === 'Escape') { e.preventDefault(); onClose() }
      if(e.key === 'Tab' && dialogRef.current){
  const nodeList = dialogRef.current.querySelectorAll('button, [href], video, input, textarea, select, [tabindex]:not([tabindex="-1"])') as NodeListOf<HTMLElement>
  const list = Array.prototype.slice.call(nodeList).filter((el:HTMLElement)=> !el.hasAttribute('disabled'))
        if(!list.length) return
        const first = list[0]
        const last = list[list.length-1]
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus() }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', keyHandler)
    // focus first interactive
    setTimeout(()=> firstFocus.current?.focus(), 30)
    return () => document.removeEventListener('keydown', keyHandler)
  },[content])

  return (
    <div className="window" role="dialog" aria-modal="true" aria-label={content.title} onMouseDown={(e)=>{ if(e.target===e.currentTarget) onClose() }}>
      <div className="dialog" ref={dialogRef}>
        <header className="pm-header">
          <div className="pm-head-text">
            <h1 id="project-title">{content.title}</h1>
            {tagList.length>0 && <ul className="tags" aria-label="tags">{tagList.map(t=> <li key={t}>{t}</li>)}</ul>}
          </div>
          <button ref={firstFocus} className="icon-btn close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="pm-body">
          <div className="pm-media">
            {content.video ? (
              <div className="media-ratio">
                <video controls src={content.video} />
              </div>
            ) : content.image ? (
              <div className="media-ratio">
                {content.link ? (
                  <a href={content.link} target="_blank" rel="noreferrer" aria-label="External link">
                    <img src={content.image} style={content.mediaWidth?{width:content.mediaWidth}:undefined} />
                  </a>
                ) : (
                  <img src={content.image} style={content.mediaWidth?{width:content.mediaWidth}:undefined} />
                )}
              </div>
            ) : null}
          </div>
          <div className="pm-content">
            <article>
              <p style={{whiteSpace:'pre-wrap'}}>{content.text}</p>
            </article>
          </div>
        </div>
        <div className="pm-actions">
          {hasPrimary && (
            content.link ? (
              <a ref={lastFocus as any} className="pm-btn primary" href={content.link} target="_blank" rel="noreferrer">{primaryLabel}</a>
            ) : (
              <form action={content.url} style={{margin:0}}>
                <button ref={lastFocus} className="pm-btn primary" type="submit">{primaryLabel}</button>
              </form>
            )
          )}
          <button className="pm-btn ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default function Projects(){
  const { i18n, t } = useTranslation()
  const lang = (i18n.language && i18n.language.indexOf('en') === 0) ? 'en' : 'fr'
  const data = lang === 'en' ? projectsDataEN : projectsDataFR
  type CategoryKey = keyof typeof projectsDataFR
  const [active, setActive] = useState<CategoryKey | null>(null)
  const [modal, setModal] = useState<ProjectItem['details'] | null>(null)
  const [query, setQuery] = useState('')
  const pressTimer = useRef<number | null>(null)
  const prevBodyOverflow = useRef<string | null>(null)
  const scrollYRef = useRef<number>(0)
  // Liste agrégée de tous les projets (avec catégorie attachée)
  const aggregatedList: (ProjectItem & { __cat: CategoryKey })[] = useMemo(()=> {
    return (Object.keys(data) as CategoryKey[]).reduce<(ProjectItem & {__cat:CategoryKey})[]>((acc,cat)=>{
      const arr = data[cat].map(p=> ({...p,__cat:cat}))
      return acc.concat(arr)
    },[])
  }, [data])

  const rawList: (ProjectItem & { __cat?: CategoryKey })[] = active ? data[active].map(p=>({...p,__cat:active})) : aggregatedList

  const list: (ProjectItem & { __cat?: CategoryKey })[] = useMemo(()=> {
    if(!query.trim()) return rawList
    const q = query.toLowerCase()
    return rawList.filter(p=> p.title.toLowerCase().indexOf(q) !== -1 || p.summary.toLowerCase().indexOf(q) !== -1 || p.details.text.toLowerCase().toLowerCase().indexOf(q) !== -1)
  }, [rawList, query])

  // Random press animation like legacy
  useEffect(() => {
    pressTimer.current = window.setInterval(() => {
      const buttons = document.querySelectorAll('nav button')
      if(!buttons.length) return
      const idx = Math.floor(Math.random() * buttons.length)
      buttons[idx].classList.add('press')
      setTimeout(()=> buttons[idx].classList.remove('press'), 1000)
    }, 1000)
    return () => { if(pressTimer.current) window.clearInterval(pressTimer.current) }
  }, [])

  // Scroll to exp on selection
  useEffect(() => { if(active) document.getElementById('exp')?.scrollIntoView({behavior:'smooth'}) }, [active])

  // Body scroll lock when modal open (prevent page jump to top)
  useEffect(()=>{
    if(modal){
      // Capture current scroll position
      scrollYRef.current = window.scrollY || window.pageYOffset || 0
      // Save previous inline overflow to restore later
      prevBodyOverflow.current = document.body.style.overflow
      // Lock body without causing jump
      const style = document.body.style as CSSStyleDeclaration
      style.position = 'fixed'
      style.top = `-${scrollYRef.current}px`
      style.left = '0'
      style.right = '0'
      style.width = '100%'
      style.overflow = 'hidden'
      document.body.classList.add('modal-open')
    } else {
      // Restore body styles and scroll position
      const top = document.body.style.top
      document.body.classList.remove('modal-open')
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      if(prevBodyOverflow.current !== null) document.body.style.overflow = prevBodyOverflow.current
      // Compute previous scrollY (from stored ref preferred)
      const y = scrollYRef.current || (top ? Math.abs(parseInt(top,10)) : 0)
      window.scrollTo(0, y)
    }
    return () => {
      // Cleanup in case component unmounts while modal open
      const top = document.body.style.top
      document.body.classList.remove('modal-open')
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      if(prevBodyOverflow.current!==null) document.body.style.overflow = prevBodyOverflow.current
      const y = scrollYRef.current || (top ? Math.abs(parseInt(top,10)) : 0)
      if(y) window.scrollTo(0, y)
    }
  },[modal])

  // Change logo on hover (swap to 2.png)
  const hoverSwap = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, path1: string, path2: string) => {
    const img = e.currentTarget.querySelector('img') as HTMLImageElement | null
    if(img) img.src = path2
  }
  const hoverBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, path1: string, path2: string) => {
    const img = e.currentTarget.querySelector('img') as HTMLImageElement | null
    if(img) img.src = path1
  }

  const { ref: orbRef, inView: orbInView } = useInView<HTMLDivElement>({ threshold:.15 })
  const sectionClass = ''
  return (
    <section id="Experience" className={sectionClass}>
  <h1 className="section-title"><span className="accent-gradient">{t('projects.sectionTitle')}</span></h1>
      <div ref={orbRef} style={{position:'relative',width:'100%',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        {orbInView && <ProjectsOrb />}
        {orbInView && <ProjectsConstellation nodes={([
          {k:'java', label:'Java'},
          {k:'web', label:'Web'},
          {k:'csharp', label:'C#'},
          {k:'python', label:'Python'},
          {k:'sql', label:'SQL'},
          {k:'linux', label:'Setup'}
        ] as {k:CategoryKey,label:string}[]).filter(n=> (data as any)[n.k])
          .map(n=> ({ key:n.k, label:n.label }))} active={active} />}
      </div>
      <div id="app" style={{display:'flex',flexDirection:'column',alignItems:'center',margin:'24px 0',gap:20}}>
        <nav aria-label={t('projects.sectionTitle')+ ' categories'} style={{display:'flex',flexWrap:'wrap',gap:16,justifyContent:'center'}}>
          <button
            key='all'
            aria-label={t('projects.all','Tous')}
            aria-pressed={active===null}
            className={active===null? 'active':''}
            onClick={()=> setActive(null)}
          >{t('projects.all','Tous')}</button>
          {([

            {k:'java', label:'Java', paths:['./images/logo/logoJava/1.png','./images/logo/logoJava/2.png']},
            {k:'web', label:'Web', paths:['./images/logo/logoWeb/1.png','./images/logo/logoWeb/2.png']},
            {k:'csharp', label:'C#', paths:['./images/logo/logoCsharp/1.png','./images/logo/logoCsharp/2.png']},
            {k:'python', label:'Python', paths:['./images/logo/logoPython/1.png','./images/logo/logoPython/2.png']},
            {k:'sql', label:'SQL', paths:['./images/logo/logoSql/1.png','./images/logo/logoSql/2.png']},
            {k:'linux', label:'Setup', paths:['./images/logo/logoSetup/1.png','./images/logo/logoSetup/2.png']}
          ] as {k:CategoryKey,label:string,paths:[string,string]}[]).map(btn=> (
            <button
              key={btn.k}
              aria-label={btn.label}
              aria-pressed={active===btn.k}
              className={active===btn.k? 'active':''}
              onMouseOver={(e)=>hoverSwap(e,btn.paths[0],btn.paths[1])}
              onMouseOut={(e)=>hoverBack(e,btn.paths[0],btn.paths[1])}
              onClick={()=>setActive(btn.k)}
              onKeyDown={(e)=> { if(e.key==='Enter' || e.key===' '){ e.preventDefault(); setActive(btn.k) } }}
            >
              <img className="lang" src={btn.paths[0]} alt={btn.label} loading="lazy" decoding="async" />
            </button>
          ))}

        </nav>
        {active && (
          <div style={{display:'flex',flexWrap:'wrap',gap:12,justifyContent:'center'}}>
            <label style={{display:'flex',alignItems:'center',gap:8}}>
              <span className="sr-only">{t('projects.search','Rechercher')}</span>
              <input
                type="search"
                placeholder={t('projects.searchPlaceholder','Rechercher dans la catégorie...')}
                value={query}
                onChange={e=> setQuery(e.target.value)}
                style={{padding:'10px 14px',borderRadius:30,border:'1px solid rgba(255,255,255,.25)',background:'rgba(255,255,255,.05)',color:'inherit',minWidth:260}}
              />
            </label>
            {query && <button onClick={()=> setQuery('')} style={{padding:'10px 18px',borderRadius:30,border:'1px solid rgba(255,255,255,.25)',background:'rgba(255,255,255,.08)',cursor:'pointer'}}>{t('projects.clear','Effacer')}</button>}
          </div>
        )}
      </div>
  <div className="projet" id="exp" aria-live="polite">
        {list.length ? (
          <div className="grid">
      {list.map(item => (
              <div
                key={item.id}
                className="card"
                role="button"
                tabIndex={0}
        aria-label={(item.__cat? (item.__cat + ' ') : '') + item.title + ' - ' + item.summary}
                onClick={(e)=>{
                  const el = e.currentTarget as HTMLDivElement
                  el.classList.add('retourner')
                  setTimeout(()=> { setModal(item.details); el.classList.remove('retourner') }, 320)
                }}
                onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); (e.currentTarget as HTMLDivElement).click() } }}
                onMouseMove={(e)=>{
                  const card = e.currentTarget as HTMLDivElement
                  const r = card.getBoundingClientRect()
                  const x = ((e.clientX - r.left)/r.width)*100
                  const y = ((e.clientY - r.top)/r.height)*100
                  card.style.setProperty('--hx', x + '%')
                  card.style.setProperty('--hy', y + '%')
                }}
              >
        <div className="halo" aria-hidden="true" />
        <div className="resume">{item.summary} {item.__cat && <span style={{display:'inline-block',marginLeft:6,padding:'2px 6px',borderRadius:12,fontSize:11,background:'rgba(255,255,255,.12)'}}>{item.__cat}</span>} <i className='icofont-check' aria-hidden="true"></i></div>
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              </div>
            ))}

          </div>
        ) : (
          <div className="empty" style={{textAlign:'center',padding:'32px 0'}}>
            {active? (
              query? t('projects.noResults','Aucun résultat') : t('projects.noProjects','Aucun projet dans cette catégorie.')
            ) : t('projects.selectCategory','Sélectionnez une catégorie')}
          </div>
        )}
      </div>
  {modal && <Modal content={modal} category={active || ''} onClose={()=> setModal(null)} />}
    </section>
  )
}
