// Shared helpers + page chrome (lap timer, paddock pass, footer, nav shortcuts into the notebook).

window.SITE = (() => {
  const D = window.PORTFOLIO;
  const esc = (s = '') =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const links = [
    D.email && { label: 'Email', href: `mailto:${D.email}`, text: D.email },
    D.phone && { label: 'Phone', href: `tel:${D.phone.replace(/[^\d+]/g, '')}`, text: D.phone },
    { label: 'GitHub', href: `https://github.com/${D.githubUser}`, text: `github.com/${D.githubUser}` },
    D.linkedin && { label: 'LinkedIn', href: D.linkedin, text: D.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') },
  ].filter(Boolean);

  const linkAttrs = (href) => (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '');

  return { esc, links, linkAttrs };
})();

(() => {
  const D = window.PORTFOLIO;
  const { esc, links, linkAttrs } = window.SITE;

  // ---- Artwork drawn once by art.js ----
  document.querySelector('.prop--watch').innerHTML = window.ART.stopwatch();
  document.querySelector('.prop--key').innerHTML = window.ART.key();
  document.getElementById('skid').innerHTML = window.ART.skid();
  document.getElementById('hero-sketch').innerHTML = window.ART.car({ sketch: true });

  // ---- Hero lap timer: counts up and starts a new lap at the GT2 RS Nordschleife time ----
  const lap = document.getElementById('lap');
  const LAP_MS = 6 * 60e3 + 47.3e3;
  const fmt = (ms) => {
    const m = Math.floor(ms / 60e3), s = Math.floor((ms % 60e3) / 1e3), r = Math.floor(ms % 1e3);
    return `${m}:${String(s).padStart(2, '0')}.${String(r).padStart(3, '0')}`;
  };
  let heroVisible = true;
  new IntersectionObserver(([en]) => (heroVisible = en.isIntersecting)).observe(lap);
  const t0 = performance.now();
  (function tick(now) {
    if (heroVisible) lap.textContent = fmt((now - t0) % LAP_MS);
    requestAnimationFrame(tick);
  })(t0);

  // ---- Paddock pass ----
  document.getElementById('pass-photo').src = D.avatar;
  document.getElementById('pass-links').innerHTML = links
    .map((l) => `<a href="${esc(l.href)}"${linkAttrs(l.href)}><span>${l.label}</span><b>${esc(l.text)}</b></a>`)
    .join('');
  document.getElementById('pass-foot').insertAdjacentHTML('beforeend', window.ART.barcode(D.handle));

  // ---- Footer ----
  document.getElementById('foot-links').innerHTML = links
    .map((l) => `<a href="${esc(l.href)}"${linkAttrs(l.href)}>${l.label}</a>`)
    .join('');
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- Nav links that open the notebook on a specific page ----
  document.querySelectorAll('[data-goto]').forEach((a) =>
    a.addEventListener('click', () => {
      setTimeout(() => document.dispatchEvent(new CustomEvent('notebook:goto', { detail: a.dataset.goto })), 500);
    })
  );
})();
