import { useRef, useState } from 'react'
import { ExternalLink, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    card.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card-spotlight card-hover-glow rounded-xl border"
      style={{
        borderColor: expanded ? 'var(--border-hi)' : 'var(--border)',
        background: 'var(--bg-card)',
      }}
    >
      {/* Main content */}
      <div className="p-6">
        {/* Top row: number + title + link */}
        <div className="flex items-start gap-3 mb-3">
          <span className="font-mono text-[11px] text-[var(--text-faint)] mt-1.5 w-6 shrink-0">
            {project.number}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2">
              <h3 className="font-display font-medium tracking-[-0.02em] text-xl text-[var(--text)] flex-1 leading-tight">
                {project.title}
              </h3>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors mt-1"
                aria-label={`View ${project.title} on GitHub`}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Tagline */}
            <p className="font-mono text-[12px] italic mt-1.5 leading-snug" style={{ color: 'var(--accent-soft)' }}>
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 pl-9">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] font-mono text-[10px] text-[var(--text-mute)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-2 px-6 py-2.5 border-t border-[var(--border)] font-mono text-[11px] text-[var(--text-faint)] hover:text-[var(--text-soft)] hover:bg-[var(--bg-card-hi)] transition-colors cursor-pointer"
        aria-expanded={expanded}
      >
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown size={12} aria-hidden="true" />
        </motion.div>
        {expanded ? 'Hide details' : 'Show details'}
      </button>

      {/* Expandable description */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-6 pb-5 pt-1 text-[14px] leading-relaxed text-[var(--text-soft)]" style={{ paddingLeft: '3.75rem' }}>
              {project.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
