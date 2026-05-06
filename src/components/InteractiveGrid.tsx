// Adapted from MagicUI InteractiveGridPattern — magicui.design (featured on 21st.dev)
// Source: github.com/magicuidesign/magicui — interactive-grid-pattern
import { useEffect, useRef, useState } from 'react'

const CELL = 52

export function InteractiveGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([e]) => {
      setSize({ w: e.contentRect.width, h: e.contentRect.height })
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  const cols = Math.ceil(size.w / CELL) + 1
  const rows = Math.ceil(size.h / CELL) + 1

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {size.w > 0 && (
        <svg
          width={size.w}
          height={size.h}
          className="absolute inset-0"
        >
          {Array.from({ length: cols * rows }, (_, i) => {
            const col = i % cols
            const row = Math.floor(i / cols)
            const isHot = hovered === i
            return (
              <rect
                key={i}
                x={col * CELL}
                y={row * CELL}
                width={CELL}
                height={CELL}
                fill={isHot ? 'rgba(255,92,40,0.18)' : 'transparent'}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.5"
                style={{ transition: isHot ? 'fill 0.05s' : 'fill 1.4s ease-out' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            )
          })}
        </svg>
      )}
    </div>
  )
}
