import { Search } from 'lucide-react'

interface NavProps {
  onOpenPalette: () => void
}

export function Nav({ onOpenPalette }: NavProps) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] px-8"
      style={{ background: 'rgba(10,10,11,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-content mx-auto h-14 flex items-center justify-between">
        {/* Left */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Go to top"
        >
          <span className="dot-pulse" aria-hidden="true" />
          <span className="font-mono text-[13px] text-[var(--text-soft)] group-hover:text-[var(--text)] transition-colors">
            kaushik.murali
          </span>
        </button>

        {/* Center */}
        <nav className="hidden sm:flex items-center gap-6" aria-label="Main navigation">
          {[
            { label: 'Experience', id: 'experience' },
            { label: 'Projects',   id: 'work' },
            { label: 'Paper',      id: 'paper' },
            { label: 'Playground',   id: 'tools' },
            { label: 'Contact',    id: 'contact' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-sans text-[13px] text-[var(--text-mute)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right */}
        <button
          onClick={onOpenPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hi)] hover:bg-[var(--bg-card-hi)] transition-all text-[var(--text-mute)] hover:text-[var(--text-soft)] cursor-pointer"
          aria-label="Open command palette"
        >
          <Search size={13} />
          <span className="font-mono text-[12px] hidden sm:inline">Search</span>
          <kbd className="font-mono text-[11px] opacity-60 hidden sm:inline">⌘K</kbd>
        </button>
      </div>
    </header>
  )
}
