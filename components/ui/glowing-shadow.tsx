'use client'

import './glowing-shadow.css'
import type { ReactNode } from 'react'

interface GlowingShadowProps {
  children: ReactNode
}

export function GlowingShadow({ children }: GlowingShadowProps) {
  return (
    <div className="gs-container">
      <div className="gs-content">{children}</div>
    </div>
  )
}
