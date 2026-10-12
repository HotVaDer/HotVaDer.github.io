# HotVaDer.github.io

My personal portfolio, hosted with GitHub Pages at **https://hotvader.github.io**.

Plain HTML, CSS and JS. There's no build step. The centrepiece is a GT2 RS-themed notebook on a desk: click it open and flip through the pages.

## Structure

```
index.html        hero, the desk + notebook, contact card, footer
css/style.css     all styles (colour tokens at the top)
js/data.js        ← edit this: bio, skills, projects, contact links, notes
js/art.js         hand-drawn SVG art: the car, stickers, pen, key fob
js/notebook.js    builds the notebook pages and runs the 3D page flips
js/main.js        shared helpers, contact card, footer
assets/img/       favicon, project screenshots
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

- Everything in the notebook comes from `js/data.js`. Each project gets its own page.
- Set `email` and `linkedin` in `data.js`; they stay hidden until you do.
- Add screenshots (16:9) to `assets/img/` and set each project's `image`.
- The photo on the about page is your GitHub avatar (`avatar` in `data.js`).
- The hero text lives in `index.html`.
