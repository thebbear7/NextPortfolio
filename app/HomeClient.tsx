'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { InfiniteGridBackground } from '@/components/ui/the-infinite-grid'
import { GlowingShadow } from '@/components/ui/glowing-shadow'
import { PerspectiveMarquee } from '@/components/ui/perspective-marquee'
import { TiltCard } from '@/components/ui/tilt-card'

// ── Certificate provider logos ─────────────────────────────────────────────────
function AwsLogo() {
  return <Image src="/logo-aws.png" alt="AWS" width={100} height={62} style={{ objectFit: 'contain' }} />
}

function GoogleLogo() {
  return <Image src="/logo-google.png" alt="Google" width={62} height={62} style={{ objectFit: 'contain' }} />
}

// ── Brand tokens ───────────────────────────────────────────────────────────────
const A   = '#d4a017'                  // glowing gold
const AG  = 'rgba(212,160,23,0.55)'   // gold glow color for shadows
const BG  = '#080808'                  // pitch black
const S   = '#111111'                  // card / surface
const BD  = 'rgba(255,255,255,0.07)'  // border
const T   = '#e8eaf0'                  // primary text
const M   = '#8b9099'                  // muted text

// r,g,b of BG for gradient overlays
const BGR = '8,8,8'

// ── Scroll-reveal wrapper ──────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Icons ──────────────────────────────────────────────────────────────────────
const EmailIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
  </svg>
)
const GitHubIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)
const ChevronDown = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
)
const DownloadIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v13M7 11l5 5 5-5"/><path d="M3 19h18"/>
  </svg>
)


// ── Golden brush scribble — sits behind the photo ─────────────────────────────
function BrushScribble() {
  // Strokes shifted +80 down from previous position
  const strokes = [
    "M 237 318 C 317 288 402 274 475 270 C 509 268 530 270 543 278",
    "M 152 368 C 237 332 334 314 436 308 C 487 304 516 306 533 316",
    "M 88  420 C 176 378 278 356 387 347 C 462 340 502 342 526 354",
    "M 57  475 C 147 430 254 404 366 393 C 448 384 492 386 516 400",
    "M 50  530 C 142 482 254 454 370 442 C 455 432 499 434 519 450",
    "M 71  585 C 162 535 278 506 394 495 C 475 486 516 488 533 504",
    "M 122 634 C 210 582 322 554 438 542 C 509 534 540 538 547 556",
    "M 207 678 C 292 626 400 598 509 588 C 553 584 570 588 560 606",
    "M 319 712 C 387 676 468 654 540 648 C 564 645 574 650 557 664",
  ]

  return (
    <svg
      viewBox="0 0 600 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {strokes.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={A}
          strokeWidth="52"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.52"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { delay: 1.4 + i * 0.12, duration: 0.32, ease: 'easeOut' },
            opacity:    { delay: 1.4 + i * 0.12, duration: 0.01 },
          }}
        />
      ))}
    </svg>
  )
}

