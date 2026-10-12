// Shared helpers + page chrome (contact card, footer, nav shortcuts into the notebook).

window.SITE = (() => {
  const D = window.PORTFOLIO;
  const esc = (s = '') =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const links = [
    D.email && { label: '/mail/', href: `mailto:${D.email}`, text: D.email },
    D.phone && { label: '/tel/', href: `tel:${D.phone.replace(/[^\d+]/g, '')}`, text: D.phone },
    { label: '/gh/', href: `https://github.com/${D.githubUser}`, text: `github.com/${D.githubUser}` },
    D.linkedin && { label: '/in/', href: D.linkedin, text: D.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') },
  ].filter(Boolean);

  const linkAttrs = (href) => (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '');

  return { esc, links, linkAttrs };
})();

(() => {
  const { esc, links, linkAttrs } = window.SITE;

  // ---- Contact card (flips on hover, or on tap for touch screens) ----
  document.getElementById('bcard-links').innerHTML = links
    .map((l) => `<p><span>${l.label}</span><a href="${esc(l.href)}"${linkAttrs(l.href)}>${esc(l.text)}</a></p>`)
    .join('');
  document.getElementById('bcard-car').innerHTML = window.ART.car();

  const card = document.querySelector('.bcard');
  const canHover = matchMedia('(hover: hover)').matches;
  card.addEventListener('click', (e) => {
    if (canHover || e.target.closest('a')) return;
    card.classList.toggle('is-flipped');
  });
  card.addEventListener('keydown', (e) => {
    if (e.target !== card || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    card.classList.toggle('is-flipped');
  });
  document.getElementById('bcard-hint').textContent = canHover ? '*hover the card' : '*tap the card to flip it';

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
