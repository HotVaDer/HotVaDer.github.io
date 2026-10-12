# HotVaDer.github.io

My personal portfolio, hosted with GitHub Pages at **https://hotvader.github.io**.

Plain HTML, CSS and JS. There's no build step.

## Structure

```
index.html        page layout and sections
css/style.css     styles (light/dark theme tokens at the top)
js/data.js        ← edit this for skills, featured projects and settings
js/main.js        rendering, theme toggle, live GitHub repo list
assets/img/       images (favicon, profile photo, project screenshots)
404.html          not-found page
```

## Run locally

```bash
npx serve .
# or
python3 -m http.server 8000
```

Or use the VS Code **Live Server** extension (recommended in `.vscode/`).

## Deploy

1. Create a public repo named **`HotVaDer.github.io`** on GitHub.
2. Push this folder to its `main` branch.
3. Go to the repo's **Settings → Pages** and set **Source** to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` then publishes the site on every push.

## Customize

- Search the HTML for `TODO` to find the name, tagline, bio, email and social links.
- Edit `js/data.js` for skills and featured projects.
- Put a profile photo at `assets/img/profile.jpg` and replace the `.avatar-placeholder` div in `index.html`.