// ── Background blobs ───────────────────────────────────────────────────────────
function BackgroundFX() {
  const orbs = [
    { w: 700, h: 700, color: 'rgba(212,160,23,0.18)',  top: '-22%',    right: '-8%',  dur: 9,  delay: 0,   dx: [0, 35, -18, 0],  dy: [0, -22, 16, 0]  },
    { w: 580, h: 580, color: 'rgba(180,120,10,0.12)',  bottom: '-18%', left: '-12%',  dur: 13, delay: 3,   dx: [0, -28, 22, 0],  dy: [0, 26, -12, 0]  },
    { w: 440, h: 440, color: 'rgba(212,160,23,0.10)',  top: '25%',     left: '28%',   dur: 17, delay: 7,   dx: [0, 22, -32, 0],  dy: [0, 32, -18, 0]  },
    { w: 520, h: 520, color: 'rgba(212,160,23,0.14)',  top: '42%',     right: '14%',  dur: 11, delay: 5,   dx: [0, -24, 18, 0],  dy: [0, -28, 12, 0]  },
  ]
  const dots = [
    { x: '12%', y: '22%', s: 3, dur: 5,   d: 0   },
    { x: '28%', y: '55%', s: 2, dur: 6.5, d: 0.8 },
    { x: '62%', y: '18%', s: 2, dur: 4.5, d: 1.6 },
    { x: '74%', y: '70%', s: 3, dur: 7,   d: 0.4 },
    { x: '45%', y: '82%', s: 2, dur: 5.5, d: 2.2 },
    { x: '88%', y: '40%', s: 2, dur: 6,   d: 1.1 },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {orbs.map((o, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.28, 0.92, 1], opacity: [0.7, 1, 0.75, 0.7], x: o.dx, y: o.dy }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
          style={{
            position: 'absolute', borderRadius: '50%',
            width: o.w, height: o.h,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 68%)`,
            filter: 'blur(55px)',
            ...(o.top    ? { top:    o.top }    : {}),
            ...(o.bottom ? { bottom: o.bottom } : {}),
            ...(o.right  ? { right:  o.right }  : {}),
            ...(o.left   ? { left:   o.left }   : {}),
          }}
        />
      ))}
      {dots.map((p, i) => (
        <motion.div key={i}
          animate={{ y: [0, -28, 0], opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.d }}
          style={{ position: 'absolute', width: p.s, height: p.s, borderRadius: '50%', background: A, left: p.x, top: p.y }}
        />
      ))}
      <motion.div
        animate={{ opacity: [0, 0.04, 0], y: ['-2%', '104%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay: 2 }}
        style={{ position: 'absolute', left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, rgba(212,160,23,0.6), transparent)` }}
      />
    </div>
  )
}

// ── Content data ───────────────────────────────────────────────────────────────
const projects = [
  {
    num: '01',
    title: 'Automated CI/CD Deployment of a 3-Tier Chat Application',
    desc: 'End-to-end pipeline for a full-stack chat app on AWS. Provisioned a VPC, subnets, security groups, and an EKS cluster with Terraform, then containerised the frontend and backend microservices with Docker. A GitHub webhook triggers fully automated Jenkins builds that push updated images straight to the cluster — no manual steps after a merge.',
    href: 'https://github.com/thebbear7',
  },
  {
    num: '02',
    title: 'Kubernetes Notes App with Full Observability Stack',
    desc: 'Deployed a three-tier React Native — Node.js — MongoDB notes application on a Minikube cluster hosted on EC2. Wrote all Dockerfiles and Kubernetes manifests from scratch, then wired in Prometheus for metrics scraping, Grafana for dashboards, and Loki for centralised log aggregation — giving the whole stack real-time visibility in one place.',
    href: 'https://github.com/thebbear7',
  },
  {
    num: '03',
    title: 'CloudFront-Based Global Image Delivery Optimisation',
    desc: 'Benchmarked AWS CloudFront against direct S3 access across three regions using 50 MB test assets. Measured from Srinagar: raw S3 load times ranged 21–33 seconds, while CloudFront\'s Mumbai edge node delivered the same content in 5 seconds — a 5–6× performance gain through CDN caching alone.',
    href: 'https://github.com/thebbear7',
  },
]

const skillGroups = [
  {
    label: 'Cloud & Infrastructure',
    skills: ['AWS EC2', 'EKS', 'S3', 'VPC', 'IAM', 'CloudFront', 'Load Balancing', 'Auto Scaling', 'High Availability', 'Fault Tolerant Systems'],
  },
  {
    label: 'CI/CD & Automation',
    skills: ['Jenkins', 'ArgoCD', 'GitHub Actions', 'Git', 'Webhook Triggers', 'Rollback Strategies', 'Groovy'],
  },
  {
    label: 'Containers & Orchestration',
    skills: ['Docker', 'Kubernetes', 'Helm', 'Minikube', 'Docker Hub', 'Docker Compose', 'Container Networking', 'HPA', 'VPA'],
  },
  {
    label: 'IaC & Config Management',
    skills: ['Terraform', 'Ansible', 'HCL', 'YAML', 'State Management', 'Drift Detection', 'CloudFormation'],
  },
  {
    label: 'Monitoring & Observability',
    skills: ['Prometheus', 'Grafana', 'Loki', 'Zabbix', 'Alerting Systems', 'Incident Response'],
  },
  {
    label: 'Languages & OS',
    skills: ['Python', 'Bash', 'SQL', 'Linux', 'Networking', 'Version Control'],
  },
]

