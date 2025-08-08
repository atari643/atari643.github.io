type Callback = { id:number; fn:(dt:number)=>void; active:boolean }

class AnimationManager {
  private callbacks: Callback[] = []
  private last = 0
  private raf = 0
  private running = false
  private reduced = false
  private nextId = 1

  constructor(){
    this.reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false
    if(typeof document !== 'undefined'){
      document.addEventListener('visibilitychange', ()=> this.updateRunState())
    }
    if(typeof window !== 'undefined'){
      const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
      mq?.addEventListener('change', ()=>{ this.reduced = !!mq.matches; this.updateRunState() })
    }
    this.updateRunState()
  }

  private loop = (t:number) => {
    if(!this.running){ return }
    const dt = this.last? (t - this.last): 16
    this.last = t
    if(!this.reduced){
      for(const cb of this.callbacks){ if(cb.active) { try { cb.fn(dt) } catch(e){ console.warn('Anim cb error', e) } } }
    }
    this.raf = requestAnimationFrame(this.loop)
  }

  private updateRunState(){
    const shouldRun = !document.hidden
    if(shouldRun && !this.running){ this.running = true; this.last = 0; this.raf = requestAnimationFrame(this.loop) }
    else if(!shouldRun && this.running){ this.running = false; cancelAnimationFrame(this.raf) }
  }

  register(fn:(dt:number)=>void){
    const entry: Callback = { id:this.nextId++, fn, active:true }
    this.callbacks.push(entry)
    this.updateRunState()
    return () => this.unregister(entry.id)
  }

  unregister(id:number){ this.callbacks = this.callbacks.filter(c=> c.id!==id) }

  setActive(id:number, active:boolean){
    for(let i=0;i<this.callbacks.length;i++){
      if(this.callbacks[i].id===id){ this.callbacks[i].active = active; break }
    }
  }
}

export const animationManager = new AnimationManager()
