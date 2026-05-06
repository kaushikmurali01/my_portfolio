import { useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { models } from '../data/pricing'

function formatCost(n: number): string {
  if (n < 0.01) return `$${n.toFixed(4)}`
  if (n < 1) return `$${n.toFixed(3)}`
  if (n < 100) return `$${n.toFixed(2)}`
  return `$${Math.round(n).toLocaleString()}`
}

function formatNum(n: number): string {
  return n.toLocaleString()
}

interface SliderRowProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format?: (v: number) => string
}

function SliderRow({ label, value, min, max, step, onChange, format }: SliderRowProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-[var(--text-mute)] uppercase tracking-[0.12em]">
          {label}
        </span>
        <span className="font-mono text-[13px] text-[var(--text-soft)]">
          {format ? format(value) : formatNum(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-label={label}
      />
    </div>
  )
}

export function TokenCalculator() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [modelId, setModelId] = useState('claude-sonnet-4-6')
  const [prs, setPrs] = useState(5000)
  const [inputTokens, setInputTokens] = useState(6000)
  const [outputTokens, setOutputTokens] = useState(800)

  const model = models.find((m) => m.id === modelId) ?? models[1]

  const results = useMemo(() => {
    const totalIn = prs * inputTokens
    const totalOut = prs * outputTokens
    const costWithout =
      (totalIn / 1_000_000) * model.inputPer1M + (totalOut / 1_000_000) * model.outputPer1M

    let costWith: number
    if (model.supportsCache) {
      const cachedIn = totalIn * 0.6
      const freshIn = totalIn * 0.4
      costWith =
        (cachedIn / 1_000_000) * (model.inputPer1M * 0.1) +
        (freshIn / 1_000_000) * model.inputPer1M +
        (totalOut / 1_000_000) * model.outputPer1M
    } else {
      costWith = costWithout
    }

    const savings = costWithout - costWith
    const pctSaved = costWithout > 0 ? (savings / costWithout) * 100 : 0
    return { costWithout, costWith, savings, pctSaved }
  }, [model, prs, inputTokens, outputTokens])

  return (
    <section id="tools" ref={ref} className="px-8 pb-28">
      <div className="max-w-content mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.2em] mb-4">
            Playground
          </div>
          <h2 className="font-display font-medium tracking-[-0.03em] text-4xl sm:text-5xl text-[var(--text)] leading-[1.05]">
            LLM token cost{' '}
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>calculator</span>.
          </h2>
          <p className="mt-4 text-[15px] text-[var(--text-soft)] max-w-xl">
            Built to model prompt caching savings for my Code Review Bot. Adjust the sliders to
            estimate your monthly spend.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="rounded-2xl border border-[var(--border)] overflow-hidden"
          style={{ background: 'var(--bg-card)' }}
        >
          <div className="grid lg:grid-cols-[1fr_1px_1fr]">
            {/* Left: inputs */}
            <div className="p-7 flex flex-col gap-7">
              <div>
                <div className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em] mb-3">
                  Model
                </div>
                <select
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] font-mono text-[13px] text-[var(--text-soft)] focus:border-[var(--accent)] focus:outline-none transition-colors cursor-pointer"
                  aria-label="Select model"
                >
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}{m.description ? ` · ${m.description}` : ''}
                    </option>
                  ))}
                </select>
                <div className="flex justify-between mt-2 font-mono text-[11px] text-[var(--text-faint)]">
                  <span>Input: ${model.inputPer1M}/1M tokens</span>
                  <span>Output: ${model.outputPer1M}/1M tokens</span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <SliderRow label="PRs per month" value={prs} min={100} max={100000} step={100} onChange={setPrs} />
                <SliderRow label="Avg input tokens / PR" value={inputTokens} min={500} max={20000} step={100} onChange={setInputTokens} />
                <SliderRow label="Avg output tokens / PR" value={outputTokens} min={100} max={5000} step={50} onChange={setOutputTokens} />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block bg-[var(--border)]" aria-hidden="true" />

            {/* Right: results */}
            <div className="p-7 flex flex-col gap-5">
              <div className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em]">
                Monthly cost estimate
              </div>

              {/* Cost rows */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                  <span className="font-mono text-[12px] text-[var(--text-mute)]">Without caching</span>
                  <span className="font-display font-semibold text-2xl text-[var(--text)] tracking-tight">
                    {formatCost(results.costWithout)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                  <div>
                    <div className="font-mono text-[12px]" style={{ color: 'var(--accent)' }}>
                      With prompt caching
                    </div>
                    {model.supportsCache && (
                      <div className="font-mono text-[10px] text-[var(--text-faint)] mt-0.5">
                        60% cache hit assumed
                      </div>
                    )}
                  </div>
                  <span
                    className="font-display font-semibold text-2xl tracking-tight"
                    style={{ color: model.supportsCache ? 'var(--accent)' : 'var(--text-faint)' }}
                  >
                    {model.supportsCache ? formatCost(results.costWith) : 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="font-mono text-[12px]" style={{ color: 'var(--green)' }}>
                    Savings
                  </span>
                  <span
                    className="font-display font-semibold text-2xl tracking-tight"
                    style={{ color: 'var(--green)' }}
                  >
                    {model.supportsCache ? `${Math.round(results.pctSaved)}%` : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Callout */}
              {model.supportsCache && results.savings > 0 && (
                <div
                  className="rounded-lg px-4 py-3.5 mt-auto"
                  style={{
                    background: 'rgba(74,222,128,0.05)',
                    border: '1px solid rgba(74,222,128,0.18)',
                  }}
                >
                  <p className="font-mono text-[12px] leading-relaxed" style={{ color: 'var(--green)' }}>
                    That's{' '}
                    <strong>{formatCost(results.savings)}</strong> saved per month at this
                    volume with prompt caching.
                  </p>
                </div>
              )}

              {!model.supportsCache && (
                <div
                  className="rounded-lg px-4 py-3.5 mt-auto"
                  style={{
                    background: 'rgba(110,110,118,0.05)',
                    border: '1px solid rgba(110,110,118,0.15)',
                  }}
                >
                  <p className="font-mono text-[12px]" style={{ color: 'var(--text-faint)' }}>
                    This model doesn't support prompt caching via API.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="px-7 py-3 border-t border-[var(--border)] flex items-center justify-between flex-wrap gap-2">
            <span className="font-mono text-[10px] text-[var(--text-faint)]">
              Source: public API pricing · estimates only
            </span>
            <span className="font-mono text-[10px] text-[var(--text-faint)]">
              Updates live as you adjust sliders
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