const certifications = [
  {
    LogoEl: <AwsLogo />,
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Feb 2025',
    expires: 'Feb 2028',
    credentialId: 'fe25233996094045bbaafda2cc5fc030',
  },
  {
    LogoEl: <GoogleLogo />,
    title: 'Transformer Models and BERT Model',
    issuer: 'Google',
    issued: 'May 2025',
    expires: null,
    credentialId: '15500213',
  },
  {
    LogoEl: <GoogleLogo />,
    title: 'Attention Mechanism',
    issuer: 'Google',
    issued: 'May 2025',
    expires: null,
    credentialId: '15498136',
  },
  {
    LogoEl: <GoogleLogo />,
    title: 'Introduction to Large Language Models',
    issuer: 'Google',
    issued: 'May 2025',
    expires: null,
    credentialId: '15497046',
  },
]

const experience = [
  {
    company: 'AlMuqeet Systems',
    role: 'DevOps Engineer',
    period: 'Dec 2025 – Present',
    location: 'Srinagar, India',
    points: [
      'Designed and managed CI/CD pipelines across multiple production projects, streamlining build, test, and deployment workflows end-to-end.',
      'Deployed comprehensive monitoring and observability infrastructure using Zabbix, enabling proactive alerting and dramatically reducing MTTR.',
      'Collaborated with development teams to ensure reliable, automated software delivery with minimal downtime.',
    ],
  },
  {
    company: 'iQuasar LLC',
    role: 'DevOps Intern',
    period: 'Aug 2025 – Dec 2025',
    location: 'Remote',
    points: [
      'Built and maintained CI/CD pipelines with Jenkins and GitHub, reducing manual deployment effort and improving deployment speed by ~30% in test environments.',
      'Containerized applications using Docker and deployed them on Kubernetes clusters for scalable, resilient delivery.',
      'Provisioned cloud infrastructure with Terraform and Ansible, maintaining reproducible, version-controlled environments.',
      'Implemented monitoring and logging with Prometheus, Grafana, and Loki for end-to-end system observability.',
    ],
  },
]

const navItems = [
  { label: 'Projects',   id: 'projects',   href: null },
  { label: 'Skills',     id: 'skills',     href: null },
  { label: 'Experience', id: 'experience', href: null },
  { label: 'Blogs',      id: 'blogs',      href: '/blogs' },
  { label: 'Contact',    id: 'contact',    href: null },
]

