import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-8 py-8">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[12px] text-[var(--text-faint)]">
          © 2026 Kaushik Murali · Toronto
        </p>

        <div className="flex items-center gap-5">
          {[
            {
              href: 'https://github.com/kaushikmurali01',
              label: 'GitHub',
              icon: <Github size={16} />,
            },
            {
              href: 'https://linkedin.com/in/kaushikmurali01',
              label: 'LinkedIn',
              icon: <Linkedin size={16} />,
            },
            {
              href: 'mailto:kaushik.muralig@gmail.com',
              label: 'Email',
              icon: <Mail size={16} />,
            },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
