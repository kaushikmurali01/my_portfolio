import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../data/skills'

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" ref={ref} className="px-8 pb-28">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.2em] mb-4">
            Technical Skills
          </div>
          <h2 className="font-display font-medium tracking-[-0.03em] text-4xl sm:text-5xl text-[var(--text)] leading-[1.05]">
            The{' '}
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>toolkit</span>.
          </h2>
        </motion.div>

        <div
          className="rounded-2xl border border-[var(--border)] overflow-hidden"
          style={{ background: 'var(--bg-card)' }}
        >
          {skills.map(({ label, items }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className={`flex flex-col sm:flex-row sm:items-start gap-4 px-7 py-5 ${
                i < skills.length - 1 ? 'border-b border-[var(--border)]' : ''
              }`}
            >
              <div className="w-36 shrink-0">
                <span className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-[0.15em]">
                  {label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] font-mono text-[12px] text-[var(--text-soft)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