// ── Main component ─────────────────────────────────────────────────────────────
export default function HomeClient() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div style={{ background: BG, color: T, fontFamily: 'var(--font-outfit), sans-serif' }}>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO  — full-viewport split:  photo left  |  intro right
      ═══════════════════════════════════════════════════════════════════ */}

      {/* ── DESKTOP (md+) ─────────────────────────────────────────────── */}
      <section
        className="hidden md:grid h-screen"
        style={{ gridTemplateColumns: '50% 50%', background: BG, position: 'relative' }}
      >
        {/* Blobs — covers the full section uniformly, no seam */}
        <BackgroundFX />

        {/* ── LEFT: full-bleed photo with name overlaid ── */}
        <div className="relative overflow-hidden" style={{ zIndex: 1 }}>

          {/* Golden brush scribble — behind photo */}
          <BrushScribble />

          {/* Photo + gradient overlays */}
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 1,
              /* Fade only the right edge so photo blends into the text panel */
              WebkitMaskImage: `linear-gradient(to right, black 68%, rgba(0,0,0,0.7) 82%, rgba(0,0,0,0.15) 94%, transparent 100%)`,
              maskImage:        `linear-gradient(to right, black 68%, rgba(0,0,0,0.7) 82%, rgba(0,0,0,0.15) 94%, transparent 100%)`,
            }}
          >
            {/* position:relative wrapper required by Image fill — drives enter from bottom-left */}
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 0.75, opacity: 0, x: '-12%', y: '18%' }}
              animate={{ scale: 0.8, opacity: 1, x: '0%', y: '0%' }}
              transition={{ duration: 1.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Image
                src="/mahbeer.png"
                alt="Muhammad Mahbeer"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: '50% 38%',
                  filter: 'saturate(0.45) drop-shadow(0px 8px 32px rgba(0,0,0,0.7)) drop-shadow(0px 0px 12px rgba(0,0,0,0.5))',
                }}
                priority
                sizes="50vw"
              />
            </motion.div>

            {/* Bottom dark gradient — makes name legible */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `linear-gradient(to top, rgba(${BGR},1) 0%, rgba(${BGR},0.95) 12%, rgba(${BGR},0.7) 28%, rgba(${BGR},0.2) 48%, rgba(${BGR},0) 65%)`,
            }} />
          </div>

          {/* Logo mark — top-left (outside mask so it stays crisp) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{ position: 'absolute', top: 32, left: 44, zIndex: 2 }}
          >
            <div style={{
              width: 46, height: 46, background: A, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, color: BG, fontSize: 20,
              boxShadow: `0 0 18px ${AG}, 0 0 36px rgba(212,160,23,0.25)`,
            }}>M</div>
          </motion.div>

          {/* Socials + name + accent line — bottom-left (outside mask wrapper) */}
          <div style={{ position: 'absolute', bottom: '4%', left: '9%', zIndex: 2 }}>

            {/* Social icons — stagger left→right */}
            <div className="flex items-center gap-3" style={{ marginBottom: 20 }}>
              {[
                { href: 'mailto:mohammad.mahbeer@gmail.com', label: 'Email',    icon: <EmailIcon /> },
                { href: 'https://github.com/thebbear7',      label: 'GitHub',   icon: <GitHubIcon /> },
                { href: 'https://linkedin.com/in/mahbeer',   label: 'LinkedIn', icon: <LinkedInIcon /> },
              ].map(({ href, label, icon }, i) => (
                <motion.a
                  key={label}
                  initial={{ opacity: 0, x: -36 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 + i * 0.12, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  style={{
                    width: 46, height: 46, borderRadius: '50%',
                    border: `1px solid rgba(255,255,255,0.22)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = A; e.currentTarget.style.borderColor = A }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)' }}
                >
                  {icon}
                </motion.a>
              ))}

              {/* Resume — capsule with pulsing golden border glow */}
              <motion.a
                href="/R7Pro_Mahbeer.pdf"
                download="Mahbeer_Resume.pdf"
                initial={{ opacity: 0, x: -36 }}
                animate={{
                  opacity: 1, x: 0,
                  boxShadow: [
                    `0 0 0px 0px rgba(212,160,23,0.0), inset 0 0 0 1.5px rgba(212,160,23,0.25)`,
                    `0 0 14px 3px rgba(212,160,23,0.55), inset 0 0 0 1.5px rgba(212,160,23,0.9)`,
                    `0 0 0px 0px rgba(212,160,23,0.0), inset 0 0 0 1.5px rgba(212,160,23,0.25)`,
                  ],
                }}
                transition={{
                  opacity: { delay: 1.21, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
                  x:       { delay: 1.21, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
                  boxShadow: { delay: 1.8, duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
                style={{
                  borderRadius: '9999px',
                  padding: '10px 18px',
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontSize: 13, fontWeight: 500, color: T,
                  whiteSpace: 'nowrap', letterSpacing: '0.03em',
                  textDecoration: 'none', background: BG,
                }}
              >
                <DownloadIcon />
                Get Resume
              </motion.a>
            </div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                fontSize: 'clamp(2rem, 3.2vw, 3.6rem)',
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                color: T,
              }}
            >
              Muhammad<br />Mahbeer.
            </motion.h1>

            {/* Accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 52 }}
              transition={{ delay: 0.56, duration: 0.4 }}
              style={{ height: 3, background: A, borderRadius: 2, marginTop: 14, boxShadow: `0 0 10px ${AG}, 0 0 22px rgba(212,160,23,0.3)` }}
            />
          </div>
        </div>

        {/* ── RIGHT: nav + intro content ── */}
        <div className="flex flex-col" style={{ position: 'relative', zIndex: 1 }}>

          {/* Nav — top-right, stagger right→left one by one */}
          <nav className="flex justify-end items-start gap-8 px-14 pt-9" style={{ position: 'relative', zIndex: 2 }}>
            {navItems.map(({ label, id, href }, i) => {
              const sharedStyle = {
                display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6,
                fontSize: i === 0 ? 20 : 17,
                letterSpacing: '0.04em',
                color: i === 0 ? T : M,
                fontWeight: i === 0 ? 600 : 400,
                cursor: 'pointer',
                transition: 'color 0.2s',
                textDecoration: 'none',
              }
              const motionProps = {
                key: id,
                initial: { opacity: 0, x: 40 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.1 + i * 0.1, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as any },
                onMouseEnter: (e: any) => (e.currentTarget.style.color = T),
                onMouseLeave: (e: any) => (e.currentTarget.style.color = i === 0 ? T : M),
              }
              return href ? (
                <motion.a {...motionProps} href={href} style={{
                  ...sharedStyle,
                  color: A,
                  textShadow: `0 0 18px ${AG}, 0 0 40px rgba(212,160,23,0.3)`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = T; e.currentTarget.style.textShadow = `0 0 28px ${AG}, 0 0 60px rgba(212,160,23,0.45)` }}
                  onMouseLeave={e => { e.currentTarget.style.color = A; e.currentTarget.style.textShadow = `0 0 18px ${AG}, 0 0 40px rgba(212,160,23,0.3)` }}
                >
                  {label}
                </motion.a>
              ) : (
                <motion.button {...motionProps} onClick={() => scrollTo(id)} style={{ ...sharedStyle, background: 'none', border: 'none' }}>
                  {label}
                  {i === 0 && (
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: A, boxShadow: `0 0 8px ${AG}` }} />
                  )}
                </motion.button>
              )
            })}
          </nav>

          {/* Intro — vertically centered in remaining space */}
          <div className="flex-1 flex flex-col justify-center px-14" style={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <p style={{ fontSize: 13, color: M, letterSpacing: '0.2em', marginBottom: 24 }}>
                — Introduction
              </p>

              <h2
                style={{
                  fontSize: 'clamp(1.9rem, 3vw, 2.85rem)',
                  fontWeight: 700,
                  lineHeight: 1.25,
                  marginBottom: 24,
                }}
              >
                DevOps Engineer and infrastructure automation specialist, based in Srinagar, India.
              </h2>

              <p style={{ fontSize: 16, color: M, lineHeight: 1.8, maxWidth: 400, marginBottom: 36 }}>
                Building reliable CI/CD pipelines, scalable infrastructure, and cloud-native systems that help teams ship faster and with confidence.
              </p>

              <button
                onClick={() => scrollTo('projects')}
                style={{
                  display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  fontSize: 19, color: A, background: 'none', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                  filter: `drop-shadow(0 0 8px ${AG}) drop-shadow(0 0 16px rgba(212,160,23,0.3))`,
                  alignSelf: 'flex-start',
                }}
              >
                My work
                <motion.span
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ display: 'flex', lineHeight: 1 }}
                >
                  <ChevronDown />
                </motion.span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MOBILE hero — full viewport, photo + scribble + socials only ── */}
      <section className="md:hidden relative" style={{ height: '100svh', overflow: 'hidden', background: BG }}>

        {/* Scribble behind photo */}
        <BrushScribble />

        {/* Full-bleed photo — same slide-in-from-bottom-left as desktop */}
        <motion.div
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          initial={{ scale: 0.75, opacity: 0, x: '-12%', y: '18%' }}
          animate={{ scale: 1, opacity: 1, x: '0%', y: '0%' }}
          transition={{ duration: 1.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Image src="/mahbeer.png" alt="Muhammad Mahbeer" fill
            style={{ objectFit: 'cover', objectPosition: '50% 12%', filter: 'saturate(0.45)' }} priority sizes="100vw" />
        </motion.div>

        {/* Bottom fade so content is readable */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', zIndex: 2, pointerEvents: 'none',
          background: `linear-gradient(to top, rgba(${BGR},1) 0%, rgba(${BGR},0.92) 25%, rgba(${BGR},0.5) 55%, transparent 100%)`,
        }} />

        {/* Logo */}
        <div style={{
          position: 'absolute', top: 20, left: 20, zIndex: 5,
          width: 38, height: 38, background: A, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, color: BG, fontSize: 17,
        }}>M</div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
          style={{ position: 'absolute', top: 20, right: 20, zIndex: 5, background: 'none', border: 'none', color: T, cursor: 'pointer' }}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            {menuOpen ? (
              <path d="M1 1l20 14M21 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            ) : (
              <><line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>
            )}
          </svg>
        </button>

        {/* Dropdown nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16 }}
              className="flex flex-col gap-5 px-6 py-5"
              style={{ position: 'absolute', top: 68, left: 0, right: 0, zIndex: 6, background: 'rgba(8,8,8,0.96)', borderBottom: `1px solid ${BD}` }}
            >
              {navItems.map(({ label, id, href }) => (
                href ? (
                  <a key={id} href={href}
                    style={{ fontSize: 15, color: M, textDecoration: 'none', cursor: 'pointer', textAlign: 'left' as const }}>
                    {label}
                  </a>
                ) : (
                  <button key={id} onClick={() => scrollTo(id)}
                    style={{ fontSize: 15, color: M, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' as const }}>
                    {label}
                  </button>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom: socials + resume + name */}
        <div style={{ position: 'absolute', bottom: '7%', left: '6%', right: '6%', zIndex: 3 }}>
          {/* Social icons + Get Resume — stagger left→right */}
          <div className="flex items-center gap-3" style={{ marginBottom: 20 }}>
            {[
              { href: 'mailto:mohammad.mahbeer@gmail.com', label: 'Email',    icon: <EmailIcon /> },
              { href: 'https://github.com/thebbear7',      label: 'GitHub',   icon: <GitHubIcon /> },
              { href: 'https://linkedin.com/in/mahbeer',   label: 'LinkedIn', icon: <LinkedInIcon /> },
            ].map(({ href, label, icon }, i) => (
              <motion.a key={label} href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                initial={{ opacity: 0, x: -36 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 + i * 0.12, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{
                  width: 42, height: 42, borderRadius: '50%', border: `1px solid rgba(255,255,255,0.22)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                }}
              >{icon}</motion.a>
            ))}

            {/* Get Resume capsule */}
            <motion.a
              href="/R7Pro_Mahbeer.pdf" download="Mahbeer_Resume.pdf"
              initial={{ opacity: 0, x: -36 }}
              animate={{
                opacity: 1, x: 0,
                boxShadow: [
                  `0 0 0px 0px rgba(212,160,23,0.0), inset 0 0 0 1.5px rgba(212,160,23,0.25)`,
                  `0 0 14px 3px rgba(212,160,23,0.55), inset 0 0 0 1.5px rgba(212,160,23,0.9)`,
                  `0 0 0px 0px rgba(212,160,23,0.0), inset 0 0 0 1.5px rgba(212,160,23,0.25)`,
                ],
              }}
              transition={{
                opacity:    { delay: 1.21, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
                x:          { delay: 1.21, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
                boxShadow:  { delay: 1.8, duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{
                borderRadius: '9999px', padding: '10px 16px',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, fontWeight: 500, color: T,
                whiteSpace: 'nowrap', textDecoration: 'none', background: BG,
              }}
            >
              <DownloadIcon />Get Resume
            </motion.a>
          </div>

          {/* Name — slides from left */}
          <motion.h1
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: T }}
          >
            Muhammad<br />Mahbeer.
          </motion.h1>

          {/* Accent line — draws in */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 44 }}
            transition={{ delay: 0.56, duration: 0.4 }}
            style={{ height: 3, background: A, borderRadius: 2, marginTop: 12,
              boxShadow: `0 0 10px ${AG}, 0 0 22px rgba(212,160,23,0.3)` }}
          />
        </div>
      </section>

      {/* ── MOBILE intro — shown on scroll ───────────────────────────────── */}
      <section className="md:hidden px-6 py-14" style={{ background: BG }}>
        <p style={{ fontSize: 11, color: M, letterSpacing: '0.2em', marginBottom: 16 }}>— Introduction</p>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 600, lineHeight: 1.35, marginBottom: 16 }}>
          DevOps Engineer and infrastructure automation specialist, based in Srinagar, India.
        </h2>
        <p style={{ fontSize: 13, color: M, lineHeight: 1.75, marginBottom: 28 }}>
          Building reliable CI/CD pipelines, scalable infrastructure, and cloud-native systems that help teams ship faster and with confidence.
        </p>
        <button onClick={() => scrollTo('projects')}
          style={{
            display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            fontSize: 17, color: A, background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontWeight: 600,
            filter: `drop-shadow(0 0 8px ${AG}) drop-shadow(0 0 16px rgba(212,160,23,0.3))`,
          }}
        >
          My work
          <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', lineHeight: 1 }}>
            <ChevronDown />
          </motion.span>
        </button>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="projects" className="relative px-6 md:px-16 py-24" style={{ borderTop: `1px solid ${BD}` }}>
        <InfiniteGridBackground />

        <div className="relative" style={{ zIndex: 1 }}>
          <Reveal>
            <p style={{ fontSize: 13, color: A, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Selected work</p>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 56 }}>Projects.</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {projects.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.1} className="h-full">
                <GlowingShadow>
                  <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <p style={{ fontSize: 44, fontWeight: 700, color: 'rgba(245,197,24,0.12)', lineHeight: 1, marginBottom: 20 }}>{p.num}</p>
                    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 14 }}>{p.title}</h3>
                    <p style={{ fontSize: 15, color: M, lineHeight: 1.75, marginBottom: 24 }}>{p.desc}</p>
                    <a href={p.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-auto"
                      style={{ fontSize: 14, color: A, textDecoration: 'none', fontWeight: 500, letterSpacing: '0.04em' }}
                    >
                      View on GitHub <ArrowIcon />
                    </a>
                  </div>
                </GlowingShadow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SKILLS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="skills" className="py-24" style={{ borderTop: `1px solid ${BD}` }}>
        <div className="px-6 md:px-16">
          <Reveal>
            <p style={{ fontSize: 11, color: A, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Toolbox</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 40 }}>Skills.</h2>
          </Reveal>
        </div>

        <PerspectiveMarquee />

        <div className="px-6 md:px-16 mt-12">
        <div className="grid md:grid-cols-3 gap-5 mb-12 items-stretch">
          {skillGroups.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.07} className="h-full">
              <GlowingShadow>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <p style={{ fontSize: 10, color: A, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>{g.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.skills.map(sk => (
                      <span key={sk} style={{
                        fontSize: 13, color: T, background: 'rgba(255,255,255,0.05)',
                        border: `1px solid ${BD}`, borderRadius: 8, padding: '5px 12px',
                      }}>{sk}</span>
                    ))}
                  </div>
                </div>
              </GlowingShadow>
            </Reveal>
          ))}
        </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CERTIFICATIONS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="certifications" className="px-6 md:px-16 py-24" style={{ borderTop: `1px solid ${BD}` }}>
        <Reveal>
          <p style={{ fontSize: 11, color: A, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Credentials</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 56 }}>Certifications.</h2>
        </Reveal>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <Reveal key={cert.credentialId} delay={i * 0.08}>
              <TiltCard style={{ borderRadius: 14 }} spotlight={false}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  border: '1px solid rgba(0,0,0,0.09)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                  aspectRatio: '4 / 3',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  padding: '20px 16px 18px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Top gold bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: 'linear-gradient(90deg, #b8860b, #d4a017, #f5c518, #d4a017, #b8860b)',
                    borderRadius: '14px 14px 0 0',
                  }} />

                  {/* Logo — occupies top half */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {cert.LogoEl}
                  </div>

                  {/* Text block — pinned to bottom */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: '100%' }}>
                    <div style={{ width: 32, height: 1, background: 'rgba(212,160,23,0.35)', marginBottom: 2 }} />
                    <h3 style={{ fontSize: 12.5, fontWeight: 700, color: '#111827', lineHeight: 1.35, margin: 0, padding: '0 4px' }}>
                      {cert.title}
                    </h3>
                    <p style={{ fontSize: 10.5, color: '#6B7280', fontWeight: 600, margin: 0 }}>{cert.issuer}</p>
                    <p style={{ fontSize: 9.5, color: '#9CA3AF', margin: 0 }}>
                      Issued {cert.issued}{cert.expires ? ` · Expires ${cert.expires}` : ''}
                    </p>
                    <p style={{ fontSize: 8.5, color: '#C4C9D4', fontFamily: 'monospace', margin: 0, letterSpacing: '0.03em' }}>
                      {cert.credentialId}
                    </p>
                  </div>

                  {/* Bottom gold bar */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
                    background: 'linear-gradient(90deg, #b8860b, #d4a017, #f5c518, #d4a017, #b8860b)',
                    borderRadius: '0 0 14px 14px',
                  }} />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EXPERIENCE
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="experience" className="px-6 md:px-16 py-24" style={{ borderTop: `1px solid ${BD}` }}>
        <Reveal>
          <p style={{ fontSize: 11, color: A, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Career</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 56 }}>Experience.</h2>
        </Reveal>

        <div className="flex flex-col gap-5">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.12}>
              <GlowingShadow>
                <div
                  className="grid md:grid-cols-[200px_1fr] gap-8 items-start"
                  style={{ padding: '32px 36px', height: '100%' }}
                >
                  <div>
                    <p style={{ fontSize: 11, color: A, fontWeight: 500, letterSpacing: '0.04em', marginBottom: 12 }}>{job.period}</p>
                    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>{job.company}</h3>
                    <p style={{ fontSize: 13, color: M, marginBottom: 4 }}>{job.role}</p>
                    <p style={{ fontSize: 11, color: '#4a5060', letterSpacing: '0.04em' }}>{job.location}</p>
                  </div>
                  <ul className="flex flex-col gap-4" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {job.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: A, marginTop: 8, flexShrink: 0 }} />
                        <p style={{ fontSize: 14, color: M, lineHeight: 1.75 }}>{pt}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowingShadow>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="px-6 md:px-16 py-24" style={{ borderTop: `1px solid ${BD}` }}>
        <Reveal>
          <p style={{ fontSize: 11, color: A, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Get in touch</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
            Let&apos;s work<br />together.
          </h2>
          <p style={{ fontSize: 15, color: M, maxWidth: 440, lineHeight: 1.75, marginBottom: 44 }}>
            Have a project in mind or want to connect? I&apos;m always open to interesting conversations and collaboration.
          </p>

          <a href="mailto:mohammad.mahbeer@gmail.com"
            className="inline-flex items-center gap-3 mb-12"
            style={{ fontSize: 17, fontWeight: 500, color: T, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = A)}
            onMouseLeave={e => (e.currentTarget.style.color = T)}
          >
            mohammad.mahbeer@gmail.com <ArrowIcon />
          </a>

          <div className="flex flex-wrap gap-3 mb-20">
            {[
              { href: 'https://github.com/thebbear7',    label: 'GitHub',   icon: <GitHubIcon /> },
              { href: 'https://linkedin.com/in/mahbeer', label: 'LinkedIn', icon: <LinkedInIcon /> },
            ].map(({ href, label, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5"
                style={{
                  fontSize: 13, color: M, textDecoration: 'none',
                  border: `1px solid ${BD}`, borderRadius: 10, padding: '9px 18px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = T; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.color = M; e.currentTarget.style.borderColor = BD }}
              >
                {icon} {label}
              </a>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row md:justify-between gap-2" style={{ borderTop: `1px solid ${BD}`, paddingTop: 28 }}>
          <p style={{ fontSize: 12, color: '#666e7a' }}>© 2026 Muhammad Mahbeer. All rights reserved.</p>
          <p style={{ fontSize: 12, color: '#666e7a' }}>DevOps Engineer · Srinagar, India</p>
        </div>
      </section>
    </div>
  )
}
