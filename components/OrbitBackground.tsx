'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'

// Half-ellipse orbit: only the top half is visible; the rest is below the viewport.
// rx = half the horizontal span, ry = the full radius (screen overflows vertically).
const RX = 480
const RY = 300

// SVG viewBox is centered at (500, 600) — center of ellipse is at bottom of screen.
// The visible arc goes from (500-RX, 600) across the top to (500+RX, 600).
const CX = 500
const CY = 600

export default function OrbitBackground() {
  const dotRef = useRef<SVGCircleElement>(null)
  const raf = useRef<number | null>(null)
  const startTime = useRef<number | null>(null)
  const PERIOD = 12000 // ms for one full orbit

  useEffect(() => {
    function tick(ts: number) {
      if (!startTime.current) startTime.current = ts
      const elapsed = ts - startTime.current
      const t = (elapsed % PERIOD) / PERIOD // 0..1

      // Parametric ellipse: angle goes 0 → 2π
      // Start at the right tip (angle=0), go counter-clockwise so the planet
      // sweeps across the top arc visibly.
      const angle = t * 2 * Math.PI
      const x = CX + RX * Math.cos(angle)
      const y = CY - RY * Math.sin(angle) // minus because SVG y is inverted

      if (dotRef.current) {
        dotRef.current.setAttribute('cx', String(x))
        dotRef.current.setAttribute('cy', String(y))
      }

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [])

  const ellipsePath = `M ${CX - RX} ${CY} A ${RX} ${RY} 0 1 1 ${CX + RX} ${CY}`

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 600"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '70%' }}
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Orbit track */}
        <path
          d={ellipsePath}
          fill="none"
          stroke="rgba(124, 106, 247, 0.12)"
          strokeWidth="1"
        />

        {/* Glow beneath the dot */}
        <circle
          cx={CX}
          cy={CY}
          r="16"
          fill="rgba(124, 106, 247, 0.06)"
          ref={undefined}
          id="dot-glow"
        />

        {/* Moving planet dot */}
        <circle
          ref={dotRef}
          cx={CX + RX}
          cy={CY}
          r="4"
          fill="#7c6af7"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}
