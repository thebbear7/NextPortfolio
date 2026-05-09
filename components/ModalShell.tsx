'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface ModalShellProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const panel = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 28, stiffness: 260 } },
  exit: { x: '100%', opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } },
}

export default function ModalShell({ title, onClose, children }: ModalShellProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.25 }}
        className="absolute inset-0 z-30 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <motion.aside
        key="panel"
        variants={panel}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute top-0 right-0 z-40 h-full w-full max-w-lg bg-[#111116] border-l border-white/5 flex flex-col shadow-2xl"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 shrink-0">
          <h2 className="text-sm font-medium text-neutral-300 tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-200 transition-colors p-1 -mr-1"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {children}
        </div>
      </motion.aside>
    </>
  )
}
