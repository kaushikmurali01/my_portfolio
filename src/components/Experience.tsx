import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { experience } from '../data/experience'

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState<string | null>(null)

  function toggle(company: string) {
    setExpanded((prev) => (prev === company ? null : company))
  }

  return (
    <section id="experience" ref={ref} className="px-8 pb-28 pt-8">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.2em] mb-4">
            Experience
          </div>
          <h2 className="font-display font-medium tracking-[-0.03em] text-4xl sm:text-5xl text-[var(--text)] leading-[1.05]">
            Where I've{' '}
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>shipped code</span>.
          </h2>
        </motion.div>

        <div className="relative pl-8">
          <div className="timeline-rail" />

          <div className="flex flex-col gap-5">
            {experience.map((entry, i) => {
              const isOpen = expanded === entry.company

              return (
                <motion.div
                  key={entry.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <span
                    className="absolute -left-[33px] top-[18px] w-3 h-3 rounded-full"
                    style={{
                      background: 'var(--accent)',
                      boxShadow: '0 0 0 4px var(--bg), 0 0 12px rgba(255,92,40,0.5)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Clickable header */}
                  <button
                    onClick={() => toggle(entry.company)}
                    className="w-full text-left group cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`exp-${i}`}
                  >
                    <div
                      className="rounded-xl border px-7 py-5 transition-all duration-200"
                      style={{
                        borderColor: isOpen ? 'var(--border-hi)' : 'var(--border)',
                        background: isOpen ? 'var(--bg-card-hi)' : 'var(--bg-card)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 flex-wrap mb-1">
                            <h3 className="font-display font-medium tracking-[-0.02em] text-xl sm:text-2xl text-[var(--text)]">
                              {entry.title}
                            </h3>
                            <span
                              className="font-mono text-[13px]"
                              style={{ color: 'var(--accent)' }}
                            >
                              {entry.company}
                            </span>
                          </div>
                          <p className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-[0.15em]">
                            {entry.meta}
                          </p>
                        </div>

                        {/* Expand chevron */}
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="shrink-0 mt-1"
                        >
                          <ChevronDown
                            size={18}
                            className="transition-colors"
                            style={{ color: isOpen ? 'var(--accent)' : 'var(--text-faint)' }}
                            aria-hidden="true"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Expandable bullets */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`exp-${i}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <ul className="flex flex-col gap-3 pt-4 pb-1 px-7">
                          {entry.bullets.map((bullet, j) => (
                            <li key={j} className="flex gap-3">
                              <span
                                className="mt-[10px] w-1 h-1 rounded-full shrink-0"
                                style={{ background: 'var(--text-faint)' }}
                                aria-hidden="true"
                              />
                              <span className="text-[15px] leading-relaxed text-[var(--text-soft)]">
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
