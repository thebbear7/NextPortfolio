'use client'

import ModalShell from './ModalShell'

interface Props { onClose: () => void }

const links = [
  {
    label: 'Email',
    value: 'mohammad.mahbeer@gmail.com',
    href: 'mailto:mohammad.mahbeer@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/thebbear7',
    href: 'https://github.com/thebbear7',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mahbeer',
    href: 'https://linkedin.com/in/mahbeer',
  },
]

export default function ContactModal({ onClose }: Props) {
  return (
    <ModalShell title="Contact" onClose={onClose}>
      <p className="text-sm text-neutral-400 leading-relaxed">
        I&apos;m open to DevOps roles, freelance infrastructure work, and interesting conversations.
        The best way to reach me is email.
      </p>

      <div className="space-y-4">
        {links.map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center justify-between group py-3 border-b border-white/5 hover:border-white/10 transition-colors"
          >
            <div>
              <p className="text-xs text-neutral-600 mb-0.5">{label}</p>
              <p className="text-sm text-neutral-300 group-hover:text-neutral-100 transition-colors">
                {value}
              </p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-neutral-700 group-hover:text-accent transition-colors"
            >
              <path
                d="M2 12L12 2M12 2H5M12 2v7"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </div>
    </ModalShell>
  )
}
