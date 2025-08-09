import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect, useCallback } from 'react'
import VideoRing from './three/VideoRing'
import { useInView } from './three/useInView'

export default function VideoSection(){
	const { t } = useTranslation()
			const videoRef = useRef<HTMLVideoElement|null>(null)
			const [paused, setPaused] = useState(true)
			const [hover, setHover] = useState(false)
			const [time, setTime] = useState(0)
			const [duration, setDuration] = useState(0)
			const [volume, setVolume] = useState(1)
			const [muted, setMuted] = useState(false)
	const { ref: sectionRef, inView } = useInView<HTMLDivElement>({ threshold:.2 })

	// Sync paused state if user uses keyboard native controls
		useEffect(()=>{
			const v = videoRef.current; if(!v) return
			const onPlay = () => setPaused(false)
			const onPause = () => setPaused(true)
			const onTime = () => setTime(v.currentTime)
			const onMeta = () => setDuration(v.duration || 0)
			const onVolume = () => { setVolume(v.volume); setMuted(v.muted) }
			v.addEventListener('play', onPlay)
			v.addEventListener('pause', onPause)
			v.addEventListener('timeupdate', onTime)
			v.addEventListener('loadedmetadata', onMeta)
			v.addEventListener('volumechange', onVolume)
			return () => { v.removeEventListener('play', onPlay); v.removeEventListener('pause', onPause); v.removeEventListener('timeupdate', onTime); v.removeEventListener('loadedmetadata', onMeta); v.removeEventListener('volumechange', onVolume) }
		},[])

			const togglePlay = useCallback(()=>{
				const v = videoRef.current; if(!v) return
				if(v.paused) { v.play(); } else { v.pause(); }
			},[])

			const seek = (delta:number) => {
				const v = videoRef.current; if(!v) return
				v.currentTime = Math.min(Math.max(0, v.currentTime + delta), v.duration || v.currentTime + delta)
			}

			const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
				const v = videoRef.current; if(!v) return
				const val = parseFloat(e.target.value)
				v.currentTime = val * (v.duration || 0)
			}

			const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
				const v = videoRef.current; if(!v) return
				const val = parseFloat(e.target.value)
				v.volume = val
				if(val > 0 && v.muted){ v.muted = false }
			}

			const toggleMute = () => {
				const v = videoRef.current; if(!v) return
				v.muted = !v.muted
				if(!v.muted) { v.volume = volume || 0.5 }
			}

			const format = (s:number) => {
    if(!isFinite(s)) return '0:00'
    const m = Math.floor(s/60)
    const raw = Math.floor(s%60)
    const sec = (raw < 10 ? '0' + raw : '' + raw)
    return `${m}:${sec}`
  }

				const onKey = (e: React.KeyboardEvent) => {
					const v = videoRef.current; if(!v) return
					switch(e.key){
						case ' ':
						case 'k':
						case 'K':
							e.preventDefault(); togglePlay(); break
						case 'ArrowRight':
							e.preventDefault(); seek(5); break
						case 'ArrowLeft':
							e.preventDefault(); seek(-5); break
						case 'ArrowUp':
							e.preventDefault(); v.volume = Math.min(1, v.volume + .05); break
						case 'ArrowDown':
							e.preventDefault(); v.volume = Math.max(0, v.volume - .05); break
						case 'm':
						case 'M':
							e.preventDefault(); toggleMute(); break
					}
				}

		return (
			<section id="video" ref={sectionRef} className="video-section" aria-labelledby="video-title">
				<h1 id="video-title" className="section-title"><span className="accent-gradient">{t('video.title')}</span></h1>
				<div className="video-frame" role="region" aria-label={t('video.title')}>
					<div
						className={`video-shell ${paused? 'is-paused':''} ${hover? 'is-hovered':''}`}
						onMouseEnter={()=>setHover(true)}
						onMouseLeave={()=>setHover(false)}
					>
												<video
							ref={videoRef}
							preload="metadata"
							poster="/images/HCJ/portfolio.png"
							tabIndex={0}
							aria-label={t('video.title')}
																playsInline
				                      disablePictureInPicture
				                      controlsList="nodownload noplaybackrate"
						>
							<source src="/Video/portfolio-Presentation.mp4" type="video/mp4" />
							{t('video.unsupported') || 'Video unsupported'}
									</video>
													<div className="video-ring-wrap">{inView && <VideoRing progress={duration? time/duration:0} playing={!paused} />}</div>
						<button
							type="button"
							className="video-overlay-btn"
							aria-pressed={!paused}
							aria-label={paused? t('video.play'): t('video.pause')}
							onClick={togglePlay}
						>
							<span className="icon" aria-hidden="true">{paused? '►':'❚❚'}</span>
							<span className="label">{paused? t('video.play'): t('video.pause')}</span>
						</button>
									  <div className="video-controls" role="group" aria-label="Custom video controls" onKeyDown={onKey} tabIndex={0}>
										<button type="button" className="vc-btn" onClick={()=>seek(-10)} aria-label={t('video.seekBackward')}>«10</button>
										<button type="button" className="vc-btn" onClick={togglePlay} aria-label={paused? t('video.play'): t('video.pause')}>
											{paused? '►':'❚❚'}
										</button>
										<button type="button" className="vc-btn" onClick={()=>seek(10)} aria-label={t('video.seekForward')}>10»</button>
										<div className="vc-time" aria-label={t('video.currentTime')}><span>{format(time)}</span><span>/</span><span aria-label={t('video.duration')}>{format(duration)}</span></div>
										<label className="vc-progress" aria-label={t('video.progress')}>
											<input
												type="range" min={0} max={1} step={0.001}
												value={duration? (time / duration): 0}
												onChange={onScrub}
												aria-valuemin={0}
												aria-valuemax={duration||0}
												aria-valuenow={time}
											/>
											<span className="track"><span className="fill" style={{transform:`scaleX(${duration? (time/duration):0})`}} /></span>
										</label>
										<button type="button" className="vc-btn" onClick={toggleMute} aria-label={muted? t('video.unmute'): t('video.mute')}>
											{muted || volume===0 ? '🔇':'🔊'}
										</button>
										<label className="vc-volume" aria-label={t('video.volume')}>
											<input
												type="range" min={0} max={1} step={0.01}
												value={muted? 0: volume}
												onChange={onVolume}
											/>
											<span className="track"><span className="fill" style={{transform:`scaleX(${muted?0:volume})`}} /></span>
										</label>
									</div>
					</div>
				</div>
			</section>
		)
}
