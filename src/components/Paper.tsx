import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

export function Paper() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="paper" ref={ref} className="px-8 pb-28">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.2em] mb-4">
            Publication
          </div>

          <h2 className="font-display font-medium tracking-[-0.03em] text-4xl sm:text-5xl text-[var(--text)] mb-12 max-w-3xl leading-[1.05]">
            Co-authored research on{' '}
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Vision Transformers</span>{' '}
            for medical imaging.
          </h2>

          {/* Card */}
          <div
            className="rounded-2xl border border-[var(--border)] overflow-hidden"
            style={{ background: 'var(--bg-card)' }}
          >
            {/* Top gradient stripe */}
            <div
              className="h-px w-full"
              style={{ background: 'linear-gradient(90deg, var(--accent) 0%, transparent 60%)' }}
            />

            <div className="p-8 lg:p-10 grid lg:grid-cols-[1fr_280px] gap-10">
              {/* Main content */}
              <div>
                <h3 className="font-display font-medium tracking-[-0.02em] text-xl sm:text-2xl text-[var(--text)] mb-4 leading-snug">
                  A Comparative Study of CNN, ResNet, and Vision Transformers for
                  Multi-Classification of Chest Diseases
                </h3>

                <p className="font-mono text-[13px] text-[var(--text-mute)] mb-6">
                  Ananya Jain · Aviral Bhardwaj ·{' '}
                  <span
                    className="border-b"
                    style={{ borderColor: 'var(--accent)', color: 'var(--text-soft)' }}
                  >
                    Kaushik Murali
                  </span>{' '}
                  · Isha Surani
                </p>

                <p className="text-[15px] leading-relaxed text-[var(--text-soft)] mb-8 max-w-prose">
                  Two Vision Transformer variants (one ImageNet-pretrained, one trained from
                  scratch) benchmarked against CNN and ResNet baselines on the NIH ChestX-ray14
                  dataset of over 100K frontal X-rays across 14 disease classes. The pretrained ViT
                  outperformed both, demonstrating the strength of transformer-based architectures
                  in medical imaging when starting from a strong visual prior.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://arxiv.org/abs/2406.00237"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-[14px] font-medium text-white transition-all"
                    style={{
                      background: 'var(--accent)',
                      boxShadow: '0 0 16px rgba(255,92,40,0.25)',
                    }}
                  >
                    Read paper <ExternalLink size={13} />
                  </a>
                  <a
                    href="https://github.com/kaushikmurali01/ViT-Chest-Xray"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] font-sans text-[14px] text-[var(--text-soft)] hover:border-[var(--border-hi)] hover:text-[var(--text)] transition-all"
                  >
                    <Github size={13} />
                    Source code
                  </a>
                </div>
              </div>

              {/* Metadata sidebar */}
              <div
                className="rounded-xl border border-[var(--border)] p-6 self-start"
                style={{ background: 'var(--bg-elev)' }}
              >
                <div className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-widest mb-4">
                  Metadata
                </div>
                <table className="w-full text-[12px] font-mono">
                  <tbody>
                    {[
                      ['Published', 'May 2024'],
                      ['Dataset', 'NIH ChestX-ray14'],
                      ['Classes', '14 diseases'],
                      ['Top model', 'ViT-pretrained'],
                      ['Authors', '4 (UofT)'],
                    ].map(([key, val]) => (
                      <tr key={key} className="border-b border-[var(--border)] last:border-0">
                        <td className="py-2.5 pr-4 text-[var(--text-faint)] whitespace-nowrap">
                          {key}
                        </td>
                        <td className="py-2.5 text-[var(--text-soft)] text-right">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
