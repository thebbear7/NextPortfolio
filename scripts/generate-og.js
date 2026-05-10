const sharp = require('sharp')
const path = require('path')

const W = 1200
const H = 630

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="88%" cy="12%" r="45%">
      <stop offset="0%" stop-color="#d4a017" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#d4a017" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="18%" cy="92%" r="38%">
      <stop offset="0%" stop-color="#d4a017" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#d4a017" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#080808"/>

  <!-- Gold glow blobs -->
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>

  <!-- Faint large M watermark on right -->
  <text x="980" y="560" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="520" font-weight="700"
    fill="#d4a017" fill-opacity="0.04"
    letter-spacing="-8">M</text>

  <!-- Top separator line -->
  <rect x="0" y="0" width="${W}" height="3"
    fill="url(#g1)"/>

  <!-- M logo box — matches site exactly -->
  <rect x="72" y="56" width="72" height="72" rx="16" fill="#d4a017"/>
  <!-- Glow behind box -->
  <rect x="72" y="56" width="72" height="72" rx="16" fill="#d4a017" fill-opacity="0.35" filter="url(#glow)"/>
  <text x="108" y="112" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="42" font-weight="700"
    fill="#080808">M</text>

  <!-- Thin horizontal rule below logo -->
  <rect x="72" y="162" width="${W - 144}" height="1" fill="#ffffff" fill-opacity="0.06"/>

  <!-- "Muhammad" small label -->
  <text x="72" y="248"
    font-family="Arial, Helvetica, sans-serif"
    font-size="15" fill="#8b9099"
    letter-spacing="4">MUHAMMAD</text>

  <!-- "Mahbeer." large -->
  <text x="72" y="378"
    font-family="Arial, Helvetica, sans-serif"
    font-size="112" font-weight="700"
    fill="#e8eaf0"
    letter-spacing="-3">Mahbeer.</text>

  <!-- Gold accent line -->
  <rect x="72" y="400" width="60" height="3" rx="2" fill="#d4a017"/>

  <!-- Role -->
  <text x="72" y="460"
    font-family="Arial, Helvetica, sans-serif"
    font-size="28" fill="#8b9099">DevOps Engineer</text>

  <!-- Domain — bottom left -->
  <text x="72" y="592"
    font-family="Arial, Helvetica, sans-serif"
    font-size="16" fill="#4a5060">mahbeer.in</text>
</svg>
`

const outPath = path.join(__dirname, '..', 'public', 'og-image.png')

sharp(Buffer.from(svg))
  .png()
  .toFile(outPath)
  .then(info => {
    console.log(`✓ OG image generated: public/og-image.png (${info.width}x${info.height})`)
  })
  .catch(err => {
    console.error('✗ Failed:', err.message)
    process.exit(1)
  })
