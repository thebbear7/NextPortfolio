'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const BG  = '#080808'
const A   = '#d4a017'
const M   = '#8b9099'
const T   = '#e8eaf0'
const BD  = 'rgba(255,255,255,0.07)'

export default function BlogsPage() {
  return (
    <div style={{ minHeight: '100svh', background: BG, display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 48px', borderBottom: `1px solid ${BD}`,
        position: 'sticky', top: 0, zIndex: 10, background: 'rgba(8,8,8,0.85)',
        backdropFilter: 'blur(12px)',
      }}>
        <Link href="/" style={{
          fontSize: 13, color: M, textDecoration: 'none', letterSpacing: '0.08em',
          display: 'flex', alignItems: 'center', gap: 8,
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = T)}
          onMouseLeave={e => (e.currentTarget.style.color = M)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          mahbeer.in
        </Link>

        <span style={{ fontSize: 12, color: M, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Blogs
        </span>
      </header>

      {/* Main — centered */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ fontSize: 12, color: A, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}
        >
          Articles & writing
        </motion.p>

        {/* Big heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            fontWeight: 600,
            lineHeight: 1.05,
            color: T,
            letterSpacing: '-0.03em',
            marginBottom: 28,
          }}
        >
          Coming soon.
        </motion.h1>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ width: 48, height: 2, background: A, borderRadius: 2, marginBottom: 32, transformOrigin: 'left' }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ fontSize: 16, color: M, lineHeight: 1.75, maxWidth: 420 }}
        >
          I&apos;ll be writing about DevOps, infrastructure, and things I learn on the job.
          Check back soon.
        </motion.p>
      </main>

      {/* Footer */}
      <footer style={{ padding: '24px 48px', borderTop: `1px solid ${BD}`, textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#4a5060' }}>© 2026 Muhammad Mahbeer</p>
      </footer>
    </div>
  )
}
