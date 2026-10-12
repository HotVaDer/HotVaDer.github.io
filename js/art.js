// Hand-built SVG artwork: the GT2 RS, the cover stickers and the desk props.

window.ART = (() => {
  let uid = 0;

  // ---------- 991.2 911 GT2 RS side profile (viewBox 0 0 600 210, facing left) ----------
  // Proportions from the real car at ~128 units per metre: 1.0 m front overhang,
  // 2.45 m wheelbase, 1.15 m rear overhang (engine behind the rear axle), 1.3 m tall.
  const FRONT = { x: 134, y: 156, r: 44 };
  const REAR = { x: 449, y: 154, r: 46 };
  const BODY = [
    'M 12,182 L 5,178',
    'C 3,165 4,150 9,140 C 14,130 24,123 36,112',           // nose and bumper top
    'C 46,100 60,90 84,87 C 110,84 150,84 180,86',          // fender rising past the headlight to its crest
    'C 196,87 208,89 218,90',                               // cowl
    'C 244,70 270,46 300,37 C 312,33 322,32 332,32',        // windshield into the roof
    'C 372,34 402,45 432,60 C 462,74 500,86 534,92',        // the 911 flyline over the engine
    'C 556,95 568,97 576,100 C 586,103 592,110 593,118',    // engine lid into the rounded tail
    'C 594,135 593,152 590,164 C 588,174 584,180 578,183',  // rear face
    'L 490,186 A 52 52 0 1 0 408 186 L 174,186',            // rear arch, sill
    'A 50 50 0 1 0 94 186 L 40,187 Z',                      // front arch, chin
  ].join(' ');
  const GLASS = 'M 228,91 C 250,72 274,50 302,41 C 316,37 330,36 340,37 C 370,40 396,52 418,66 C 422,70 422,74 417,77 C 380,82 300,88 228,91 Z';
  const ROOF = 'M 300,37 C 312,33 322,32 332,32 C 360,33 382,39 402,48 L 398,52 C 380,44 360,39 340,37 C 330,36 316,37 302,41 Z';
  const QUARTER = 'M 352,38 L 366,86';
  const DOORS = 'M 224,93 C 225,130 226,160 228,184 M 360,88 C 364,120 365,155 362,184';
  const WING = 'M 508,54 C 520,47 552,44 586,41 L 589,48 C 556,51 528,55 510,58 Z';
  const GURNEY = 'M 584,41 L 588,35 L 590,47 L 588,48 Z';
  const ENDPLATE = 'M 556,35 L 591,32 C 593,41 594,50 593,59 L 559,62 C 557,53 556,44 556,35 Z';
  const PYLON = 'M 524,90 L 532,56 L 539,55 L 533,91 Z';
  const INTAKE = 'M 372,98 C 382,94 396,93 406,94 L 402,108 C 393,107 383,108 370,111 Z';
  const HEADLIGHT = { cx: 63, cy: 103, rx: 22, ry: 8, rot: -28 };
  const MIRROR = 'M 232,76 C 226,76 222,80 224,84 C 230,86 240,85 244,82 C 244,78 238,76 232,76 Z';

  const polar = (cx, cy, r, deg) => {
    const a = (deg * Math.PI) / 180;
    return [(cx + r * Math.cos(a)).toFixed(2), (cy + r * Math.sin(a)).toFixed(2)];
  };

  // Centre-lock forged wheel: 5 double spokes, drilled disc, yellow ceramic-brake caliper
  function wheel({ x, y, r }) {
    const rim = r * 0.74, f = (n) => n.toFixed(1);
    const disc = rim * 0.82;
    const [c1x, c1y] = polar(x, y, disc * 0.98, -150), [c2x, c2y] = polar(x, y, disc * 0.98, -95);
    const [c3x, c3y] = polar(x, y, disc * 0.62, -95), [c4x, c4y] = polar(x, y, disc * 0.62, -150);
    let spokes = '';
    for (let i = 0; i < 5; i++) {
      for (const off of [-7.5, 7.5]) {
        const a = i * 72 + off - 90;
        const [ax, ay] = polar(x, y, rim * 0.26, a - 5), [bx, by] = polar(x, y, rim * 0.26, a + 5);
        const [cx, cy] = polar(x, y, rim * 0.93, a + 3.2), [dx, dy] = polar(x, y, rim * 0.93, a - 3.2);
        spokes += `<path d="M ${ax},${ay} L ${dx},${dy} L ${cx},${cy} L ${bx},${by} Z"/>`;
      }
    }
    return `
      <circle cx="${x}" cy="${y}" r="${r}" fill="#111"/>
      <circle cx="${x}" cy="${y}" r="${f(r - 2.5)}" fill="none" stroke="#1f1f1f" stroke-width="2.5"/>
      <circle cx="${x}" cy="${y}" r="${f((r + rim) / 2)}" fill="none" stroke="#2a2a2a" stroke-width=".8" stroke-dasharray="3 9"/>
      <circle cx="${x}" cy="${y}" r="${f(rim)}" fill="#26282c"/>
      <circle cx="${x}" cy="${y}" r="${f(disc)}" fill="#5d6066"/>
      <circle cx="${x}" cy="${y}" r="${f(disc * 0.78)}" fill="none" stroke="#3c3f44" stroke-width="${f(disc * 0.28)}" stroke-dasharray="1.2 2.6"/>
      <circle cx="${x}" cy="${y}" r="${f(disc * 0.42)}" fill="#3a3c40"/>
      <path d="M ${c1x},${c1y} A ${f(disc * 0.98)} ${f(disc * 0.98)} 0 0 1 ${c2x},${c2y} L ${c3x},${c3y} A ${f(disc * 0.62)} ${f(disc * 0.62)} 0 0 0 ${c4x},${c4y} Z" fill="#f2c200"/>
      <g class="spokes" style="transform-box:view-box;transform-origin:${x}px ${y}px">
        <g fill="#7b7f86" stroke="#4b4e53" stroke-width=".5">${spokes}</g>
        <circle cx="${x}" cy="${y}" r="${f(rim * 0.27)}" fill="#7b7f86"/>
        <circle cx="${x}" cy="${y}" r="${f(rim * 0.17)}" fill="#c8102e"/>
        <circle cx="${x}" cy="${y}" r="${f(rim * 0.1)}" fill="#2a2a2a"/>
      </g>
      <circle cx="${x}" cy="${y}" r="${f(rim)}" fill="none" stroke="#d3d6db" stroke-width="2"/>
      <circle cx="${x}" cy="${y}" r="${f(rim + 1.6)}" fill="none" stroke="#8e9198" stroke-width="1"/>`;
  }

  function car({ sketch = false } = {}) {
    if (sketch) {
      const wheels = [FRONT, REAR].map((w) =>
        `<circle cx="${w.x}" cy="${w.y}" r="${w.r}"/><circle cx="${w.x}" cy="${w.y}" r="${(w.r * 0.74).toFixed(1)}"/><circle cx="${w.x}" cy="${w.y}" r="${(w.r * 0.2).toFixed(1)}"/>`
      ).join('');
      const h = HEADLIGHT;
      return `<svg class="car car--sketch" viewBox="0 0 600 210" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="${BODY}"/><path d="${GLASS}"/><path d="${QUARTER}"/><path d="${DOORS}"/>
          <path d="${WING}"/><path d="${ENDPLATE}"/><path d="${PYLON}"/><path d="${INTAKE}"/>
          <ellipse cx="${h.cx}" cy="${h.cy}" rx="${h.rx}" ry="${h.ry}" transform="rotate(${h.rot} ${h.cx} ${h.cy})"/>
          <path d="${MIRROR} M 238,84 L 242,91"/>
          ${wheels}
          <path d="M 4,202 C 120,199 300,204 596,200" stroke-width="1.3" opacity=".6"/>
          <path d="M 600,128 l -70,0 M 600,146 l -46,0 M 610,40 l -50,0" stroke-width="1.3" opacity=".45"/>
        </g>
      </svg>`;
    }

    const id = 'car' + ++uid;
    const u = (n) => `url(#${id}-${n})`;
    const h = HEADLIGHT;
    return `<svg class="car" viewBox="0 0 600 210" role="img" aria-label="Illustration of a Lava Orange 911 GT2 RS">
      <defs>
        <linearGradient id="${id}-paint" x1="0" y1="30" x2="0" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ffa060"/><stop offset=".3" stop-color="#ff6a1f"/><stop offset=".62" stop-color="#f2540f"/><stop offset="1" stop-color="#a83208"/>
        </linearGradient>
        <linearGradient id="${id}-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".35" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#4a5666"/><stop offset=".4" stop-color="#121820"/><stop offset=".55" stop-color="#2e3947"/><stop offset="1" stop-color="#0a0e13"/>
        </linearGradient>
        <linearGradient id="${id}-low" x1="0" y1="130" x2="0" y2="188" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/>
        </linearGradient>
        <pattern id="${id}-cf" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="4" height="4" fill="#161616"/><rect width="2" height="2" fill="#262626"/><rect x="2" y="2" width="2" height="2" fill="#262626"/>
        </pattern>
        <clipPath id="${id}-wells"><rect width="600" height="186"/></clipPath>
        <clipPath id="${id}-body"><path d="${BODY}"/></clipPath>
      </defs>

      <ellipse cx="300" cy="202" rx="290" ry="7" fill="#000" opacity=".5"/>
      <g clip-path="url(#${id}-wells)" fill="#070707"><circle cx="134" cy="156" r="50"/><circle cx="449" cy="154" r="52"/></g>
      ${wheel(FRONT)}${wheel(REAR)}

      <path d="${PYLON}" fill="#1c1c1c" transform="translate(14 1)" opacity=".7"/>
      <path d="${PYLON}" fill="#222"/>

      <path d="${BODY}" fill="${u('paint')}"/>
      <g clip-path="url(#${id}-body)">
        <rect x="0" y="130" width="600" height="60" fill="${u('low')}"/>
        <path d="M 30,122 C 60,100 100,90 150,89 C 230,90 320,92 400,90 C 440,88 470,88 500,91 C 540,95 566,99 592,108 L 592,116 C 566,107 540,102 500,98 C 470,95 440,95 400,97 C 320,99 230,97 150,96 C 104,97 66,108 34,128 Z" fill="${u('sheen')}"/>
        <path d="M 52,98 C 84,88 140,86 210,90 M 360,92 C 400,86 430,84 456,86 C 500,90 540,96 572,101" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.2"/>
      </g>

      <path d="${GLASS}" fill="${u('glass')}"/>
      <path d="${QUARTER}" stroke="#0d0d0d" stroke-width="4"/>
      <path d="${ROOF}" fill="${u('cf')}"/>
      <path d="M 300,48 C 316,43 334,42 348,43 L 344,49 C 330,48 314,49 300,54 Z" fill="#fff" opacity=".08"/>

      <path d="${DOORS}" fill="none" stroke="rgba(0,0,0,.38)" stroke-width="1.2"/>
      <path d="M 318,104 L 342,103" stroke="#1a1a1a" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M 238,84 L 242,91" stroke="#151515" stroke-width="2.4"/>
      <path d="${MIRROR}" fill="${u('paint')}" stroke="rgba(0,0,0,.35)" stroke-width=".8"/>

      <path d="${INTAKE}" fill="#0c0c0c"/>
      <path d="M 372,98 C 382,94 396,93 406,94" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/>

      <ellipse cx="${h.cx}" cy="${h.cy}" rx="${h.rx}" ry="${h.ry}" transform="rotate(${h.rot} ${h.cx} ${h.cy})" fill="#e9eef2" stroke="#1d1d1d" stroke-width="1.6"/>
      <ellipse cx="${h.cx - 4}" cy="${h.cy + 1}" rx="${h.rx * 0.55}" ry="${h.ry * 0.55}" transform="rotate(${h.rot} ${h.cx} ${h.cy})" fill="#9fcff5" opacity=".55"/>
      <g fill="#fff">${[-12, -4, 4, 12].map((d) => { const [px, py] = polar(h.cx, h.cy, Math.abs(d) * 0.9, h.rot + (d < 0 ? 180 : 0)); return `<circle cx="${px}" cy="${py}" r="1.5"/>`; }).join('')}</g>

      <path d="M 10,142 C 18,139 34,139 48,142 L 50,166 C 36,168 22,168 11,166 Z" fill="#101010"/>
      <path d="M 14,148 L 46,148 M 13,154 L 47,154 M 13,160 L 48,160" stroke="#2b2b2b" stroke-width="1"/>
      <path d="M 1,183 L 72,185 L 72,190 L 3,190 Z" fill="${u('cf')}"/>
      <path d="M 176,180 L 406,178 L 408,186 L 174,186 Z" fill="${u('cf')}"/>
      <path d="M 494,183 L 587,177 L 587,188 L 494,190 Z" fill="${u('cf')}"/>
      <path d="M 506,146 L 518,144 L 520,170 L 508,172 Z" fill="#0e0e0e"/>
      <rect x="583" y="167" width="11" height="7" rx="2" fill="#a8adb3" stroke="#555" stroke-width=".8"/>
      <path d="M 574,101 C 583,103 590,108 592,115 L 592,121 C 588,115 582,111 573,108 Z" fill="#d1121f"/>
      <path d="M 440,66 C 480,82 520,90 560,96" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1"/>

      <text x="246" y="170" font-family="'Inter', sans-serif" font-style="italic" font-weight="800" font-size="17" letter-spacing="-.3" fill="#141414">GT2 RS</text>

      <path d="${WING}" fill="${u('cf')}" stroke="rgba(255,255,255,.25)" stroke-width=".8"/>
      <path d="${GURNEY}" fill="#111"/>
      <path d="${ENDPLATE}" fill="${u('cf')}" stroke="rgba(255,255,255,.28)" stroke-width="1"/>
      <path d="M 558,40 L 591,37" stroke="rgba(255,255,255,.18)" stroke-width="1"/>
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
      <text font-family="'DM Mono', monospace" font-size="7.4" letter-spacing="1.6" fill="#111"><textPath href="#${id}" startOffset="50%" text-anchor="middle">NÜRBURGRING</textPath></text>
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

  const stopwatch = () => {
    let ticks = '';
    for (let i = 0; i < 60; i++) {
      const major = i % 5 === 0;
      const [x1, y1] = polar(60, 92, 40, i * 6 - 90), [x2, y2] = polar(60, 92, major ? 34 : 37, i * 6 - 90);
      ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#222" stroke-width="${major ? 1.6 : 0.6}"/>`;
    }
    const [hx, hy] = polar(60, 92, 33, 50);
    return `<svg viewBox="0 0 120 150" aria-hidden="true">
      <defs>${metal('sw-metal')}</defs>
      <rect x="52" y="6" width="16" height="10" rx="2" fill="url(#sw-metal)"/>
      <rect x="55" y="15" width="10" height="12" fill="url(#sw-metal)"/>
      <circle cx="60" cy="6" r="7" fill="none" stroke="url(#sw-metal)" stroke-width="3"/>
      <rect x="92" y="34" width="10" height="9" rx="2" fill="url(#sw-metal)" transform="rotate(40 97 38)"/>
      <circle cx="60" cy="92" r="52" fill="url(#sw-metal)"/>
      <circle cx="60" cy="92" r="45" fill="#f4f2ec"/>
      ${ticks}
      <text x="60" y="66" font-family="'DM Mono', monospace" font-size="8" fill="#222" text-anchor="middle">60</text>
      <text x="60" y="114" font-family="'Racing Sans One', sans-serif" font-size="7" fill="#ff5a1f" text-anchor="middle">6:47.3</text>
      <line x1="60" y1="92" x2="${hx}" y2="${hy}" stroke="#ff3b1f" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="60" cy="92" r="3.5" fill="#222"/>
    </svg>`;
  };

  // Rubber left on the asphalt
  const skid = () => `<svg viewBox="0 0 1500 900" preserveAspectRatio="none" aria-hidden="true">
    <defs><filter id="skid-blur"><feGaussianBlur stdDeviation="5"/></filter></defs>
    <g fill="none" stroke="#000" stroke-linecap="round" filter="url(#skid-blur)">
      <path d="M -40 760 C 300 700 520 560 780 520 S 1260 520 1560 380" stroke-width="26" opacity=".55"/>
      <path d="M -40 820 C 300 760 520 620 780 580 S 1260 580 1560 440" stroke-width="26" opacity=".45"/>
      <path d="M 60 120 C 380 180 620 260 900 250" stroke-width="18" opacity=".3"/>
    </g>
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

  return { car, tacho, track, barcode, stopwatch, skid, key, arrow };
})();
