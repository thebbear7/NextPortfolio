'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import {
  SiDocker, SiKubernetes, SiTerraform, SiAnsible,
  SiJenkins, SiPrometheus, SiGrafana, SiGithubactions,
  SiLinux, SiGnubash, SiPython, SiGit,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const ITEMS = [
  { name: 'Docker',          Icon: SiDocker,            color: '#2496ED' },
  { name: 'Kubernetes',      Icon: SiKubernetes,        color: '#326CE5' },
  { name: 'Terraform',       Icon: SiTerraform,         color: '#7B42BC' },
  { name: 'Ansible',         Icon: SiAnsible,           color: '#EE0000' },
  { name: 'Jenkins',         Icon: SiJenkins,           color: '#D24939' },
  { name: 'Prometheus',      Icon: SiPrometheus,        color: '#E6522C' },
  { name: 'Grafana',         Icon: SiGrafana,           color: '#F46800' },
  { name: 'GitHub Actions',  Icon: SiGithubactions,     color: '#2088FF' },
  { name: 'AWS',             Icon: FaAws,               color: '#FF9900' },
  { name: 'Linux',           Icon: SiLinux,             color: '#FCC624' },
  { name: 'Bash',            Icon: SiGnubash,           color: '#4EAA25' },
  { name: 'Python',          Icon: SiPython,            color: '#3776AB' },
  { name: 'Git',             Icon: SiGit,               color: '#F05032' },
]

const ITEM_W         = 140   // px per item slot
const PIXELS_PER_MS  = 0.05
const ONE_SET_WIDTH  = ITEMS.length * ITEM_W
const FADE           = '#080808'

const RENDERED = [...ITEMS, ...ITEMS, ...ITEMS]

export function PerspectiveMarquee() {
  const offsetRef = useRef(0)
  const x = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    offsetRef.current -= PIXELS_PER_MS * delta
    if (Math.abs(offsetRef.current) >= ONE_SET_WIDTH) {
      offsetRef.current += ONE_SET_WIDTH
    }
    x.set(offsetRef.current)
  })

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 120,
        overflow: 'hidden',
        perspective: '1200px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* 3-D tilted track */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          transform: 'rotateX(7deg) rotateY(-22deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div style={{ display: 'flex', x }}>
          {RENDERED.map((item, i) => (
            <div
              key={i}
              style={{
                width: ITEM_W,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
              }}
            >
              <item.Icon size={62} color={item.color} style={{ opacity: 0.85 }} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Horizontal fade */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(90deg, ${FADE} 0%, transparent 18%, transparent 82%, ${FADE} 100%)`,
      }} />
      {/* Vertical fade */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(180deg, ${FADE} 0%, transparent 30%, transparent 70%, ${FADE} 100%)`,
      }} />
    </div>
  )
}
