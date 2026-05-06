import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin } from 'lucide-react'

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} className="px-8 pb-28">
      <div className="max-w-content mx-auto flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl"
        >
          {/* Glow behind card */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,92,40,0.12), transparent)',
              filter: 'blur(24px)',
              transform: 'scale(1.1)',
            }}
            aria-hidden="true"
          />

          <div
            className="relative rounded-2xl border border-[var(--border-hi)] p-10 sm:p-14 text-center"
            style={{ background: 'var(--bg-card)' }}
          >
            <div className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.2em] mb-5 inline-flex items-center gap-2">
              <span className="dot-green" aria-hidden="true" />
              Available now
            </div>

            <h2 className="font-display font-medium tracking-[-0.03em] text-4xl sm:text-5xl text-[var(--text)] mb-5 leading-[1.05]">
              Let's{' '}
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>build something</span>.
            </h2>

            <p className="text-[15px] leading-relaxed text-[var(--text-soft)] mb-10 max-w-md mx-auto">
              I'm looking for full-stack, ML, or platform engineering roles in Toronto or
              Canada-remote. The fastest way to reach me is email.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:kaushik.muralig@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-[13px] font-medium text-white transition-all"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 20px rgba(255,92,40,0.3)',
                }}
              >
                <Mail size={14} />
                kaushik.muralig@gmail.com
              </a>

              <a
                href="https://linkedin.com/in/kaushikmurali01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] font-sans text-[14px] text-[var(--text-soft)] hover:border-[var(--border-hi)] hover:text-[var(--text)] transition-all"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
