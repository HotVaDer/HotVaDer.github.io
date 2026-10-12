// Hand-built SVG artwork: the GT2 RS, the cover stickers and the desk props.

window.ART = (() => {
  let uid = 0;

  // ---------- GT2 RS side profile (viewBox 0 0 600 210, facing left) ----------
  const BODY = 'M 28,186 L 20,178 C 15,168 15,156 22,148 C 30,138 44,128 62,118 C 74,111 86,106 100,104 C 130,101 170,99 206,96 C 232,80 264,58 300,48 C 316,44 340,42 356,43 C 410,48 470,72 520,96 C 548,108 568,112 582,114 C 588,120 589,134 587,148 L 584,170 C 582,182 574,186 562,186 L 482,186 A 51 51 0 1 0 402 186 L 179,186 A 48 48 0 1 0 101 186 Z';
  const GLASS = 'M 216,97 C 236,82 266,62 300,53 C 318,48 340,47 358,48 C 388,52 412,64 428,80 C 400,86 300,94 216,97 Z';
  const WING = 'M 500,62 C 532,58 566,56 594,56 L 595,64 C 566,65 532,67 502,70 Z';
  const UPRIGHTS = 'M 526,100 L 534,66 L 540,66 L 533,101 Z M 552,108 L 562,64 L 568,64 L 559,109 Z';
  const ENDPLATE = 'M 570,46 L 594,45 C 597,56 598,70 596,82 L 573,84 C 571,72 570,58 570,46 Z';
  const DOORS = 'M 214,99 C 216,130 219,160 222,184 M 378,92 C 383,120 384,155 380,184';
  const PILLAR = 'M 350,48 L 372,90';
  const INTAKE = 'M 386,103 C 396,100 408,99 418,100 L 414,111 C 405,110 396,111 385,114 Z';
  const LOUVRES = 'M 126,104 l 9,-1 M 139,103 l 9,-1 M 152,102 l 9,-1';
  const FRONT = { x: 140, y: 158, r: 42 };
  const REAR = { x: 442, y: 155, r: 45 };

  const polar = (cx, cy, r, deg) => {
    const a = (deg * Math.PI) / 180;
    return [(cx + r * Math.cos(a)).toFixed(2), (cy + r * Math.sin(a)).toFixed(2)];
  };

  function wheel({ x, y, r }) {
    const rim = r * 0.74;
    const ro = rim * 0.92, ri = rim * 0.56;
    const [o1x, o1y] = polar(x, y, ro, -80), [o2x, o2y] = polar(x, y, ro, -20);
    const [i2x, i2y] = polar(x, y, ri, -20), [i1x, i1y] = polar(x, y, ri, -80);
    const spokes = Array.from({ length: 10 }, (_, i) =>
      `<rect x="${x - 1.9}" y="${(y - rim + 1.5).toFixed(1)}" width="3.8" height="${(rim * 0.72).toFixed(1)}" rx="1.5" transform="rotate(${i * 36} ${x} ${y})"/>`
    ).join('');
    return `
      <circle cx="${x}" cy="${y}" r="${r}" fill="#121212"/>
      <circle cx="${x}" cy="${y}" r="${r - 3}" fill="none" stroke="#272727" stroke-width="2"/>
      <circle cx="${x}" cy="${y}" r="${rim}" fill="#1b1b1d"/>
      <circle cx="${x}" cy="${y}" r="${(rim * 0.8).toFixed(1)}" fill="#55585e"/>
      <circle cx="${x}" cy="${y}" r="${(rim * 0.66).toFixed(1)}" fill="none" stroke="#3b3e43" stroke-width="3" stroke-dasharray="2 3"/>
      <path d="M ${o1x},${o1y} A ${ro.toFixed(1)} ${ro.toFixed(1)} 0 0 1 ${o2x},${o2y} L ${i2x},${i2y} A ${ri.toFixed(1)} ${ri.toFixed(1)} 0 0 0 ${i1x},${i1y} Z" fill="#f5c400"/>
      <g class="spokes" fill="#cfd2d7" style="transform-box:view-box;transform-origin:${x}px ${y}px">
        ${spokes}
        <circle cx="${x}" cy="${y}" r="${(rim * 0.25).toFixed(1)}"/>
        <circle cx="${x}" cy="${y}" r="${(rim * 0.12).toFixed(1)}" fill="#8a8e94"/>
      </g>
      <circle cx="${x}" cy="${y}" r="${rim}" fill="none" stroke="#a9adb3" stroke-width="1.6"/>`;
  }

  function car({ sketch = false } = {}) {
    if (sketch) {
      const wheels = [FRONT, REAR].map((w) =>
        `<circle cx="${w.x}" cy="${w.y}" r="${w.r}"/><circle cx="${w.x}" cy="${w.y}" r="${(w.r * 0.74).toFixed(1)}"/><circle cx="${w.x}" cy="${w.y}" r="5"/>`
      ).join('');
      return `<svg class="car car--sketch" viewBox="0 0 600 210" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="${BODY}"/><path d="${GLASS}"/><path d="${WING}"/><path d="${UPRIGHTS}"/><path d="${ENDPLATE}"/>
          <path d="${DOORS} ${PILLAR} ${LOUVRES}"/><path d="${INTAKE}"/>
          <ellipse cx="84" cy="112" rx="15" ry="6" transform="rotate(-22 84 112)"/>
          ${wheels}
          <path d="M 4,202 C 120,199 300,204 596,200" stroke-width="1.3" opacity=".6"/>
          <path d="M 600,128 l -70,0 M 600,146 l -46,0 M 600,40 l -60,0" stroke-width="1.3" opacity=".45"/>
        </g>
      </svg>`;
    }

    const id = 'car' + ++uid;
    const paint = `url(#${id}-paint)`;
    return `<svg class="car" viewBox="0 0 600 210" role="img" aria-label="Illustration of a 911 GT2 RS">
      <defs>
        <linearGradient id="${id}-paint" x1="0" y1="48" x2="0" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ff8b4e"/><stop offset=".45" stop-color="#ff5a1f"/><stop offset="1" stop-color="#b5360b"/>
        </linearGradient>
        <linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#3d4857"/><stop offset=".42" stop-color="#11161d"/><stop offset=".52" stop-color="#2c3644"/><stop offset="1" stop-color="#0b0f14"/>
        </linearGradient>
        <clipPath id="${id}-wells"><rect width="600" height="186"/></clipPath>
      </defs>
      <ellipse cx="300" cy="202" rx="286" ry="7" fill="#000" opacity=".45"/>
      <g clip-path="url(#${id}-wells)" fill="#090909"><circle cx="140" cy="158" r="48"/><circle cx="442" cy="155" r="51"/></g>
      ${wheel(FRONT)}${wheel(REAR)}
      <path d="${UPRIGHTS}" fill="#2a2a2a"/>
      <path d="${BODY}" fill="${paint}"/>
      <ellipse cx="470" cy="104" rx="58" ry="12" fill="#fff" opacity=".08"/>
      <path d="M 30,142 C 50,128 76,112 104,106" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.6"/>
      <path d="M 100,106 C 180,102 280,104 384,101 C 440,96 520,104 580,116" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.6"/>
      <path d="${GLASS}" fill="url(#${id}-glass)"/>
      <path d="${PILLAR}" stroke="${paint}" stroke-width="5"/>
      <path d="${LOUVRES}" stroke="#141414" stroke-width="2.2" stroke-linecap="round"/>
      <path d="${DOORS}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1.3"/>
      <path d="M 226,94 C 224,85 236,80 250,84 L 248,95 Z" fill="${paint}" stroke="rgba(0,0,0,.3)" stroke-width="1"/>
      <path d="M 318,110 L 342,110" stroke="#151515" stroke-width="3" stroke-linecap="round"/>
      <path d="${INTAKE}" fill="#141414"/>
      <path d="M 182,178 L 400,178 L 402,186 L 179,186 Z" fill="#141414"/>
      <path d="M 10,186 L 98,186 L 98,190 L 14,191 Z" fill="#141414"/>
      <path d="M 21,158 C 30,156 44,156 52,158 L 54,176 C 44,178 30,178 23,177 Z" fill="#141414"/>
      <path d="M 548,184 L 588,176 L 588,186 L 548,190 Z" fill="#141414"/>
      <ellipse cx="586" cy="170" rx="3" ry="4" fill="#9a9a9a"/>
      <path d="M 576,114 L 587,118 L 587,130 L 575,127 Z" fill="#d1121f"/>
      <ellipse cx="84" cy="112" rx="15" ry="6" transform="rotate(-22 84 112)" fill="#eef3f7" stroke="#2a2a2a" stroke-width="1.5"/>
      <ellipse cx="80" cy="113" rx="6" ry="3" transform="rotate(-22 80 113)" fill="#9fd3ff" opacity=".6"/>
      <text x="236" y="174" font-family="'Racing Sans One', sans-serif" font-size="19" letter-spacing="1" fill="#141414">GT2 RS</text>
      <path d="${WING}" fill="#2b2b2b" stroke="rgba(255,255,255,.22)" stroke-width="1"/>
      <path d="${ENDPLATE}" fill="#303030" stroke="rgba(255,255,255,.25)" stroke-width="1"/>
    </svg>`;
  }

  // ---------- Cover stickers ----------
  function tacho() {
    const ang = (v) => 150 + v * 30; // 0–8 ×1000 rpm across 240°
    let ticks = '', nums = '';
    for (let v = 0; v <= 8; v += 0.5) {
      const major = Number.isInteger(v);
      const [x1, y1] = polar(50, 50, 41, ang(v));
      const [x2, y2] = polar(50, 50, major ? 34 : 37.5, ang(v));
      ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${v >= 7 ? '#ff3b1f' : '#e9e9e9'}" stroke-width="${major ? 1.6 : 0.8}"/>`;
      if (major) {
        const [tx, ty] = polar(50, 50, 27.5, ang(v));
        nums += `<text x="${tx}" y="${ty}">${v}</text>`;
      }
    }
    const [r1x, r1y] = polar(50, 50, 43.5, ang(7));
    const [r2x, r2y] = polar(50, 50, 43.5, ang(8));
    return `<svg class="tacho" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="#cfd2d7"/>
      <circle cx="50" cy="50" r="45.5" fill="#0d0d0d"/>
      <path d="M ${r1x},${r1y} A 43.5 43.5 0 0 1 ${r2x},${r2y}" fill="none" stroke="#ff3b1f" stroke-width="3"/>
      ${ticks}
      <g font-family="'DM Mono', monospace" font-size="7.5" fill="#f1f1f1" text-anchor="middle" dominant-baseline="central">${nums}</g>
      <text x="50" y="67" font-family="'DM Mono', monospace" font-size="4.2" fill="#9a9a9a" text-anchor="middle">×1000 r/min</text>
      <text x="50" y="77" font-family="'Racing Sans One', sans-serif" font-size="7" fill="#ff5a1f" text-anchor="middle">GT2 RS</text>
      <g class="needle"><path d="M 44,50 L 86,50" stroke="#ff5a1f" stroke-width="2.2" stroke-linecap="round"/></g>
      <circle cx="50" cy="50" r="5" fill="#1d1d1d" stroke="#555" stroke-width="1"/>
    </svg>`;
  }

  function track() {
    const id = 'trk' + ++uid;
    const loop = 'M 20,60 C 18,48 26,40 34,42 C 42,44 40,30 50,26 C 58,22 62,32 70,28 C 80,23 88,30 84,40 C 81,48 90,52 86,60 C 82,68 72,64 68,72 C 64,80 54,84 46,78 C 40,74 34,80 28,76 C 22,72 22,66 20,60 Z';
    return `<svg class="track" viewBox="0 0 100 100" aria-hidden="true">
      <defs><path id="${id}" d="M 15,50 A 35 35 0 0 1 85,50"/></defs>
      <circle cx="50" cy="50" r="48" fill="#f7f6f2"/>
      <circle cx="50" cy="50" r="44" fill="none" stroke="#111" stroke-width="1.2"/>
      <text font-family="'DM Mono', monospace" font-size="7.4" letter-spacing="1.6" fill="#111"><textPath href="#${id}" startOffset="50%" text-anchor="middle">NORDSCHLEIFE</textPath></text>
      <g transform="translate(50 52) scale(.6) translate(-54 -53)">
        <path d="${loop}" fill="none" stroke="#111" stroke-width="5" stroke-linejoin="round"/>
        <path d="${loop}" fill="none" stroke="#ff5a1f" stroke-width="1.6" stroke-dasharray="3 5"/>
        <rect x="15" y="57" width="10" height="4" fill="#ff5a1f"/>
      </g>
      <text x="50" y="85" font-family="'Racing Sans One', sans-serif" font-size="12" fill="#111" text-anchor="middle">6:47.3</text>
    </svg>`;
  }

  function barcode(seed = 'x', h = 40) {
    let s = [...seed].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 7);
    let x = 0, bars = '';
    for (let i = 0; i < 46; i++) {
      s = (Math.imul(s, 1103515245) + 12345) >>> 0;
      const w = 1 + ((s >>> 16) % 3);
      if (i % 2 === 0) bars += `<rect x="${x}" width="${w}" height="${h}"/>`;
      x += w;
    }
    return `<svg viewBox="0 0 ${x} ${h}" preserveAspectRatio="none" aria-hidden="true"><g fill="currentColor">${bars}</g></svg>`;
  }

  // ---------- Desk props ----------
  const metal = (id) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#5d5d5d"/><stop offset=".4" stop-color="#f4f4f4"/><stop offset=".6" stop-color="#c9c9c9"/><stop offset="1" stop-color="#4d4d4d"/></linearGradient>`;

  const pen = () => `<svg viewBox="0 0 40 420" aria-hidden="true">
    <defs>
      <linearGradient id="pen-lac" x1="0" x2="1"><stop offset="0" stop-color="#070b18"/><stop offset=".3" stop-color="#1c2a55"/><stop offset=".45" stop-color="#5a6ea8"/><stop offset=".6" stop-color="#1a2650"/><stop offset="1" stop-color="#050812"/></linearGradient>
      ${metal('pen-metal')}
      <linearGradient id="pen-gold" x1="0" x2="1"><stop offset="0" stop-color="#8a6a22"/><stop offset=".45" stop-color="#f6df93"/><stop offset="1" stop-color="#7a5b1a"/></linearGradient>
    </defs>
    <rect x="6" y="2" width="28" height="150" rx="13" fill="url(#pen-lac)"/>
    <path d="M28 18 h6 v104 c0 8 -5 9 -6 3 z" fill="url(#pen-metal)"/>
    <rect x="5" y="140" width="30" height="12" rx="2" fill="url(#pen-metal)"/>
    <path d="M7 154 h26 l-2 176 c-1 6 -21 6 -22 0 z" fill="url(#pen-lac)"/>
    <path d="M11 334 h18 l-4 38 h-10 z" fill="#0d0d0d"/>
    <rect x="12" y="330" width="16" height="5" fill="url(#pen-metal)"/>
    <path d="M15 372 h10 l-2.5 30 L20 418 l-2.5 -16 z" fill="url(#pen-gold)"/>
    <path d="M20 384 v30" stroke="#5a4515" stroke-width=".7"/>
    <circle cx="20" cy="388" r="1.4" fill="#5a4515"/>
  </svg>`;

  // A car-shaped key fob, seen from above
  const key = () => `<svg viewBox="0 -44 70 194" aria-hidden="true">
    <defs>
      <linearGradient id="key-body" x1="0" x2="1"><stop offset="0" stop-color="#050505"/><stop offset=".4" stop-color="#2e2e30"/><stop offset=".6" stop-color="#1a1a1b"/><stop offset="1" stop-color="#050505"/></linearGradient>
      ${metal('key-metal')}
    </defs>
    <circle cx="35" cy="-20" r="19" fill="none" stroke="url(#key-metal)" stroke-width="3.5"/>
    <rect x="30" y="-4" width="10" height="18" rx="2" fill="url(#key-metal)"/>
    <path d="M35 10 C52 10 60 20 60 40 V110 C60 128 52 140 35 140 C18 140 10 128 10 110 V40 C10 20 18 10 35 10 Z" fill="url(#key-body)"/>
    <path d="M20 50 C28 45 42 45 50 50 L48 72 C40 69 30 69 22 72 Z" fill="#3a3f47"/>
    <path d="M22 98 C30 100 40 100 48 98 L50 110 C40 115 30 115 20 110 Z" fill="#3a3f47"/>
    <path d="M14 40 C14 26 22 16 35 15" stroke="rgba(255,255,255,.2)" stroke-width="2" fill="none"/>
  </svg>`;

  const arrow = () => `<svg viewBox="0 0 30 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 5 C10 9 20 16 27 20 C20 25 11 31 5 36 C5.5 26 4.5 15 4.5 4"/>
  </svg>`;

  return { car, tacho, track, barcode, pen, key, arrow };
})();
