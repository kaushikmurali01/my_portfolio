import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, MapPin } from 'lucide-react'
import { InteractiveGrid } from './InteractiveGrid'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const nameItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

const photoItem = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
}

function PhotoCard() {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        height: '100%',
        minHeight: 320,
        maxHeight: 520,
      }}
    >
      {!imgError ? (
        <img
          src="/assets/headshot.jpg"
          alt="Kaushik Murali"
          onError={() => setImgError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '5rem',
              fontWeight: 500,
              color: 'var(--text-faint)',
              letterSpacing: '-0.04em',
            }}
          >
            KM
          </span>
        </div>
      )}

      {/* Gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '52%',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,10,11,0.6) 45%, rgba(10,10,11,0.95) 100%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Education overlay */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 20px 20px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '3px 8px',
            borderRadius: 5,
            border: '1px solid rgba(255,92,40,0.3)',
            background: 'rgba(255,92,40,0.08)',
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Education
          </span>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 600,
            color: '#fff',
            marginBottom: 3,
            letterSpacing: '-0.01em',
          }}
        >
          University of Toronto
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(168,168,174,0.85)' }}>
          BSc Computer Science · 2019–2024
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  function scrollToWork() {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative px-8 overflow-hidden"
      style={{ height: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center' }}
    >
      {/* MagicUI InteractiveGridPattern — cells light up on hover, slow fade-out */}
      {/* z-0 so grid SVG receives mouse events; content sits above at z-10 */}
      <div className="absolute inset-0 z-0" style={{ background: 'var(--bg)' }}>
        <InteractiveGrid />
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
        aria-hidden="true"
      />

      {/* Content: pointer-events none on wrapper so mouse reaches the grid,
          but restored on every interactive child */}
      <div className="relative z-10 max-w-content mx-auto w-full py-10" style={{ pointerEvents: 'none' }}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-10 xl:gap-14 items-stretch"
        >
          {/* Left */}
          <div className="flex flex-col justify-center">
            <motion.div variants={item} className="flex items-center gap-3 mb-8 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] font-mono text-[12px] text-[var(--text-soft)]">
                <span className="dot-green" aria-hidden="true" />
                Available for new roles
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--text-faint)]">
                <MapPin size={12} aria-hidden="true" />
                Toronto, Canada
              </span>
            </motion.div>

            <motion.h1
              variants={nameItem}
              className="font-display font-medium tracking-[-0.04em] leading-[0.9] text-[var(--text)] mb-7"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              Kaushik
              <br />
              Murali<span style={{ color: 'var(--accent)' }}>.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="font-display font-light tracking-tight text-[var(--text-soft)] mb-5"
              style={{ fontSize: 'clamp(1.15rem, 2vw, 1.6rem)', lineHeight: 1.3 }}
            >
              Software{' '}
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>engineer</em>{' '}
              building things that ship.
              <span className="cursor-blink" aria-hidden="true" />
            </motion.p>

            <motion.p
              variants={item}
              className="text-[15px] leading-relaxed text-[var(--text-mute)] mb-9 max-w-lg"
            >
              Currently building production analytics platforms, ETL pipelines, and a self-hosted
              RAG system at Enerva. Co-author of a published paper on Vision Transformers for
              medical imaging.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToWork}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans text-[14px] font-medium text-white cursor-pointer transition-all"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 24px rgba(255,92,40,0.32), 0 1px 3px rgba(0,0,0,0.5)',
                  pointerEvents: 'auto',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 36px rgba(255,92,40,0.5), 0 1px 3px rgba(0,0,0,0.5)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(255,92,40,0.32), 0 1px 3px rgba(0,0,0,0.5)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                See my work
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>

              <a
                href="https://github.com/kaushikmurali01"
                target="_blank"
                rel="noopener noreferrer"
                style={{ pointerEvents: 'auto' }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] font-sans text-[14px] text-[var(--text-soft)] hover:text-[var(--text)] hover:border-[var(--border-hi)] hover:bg-[var(--bg-card-hi)] transition-all"
              >
                <Github size={14} />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/kaushikmurali01"
                target="_blank"
                rel="noopener noreferrer"
                style={{ pointerEvents: 'auto' }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] font-sans text-[14px] text-[var(--text-soft)] hover:text-[var(--text)] hover:border-[var(--border-hi)] hover:bg-[var(--bg-card-hi)] transition-all"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.aside
            variants={photoItem}
            className="hidden lg:block"
            style={{ pointerEvents: 'auto' }}
            aria-label="Photo of Kaushik Murali"
          >
            <PhotoCard />
          </motion.aside>
        </motion.div>
      </div>
    </section>
  )
}
