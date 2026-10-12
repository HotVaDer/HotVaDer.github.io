// The notebook: builds the cover + pages from data.js and runs the 3D page flips.
//
// Pages are "leaves": each leaf has a front face (a right-hand page) and a back
// face (the left-hand page of the next spread) and flips around the spine.
// Desktop shows two-page spreads; narrow screens show one page and pan across.

(() => {
  const D = window.PORTFOLIO, A = window.ART;
  const { esc, links, linkAttrs } = window.SITE;
  const root = document.getElementById('nb');
  const book = document.getElementById('book');
  if (!root || !book) return;

  const pad = (n) => String(n).padStart(2, '0');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const repoName = (url) => (url || '').replace(/\/+$/, '').split('/').pop();
  const initials = (s) => s.split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase();
  const lastInitial = D.name.split(' ').slice(-1)[0][0];

  // ---------- Cover ----------
  const STICKER_KEY = 'nb-stickers-v1';
  const STICKERS = [
    { id: 'label', x: 9, y: 4, w: 50, r: -3, html: `<div class="stk-label"><b>${esc(D.firstName)} ${lastInitial}.</b><small>nº 911 · ideas &amp; code</small></div>` },
    { id: 'checker', x: 67, y: 6, w: 21, r: 12, html: '<div class="stk-checker"></div>' },
    { id: 'car', x: 4, y: 37, w: 92, r: -4, cls: 'stk--diecut stk--car', html: A.car() },
    { id: 'track', x: 6, y: 67, w: 36, r: -6, cls: 'stk--round', html: A.track() },
    { id: 'tacho', x: 50, y: 67.5, w: 31, r: 5, cls: 'stk--round', html: A.tacho() },
    { id: 'roundel', x: 37, y: 85, w: 16, r: -10, html: '<div class="stk-roundel">911</div>' },
    { id: 'oval', x: 66, y: 87, w: 24, r: 8, html: '<div class="stk-oval">GT2RS</div>' },
    { id: 'hazard', x: -6, y: 92.5, w: 48, r: -7, html: '<div class="stk-hazard"><span>WEISSACH</span></div>' },
  ];

  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(STICKER_KEY)) || {}; } catch (e) {}

  const sticker = (s) => {
    const p = saved[s.id] || {};
    return `<div class="stk ${s.cls || ''}" data-id="${s.id}" style="left:${p.x ?? s.x}%;top:${p.y ?? s.y}%;width:${s.w}%;--r:${s.r}deg;--z:${p.z ?? 1}">${s.html}</div>`;
  };

  const cover = () => ({
    cls: 'face--cover carbon',
    html: `
      <h2 class="sr-only">${esc(D.firstName)}'s notebook</h2>
      <div class="cover-title" aria-hidden="true"><span class="ct-gt2">GT2</span> <span class="ct-rs">RS</span><small>3.8 twin-turbo · 700 PS · 340 km/h</small></div>
      ${STICKERS.map(sticker).join('')}
      <button class="open-tape" type="button" data-open>click to open</button>
      <span class="band" aria-hidden="true"></span>`,
  });

  const backCover = () => ({
    cls: 'face--cover carbon',
    html: `
      <div class="found"><small>if found, please return to</small><b>${esc(D.name)}</b><small>${esc(D.location)} · reward: one hot lap</small></div>
      <div class="stk-barcode">${A.barcode(D.handle)}<small>${esc(D.handle.toUpperCase())}-911</small></div>
      <span class="band" aria-hidden="true"></span>`,
  });

  // ---------- Paper pages ----------
  let pageNo = 0;
  const paper = (key, html) => ({ key, cls: 'paper', html: `${html}<span class="page-no">${pad(++pageNo)}</span>` });

  const aboutLeft = () => {
    const t = D.ticket;
    return paper('about', `
      <div class="ticket">
        <span class="tape" style="right:-1.4em;bottom:-.5em;transform:rotate(-28deg)"></span>
        <div class="ticket__head"><span>BOARDING PASS</span><span>FLIGHT ${esc(t.flight)}</span></div>
        <div class="ticket__main">
          <div class="ticket__route">
            <div><small>FROM</small><b>${esc(t.from)}</b><em>${esc(t.fromCity)}</em></div>
            <span class="ticket__arrow">→</span>
            <div><small>TO</small><b>${esc(t.to)}</b><em>${esc(t.toCity)}</em></div>
          </div>
          <div class="ticket__meta"><div><small>PASSENGER</small>${esc(t.passenger)}</div><div><small>GATE</small>911</div><div><small>SEAT</small>1A</div></div>
        </div>
        <div class="ticket__stub">${A.barcode(t.passenger, 30)}<b>1A</b></div>
      </div>
      <h2 class="hi">Hi!</h2>
      ${D.bio.map((p) => `<p class="p-text">${esc(p)}</p>`).join('')}
      <p class="sig">— ${esc(D.firstName)}</p>`);
  };

  const aboutRight = () => paper('about-2', `
    <div class="about-grid">
      <figure class="polaroid">
        <span class="tape"></span>
        <img src="${esc(D.avatar)}" alt="${esc(D.name)}" loading="lazy" onerror="this.outerHTML='<div class=&quot;polaroid__ph&quot;>${initials(D.name)}</div>'">
        <figcaption>that's me</figcaption>
      </figure>
      <div>
        <p class="p-kicker">toolbox</p>
        <ul class="checklist">${D.skills.map((s) => `<li><span>${esc(s)}</span></li>`).join('')}</ul>
      </div>
    </div>
    <div class="doodle">${A.car({ sketch: true })}<p class="doodle__note">dream car ↑ GT2 RS<br>(working on it)</p></div>`);

  const projectFace = (p, i) => paper(i === 0 ? 'work' : `work-${i}`, `
    <p class="p-kicker">Project ${pad(i + 1)} · ${esc(p.kind)}</p>
    <h2 class="p-title">${esc(p.title)}</h2>
    <figure class="shot">
      <span class="tape tape--l"></span><span class="tape tape--r"></span>
      ${p.image
        ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">`
        : `<div class="shot__ph"><span>${initials(p.title)}</span><small>screenshot coming soon</small></div>`}
      ${p.note ? `<div class="sticky">${esc(p.note)}</div>` : ''}
    </figure>
    <p class="p-text">${esc(p.description)}</p>
    <ul class="stamps">${(p.tags || []).map((t, j) => `<li style="--r:${j % 2 ? 2 : -2}deg">${esc(t)}</li>`).join('')}</ul>
    <p class="p-links">
      ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">→ the code</a>` : ''}
      ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">→ visit the site</a>` : ''}
    </p>`);

  const reposFace = () => paper('garage', `
    <p class="p-kicker">live from github.com/${esc(D.githubUser)}</p>
    <h2 class="p-title">more in the garage</h2>
    <div class="repos" data-repos><p class="p-text">warming up the engine…</p></div>
    <p class="p-links"><a href="https://github.com/${esc(D.githubUser)}?tab=repositories" target="_blank" rel="noopener">→ see everything</a></p>`);

  const contactFace = () => paper('contact', `
    <p class="p-kicker">finish line</p>
    <h2 class="p-title">let's build something.</h2>
    <p class="p-text">${esc(D.contactBlurb)}</p>
    <ul class="c-links">${links.map((l) => `<li><span>${l.label}</span><a href="${esc(l.href)}"${linkAttrs(l.href)}>${esc(l.text)}</a></li>`).join('')}</ul>
    <p class="sig">— ${esc(D.firstName)}</p>
    <div class="flag" aria-hidden="true"></div>`);

  const notesFace = () => paper('notes', `
    <p class="p-kicker">notes</p>
    <h2 class="p-title">to do</h2>
    <ul class="checklist checklist--todo">${D.notes.map((n) => `<li class="${n.done ? 'done' : ''}"><span>${esc(n.text)}</span></li>`).join('')}</ul>
    <div class="doodle doodle--tilt">${A.car({ sketch: true })}</div>`);

  const faces = [cover(), aboutLeft(), aboutRight(), ...D.projects.map(projectFace), reposFace(), contactFace()];
  if (faces.length % 2 === 0) faces.push(notesFace()); // keep an even face count once the back cover is added
  faces.push(backCover());

  const L = faces.length / 2;
  book.innerHTML = Array.from({ length: L }, (_, k) => {
    const f = faces[2 * k], b = faces[2 * k + 1];
    return `<div class="leaf">
      <div class="face face--front ${f.cls}" data-face="${2 * k}">${f.html}</div>
      <div class="face face--back ${b.cls}" data-face="${2 * k + 1}">${b.html}</div>
    </div>`;
  }).join('');

  const leaves = [...book.querySelectorAll('.leaf')];
  const faceEls = [...book.querySelectorAll('.face')].sort((a, b) => a.dataset.face - b.dataset.face);

  // ---------- Live repos ----------
  const reposEl = book.querySelector('[data-repos]');
  const skip = new Set([...(D.hiddenRepos || []), ...D.projects.map((p) => repoName(p.repo))].map((s) => s.toLowerCase()));
  fetch(`https://api.github.com/users/${D.githubUser}/repos?sort=updated&per_page=50`)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((repos) => {
      const list = repos.filter((r) => !r.fork && !skip.has(r.name.toLowerCase())).slice(0, D.repoCount || 6);
      reposEl.innerHTML = list.length
        ? list.map((r) => `
            <a class="repo" href="${esc(r.html_url)}" target="_blank" rel="noopener">
              <span class="repo__top"><b>${esc(r.name)}</b><i>${esc(r.language || '')}</i></span>
              <p>${esc(r.description || 'no description yet')}</p>
            </a>`).join('')
        : '<p class="p-text">The garage is empty… for now.</p>';
    })
    .catch(() => {
      reposEl.innerHTML = `<p class="p-text">Couldn't reach GitHub. <a href="https://github.com/${esc(D.githubUser)}" target="_blank" rel="noopener">See them there</a>.</p>`;
    });

  // ---------- Flip state ----------
  const prevBtn = root.querySelector('.nb__arrow--prev');
  const nextBtn = root.querySelector('.nb__arrow--next');
  const counter = root.querySelector('.nb__counter');
  const tilt = root.querySelector('.nb__tilt');
  prevBtn.innerHTML = nextBtn.innerHTML = A.arrow();

  const mq = matchMedia('(max-width: 819px)');
  let single = mq.matches;
  let step = 0; // desktop: number of flipped leaves; mobile: index of the visible face
  let seq = 0;
  const timers = [];

  const maxStep = () => (single ? faces.length - 1 : L);
  const flippedFor = (s) => (single ? Math.ceil(s / 2) : s);
  const stepForFace = (i) => (single ? i : Math.ceil(i / 2));
  const visibleFaces = (s) => (single ? [s] : s === 0 ? [0] : s === L ? [2 * L - 1] : [2 * s - 1, 2 * s]);
  const settledZ = (k, flipped) => (flipped ? k + 1 : L - k);

  function render(animate = true) {
    const f = flippedFor(step);

    leaves.forEach((leaf, k) => {
      const flipped = k < f;
      if (flipped !== leaf.classList.contains('is-flipped') && animate) {
        leaf.style.zIndex = L + 10 + ++seq; // the turning page rides on top
        leaf.classList.add('turning');
        clearTimeout(timers[k]);
        timers[k] = setTimeout(() => {
          leaf.classList.remove('turning');
          leaf.style.zIndex = settledZ(k, leaf.classList.contains('is-flipped'));
        }, 950);
      } else if (!leaf.classList.contains('turning')) {
        leaf.style.zIndex = settledZ(k, flipped);
      }
      leaf.classList.toggle('is-flipped', flipped);
    });

    const x = single ? (step % 2 ? '0%' : '-50%') : f === 0 ? '-25%' : f === L ? '25%' : '0%';
    book.style.setProperty('--bx', x);

    const vis = visibleFaces(step);
    faceEls.forEach((el, i) => (el.inert = !vis.includes(i)));

    root.classList.toggle('is-closed', f === 0);
    root.classList.toggle('is-back', f === L);
    prevBtn.disabled = step === 0;
    nextBtn.disabled = step === maxStep();

    if (single) {
      counter.textContent = step === 0 ? 'COVER' : step === faces.length - 1 ? 'BACK COVER' : `PAGE ${pad(step)} / ${pad(faces.length - 2)}`;
    } else {
      counter.textContent = f === 0 ? 'COVER' : f === L ? 'BACK COVER' : `LAP ${pad(f)} / ${pad(L - 1)}`;
    }
    if (f !== 0) resetTilt();
  }

  let walker;
  function goTo(target) {
    clearInterval(walker);
    target = Math.max(0, Math.min(maxStep(), target));
    const tick = () => {
      if (step === target) return clearInterval(walker);
      step += Math.sign(target - step);
      render();
    };
    tick();
    walker = setInterval(tick, 240);
  }
  const next = () => goTo(step + 1);
  const prev = () => goTo(step - 1);

  mq.addEventListener('change', () => {
    const f = flippedFor(step);
    single = mq.matches;
    step = single ? (f === 0 ? 0 : f === L ? faces.length - 1 : 2 * f - 1) : f;
    book.classList.add('no-anim');
    render(false);
    void book.offsetWidth;
    book.classList.remove('no-anim');
  });

  // ---------- Input ----------
  let lastDrag = 0, lastSwipe = 0;

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  root.querySelector('.nb__close').addEventListener('click', () => goTo(0));

  book.addEventListener('click', (e) => {
    if (Date.now() - lastDrag < 300 || Date.now() - lastSwipe < 400) return;
    if (e.target.closest('a, button:not([data-open])')) return;
    const face = e.target.closest('.face');
    if (!face) return;
    const i = +face.dataset.face;
    if (single) {
      const r = face.getBoundingClientRect();
      return e.clientX - r.left < r.width * 0.3 && step > 0 ? prev() : next();
    }
    if (i === faces.length - 1) return prev();
    return i % 2 ? prev() : next(); // odd faces sit on the left
  });

  // Swipe on touch screens
  const stage = root.querySelector('.nb__stage');
  let touch = null;
  stage.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') touch = { x: e.clientX, y: e.clientY }; });
  stage.addEventListener('pointercancel', () => (touch = null));
  stage.addEventListener('pointerup', (e) => {
    if (!touch) return;
    const dx = e.clientX - touch.x, dy = e.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      lastSwipe = Date.now();
      dx < 0 ? next() : prev();
    }
  });

  // Arrow keys while the notebook is on screen
  let inView = false;
  new IntersectionObserver(([en]) => (inView = en.isIntersecting), { threshold: 0.35 }).observe(stage);
  document.addEventListener('keydown', (e) => {
    if (!inView || e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'Escape') goTo(0);
  });

  document.addEventListener('notebook:goto', (e) => {
    const i = faces.findIndex((f) => f.key === e.detail);
    if (i >= 0) goTo(stepForFace(i));
  });

  // Closed notebook leans toward the cursor
  let dragging = false;
  function resetTilt() {
    tilt.style.setProperty('--rx', '0deg');
    tilt.style.setProperty('--ry', '0deg');
  }
  if (fine) {
    const desk = root.closest('.desk');
    desk.addEventListener('mousemove', (e) => {
      if (!root.classList.contains('is-closed') || dragging) return;
      const r = stage.getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
      tilt.style.setProperty('--ry', (dx * 7).toFixed(2) + 'deg');
      tilt.style.setProperty('--rx', (-dy * 5).toFixed(2) + 'deg');
    });
    desk.addEventListener('mouseleave', resetTilt);
  }

  // ---------- Draggable stickers (mouse only) ----------
  const resetBtn = root.querySelector('.nb__reset');
  const stickerEls = [...book.querySelectorAll('.stk')];
  let zTop = Math.max(5, ...Object.values(saved).map((p) => p.z || 0));
  const persist = () => {
    try { localStorage.setItem(STICKER_KEY, JSON.stringify(saved)); } catch (e) {}
    resetBtn.hidden = !Object.keys(saved).length;
  };
  resetBtn.hidden = !Object.keys(saved).length;
  resetBtn.addEventListener('click', () => {
    saved = {};
    try { localStorage.removeItem(STICKER_KEY); } catch (e) {}
    stickerEls.forEach((el) => {
      const s = STICKERS.find((d) => d.id === el.dataset.id);
      el.style.left = s.x + '%';
      el.style.top = s.y + '%';
      el.style.setProperty('--z', 1);
    });
    resetBtn.hidden = true;
  });

  if (fine) {
    stickerEls.forEach((el) => {
      el.addEventListener('pointerdown', (e) => {
        if (e.button !== 0 || step !== 0) return;
        const cr = el.parentElement.getBoundingClientRect();
        const sx = e.clientX, sy = e.clientY;
        const startL = parseFloat(el.style.left), startT = parseFloat(el.style.top);
        let moved = false;
        el.setPointerCapture(e.pointerId);

        const move = (ev) => {
          const dx = ev.clientX - sx, dy = ev.clientY - sy;
          if (!moved && Math.hypot(dx, dy) < 5) return;
          if (!moved) {
            moved = dragging = true;
            resetTilt();
            zTop = Math.min(zTop + 1, 49);
            el.style.setProperty('--z', zTop);
            el.classList.add('is-dragging');
          }
          el.style.left = Math.max(-15, Math.min(95, startL + (dx / cr.width) * 100)) + '%';
          el.style.top = Math.max(-10, Math.min(95, startT + (dy / cr.height) * 100)) + '%';
        };
        const up = () => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerup', up);
          el.removeEventListener('pointercancel', up);
          if (!moved) return;
          dragging = false;
          lastDrag = Date.now();
          el.classList.remove('is-dragging');
          saved[el.dataset.id] = { x: parseFloat(el.style.left), y: parseFloat(el.style.top), z: zTop };
          persist();
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerup', up);
        el.addEventListener('pointercancel', up);
      });
    });
  }

  root.querySelector('.nb__hint').textContent = fine
    ? '*click the cover to open · the stickers peel off, drag them around'
    : '*tap the cover to open · swipe to turn the pages';

  render(false);
})();
