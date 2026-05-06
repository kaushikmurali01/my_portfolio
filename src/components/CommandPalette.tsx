import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, ExternalLink } from 'lucide-react'

interface PaletteItem {
  id: string
  label: string
  description?: string
  action: () => void
  external?: boolean
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  function scrollTo(id: string) {
    onClose()
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 120)
  }

  function openExternal(url: string) {
    onClose()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const items: PaletteItem[] = [
    { id: 'experience', label: 'Experience', description: 'Enerva, Proofpoint', action: () => scrollTo('experience') },
    { id: 'work', label: 'Featured Projects', description: 'Open-source highlights', action: () => scrollTo('work') },
    { id: 'paper', label: 'Published Paper', description: 'Vision Transformers research', action: () => scrollTo('paper') },
    { id: 'tools', label: 'Playground', description: 'LLM token cost estimator with prompt caching', action: () => scrollTo('tools') },
    { id: 'contact', label: 'Contact', description: 'Get in touch', action: () => scrollTo('contact') },
    { id: 'github', label: 'GitHub', description: 'github.com/kaushikmurali01', action: () => openExternal('https://github.com/kaushikmurali01'), external: true },
    { id: 'linkedin', label: 'LinkedIn', description: 'linkedin.com/in/kaushikmurali01', action: () => openExternal('https://linkedin.com/in/kaushikmurali01'), external: true },
    { id: 'arxiv', label: 'Read the paper', description: 'arXiv:2406.00237', action: () => openExternal('https://arxiv.org/abs/2406.00237'), external: true },
    { id: 'email', label: 'Email me', description: 'kaushik.muralig@gmail.com', action: () => { onClose(); window.location.href = 'mailto:kaushik.muralig@gmail.com' } },
  ]

  const filtered = query.trim()
    ? items.filter(
        (i) =>
          i.label.toLowerCase().includes(query.toLowerCase()) ||
          (i.description ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : items

  const clampedIndex = Math.min(activeIndex, filtered.length - 1)

  const handleSelect = useCallback(
    (item: PaletteItem) => {
      item.action()
      setQuery('')
      setActiveIndex(0)
    },
    []
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    const el = listRef.current?.children[clampedIndex]
    if (el instanceof HTMLElement) el.scrollIntoView({ block: 'nearest' })
  }, [clampedIndex])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = filtered[clampedIndex]
      if (item) handleSelect(item)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-24 z-50 w-full max-w-lg -translate-x-1/2"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div
              className="rounded-2xl border border-[var(--border-hi)] overflow-hidden shadow-2xl"
              style={{ background: 'var(--bg-elev)' }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
                <Search size={16} className="text-[var(--text-faint)] shrink-0" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search…"
                  className="flex-1 bg-transparent font-mono text-[14px] text-[var(--text)] placeholder-[var(--text-faint)] outline-none"
                  aria-label="Search commands"
                  aria-autocomplete="list"
                  aria-controls="command-list"
                  aria-activedescendant={filtered[clampedIndex] ? `cmd-${filtered[clampedIndex].id}` : undefined}
                />
                <kbd className="font-mono text-[11px] text-[var(--text-faint)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                  esc
                </kbd>
              </div>

              {/* List */}
              <ul
                ref={listRef}
                id="command-list"
                role="listbox"
                className="py-2 max-h-80 overflow-y-auto"
              >
                {filtered.length === 0 ? (
                  <li className="px-4 py-8 text-center font-mono text-[13px] text-[var(--text-faint)]">
                    No results for "{query}"
                  </li>
                ) : (
                  filtered.map((item, i) => (
                    <li
                      key={item.id}
                      id={`cmd-${item.id}`}
                      role="option"
                      aria-selected={i === clampedIndex}
                    >
                      <button
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors cursor-pointer"
                        style={{
                          background: i === clampedIndex ? 'var(--bg-card-hi)' : 'transparent',
                        }}
                      >
                        <div>
                          <div
                            className="font-sans text-[14px]"
                            style={{
                              color: i === clampedIndex ? 'var(--text)' : 'var(--text-soft)',
                            }}
                          >
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="font-mono text-[11px] text-[var(--text-faint)] mt-0.5">
                              {item.description}
                            </div>
                          )}
                        </div>
                        {item.external ? (
                          <ExternalLink size={13} className="text-[var(--text-faint)] shrink-0" aria-hidden="true" />
                        ) : (
                          <ArrowRight
                            size={13}
                            className="shrink-0 transition-colors"
                            style={{ color: i === clampedIndex ? 'var(--accent)' : 'var(--text-faint)' }}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
                  ))
                )}
              </ul>

              {/* Footer hint */}
              <div className="px-4 py-2.5 border-t border-[var(--border)] flex items-center gap-4">
                {[
                  ['↑↓', 'navigate'],
                  ['↵', 'select'],
                  ['esc', 'close'],
                ].map(([key, hint]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <kbd className="font-mono text-[10px] text-[var(--text-faint)] px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-card)]">
                      {key}
                    </kbd>
                    <span className="font-mono text-[10px] text-[var(--text-faint)]">{hint}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
