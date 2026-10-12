(() => {
  const data = window.PORTFOLIO;
  const $ = (sel) => document.querySelector(sel);

  const escapeHtml = (s = '') =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---- Theme toggle ----
  $('#theme-toggle').addEventListener('click', () => {
    const root = document.documentElement;
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = isDark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // ---- Mobile menu ----
  const burger = $('#nav-burger');
  const links = $('#nav-links');
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // ---- Skills ----
  $('#skills').innerHTML = data.skills.map((s) => `<li>${escapeHtml(s)}</li>`).join('');

  // ---- Featured projects ----
  $('#projects-grid').innerHTML = data.projects.map((p) => `
    <article class="card">
      ${p.image ? `<img class="card__img" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)} screenshot" loading="lazy">` : ''}
      <div class="card__body">
        <h3 class="card__title">${escapeHtml(p.title)}</h3>
        <p class="card__desc">${escapeHtml(p.description)}</p>
        <ul class="tags">${(p.tags || []).map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
        <div class="card__links">
          ${p.repo ? `<a href="${escapeHtml(p.repo)}" target="_blank" rel="noopener">Code ↗</a>` : ''}
          ${p.live ? `<a href="${escapeHtml(p.live)}" target="_blank" rel="noopener">Live ↗</a>` : ''}
        </div>
      </div>
    </article>`).join('');

  // ---- GitHub repos (live) ----
  const reposGrid = $('#repos-grid');
  fetch(`https://api.github.com/users/${data.githubUser}/repos?sort=updated&per_page=30`)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((repos) => {
      const shown = repos
        .filter((r) => !r.fork && !data.hiddenRepos.includes(r.name))
        .slice(0, data.repoCount);
      if (!shown.length) {
        reposGrid.innerHTML = '<p class="muted">No public repositories yet.</p>';
        return;
      }
      reposGrid.innerHTML = shown.map((r) => `
        <a class="card card--repo" href="${escapeHtml(r.html_url)}" target="_blank" rel="noopener">
          <div class="card__body">
            <h3 class="card__title mono">${escapeHtml(r.name)}</h3>
            <p class="card__desc">${escapeHtml(r.description || 'No description.')}</p>
            <p class="repo-meta mono muted">
              ${r.language ? `<span>${escapeHtml(r.language)}</span>` : ''}
              <span>★ ${r.stargazers_count}</span>
            </p>
          </div>
        </a>`).join('');
    })
    .catch(() => {
      reposGrid.innerHTML = `<p class="muted">Couldn't load repos right now — <a href="https://github.com/${data.githubUser}">view them on GitHub</a>.</p>`;
    });

  $('#year').textContent = new Date().getFullYear();
})();
