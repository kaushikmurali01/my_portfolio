import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" ref={ref} className="px-8 pb-28">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.2em] mb-4">
            Featured Projects
          </div>
          <h2 className="font-display font-medium tracking-[-0.03em] text-4xl sm:text-5xl text-[var(--text)] leading-[1.05]">
            A few things I've{' '}
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>built</span>.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-7 flex justify-end"
        >
          <a
            href="https://github.com/kaushikmurali01?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[12px] text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors"
          >
            View all projects on GitHub
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
