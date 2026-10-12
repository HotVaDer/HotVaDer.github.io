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

GitHub Pages serves the `main` branch as-is (Settings → Pages → Deploy from a branch → `main` / root), so publishing is just:

```bash
git push
```

The live site updates a minute or so later.

## Customize

- Everything in the notebook comes from `js/data.js`. Each project gets its own page.
- Contact links (`email`, `phone`, `linkedin`) live in `data.js`; any left empty stay hidden.
- Add screenshots (16:9) to `assets/img/` and set each project's `image`.
- The photo on the about page is your GitHub avatar (`avatar` in `data.js`).
- The hero text lives in `index.html`.
