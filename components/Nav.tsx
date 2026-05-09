'use client'

import { motion } from 'framer-motion'
import type { ModalType } from '@/lib/types'

const links: { label: string; key: ModalType }[] = [
  { label: 'Experience', key: 'experience' },
  { label: 'Projects', key: 'projects' },
  { label: 'Blogs', key: 'blogs' },
  { label: 'Contact', key: 'contact' },
]

interface NavProps {
  onOpen: (modal: ModalType) => void
}

export default function Nav({ onOpen }: NavProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
      {/* Logo / name mark */}
      <motion.button
        onClick={() => {}}
        className="text-sm font-medium text-neutral-400 hover:text-neutral-100 transition-colors tracking-wide"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        mahbeer.in
      </motion.button>

      {/* Nav links */}
      <nav className="flex items-center gap-8">
        {links.map(({ label, key }) => (
          <motion.button
            key={key}
            onClick={() => onOpen(key)}
            className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors tracking-wide relative group"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            {label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
          </motion.button>
        ))}
      </nav>
    </header>
  )
}
