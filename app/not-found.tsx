import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100svh', background: '#080808', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-outfit), sans-serif', textAlign: 'center', padding: '0 24px',
    }}>
      <p style={{ fontSize: 12, color: '#d4a017', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20 }}>
        404
      </p>
      <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 600, color: '#e8eaf0', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20 }}>
        Not found.
      </h1>
      <div style={{ width: 40, height: 2, background: '#d4a017', borderRadius: 2, marginBottom: 28 }} />
      <p style={{ fontSize: 15, color: '#8b9099', marginBottom: 36 }}>
        This page doesn&apos;t exist.
      </p>
      <Link href="/" style={{
        fontSize: 13, color: '#8b9099', textDecoration: 'none', letterSpacing: '0.08em',
        display: 'inline-flex', alignItems: 'center', gap: 8,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Go home
      </Link>
    </div>
  )
}
