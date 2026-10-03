# zeyad-101.github.io

Source for my portfolio: **https://zeyad-101.github.io**

A static site — plain HTML, CSS and JavaScript, no build step — deployed with GitHub Pages.
Content lives in `data/*.json` and is rendered by `script.js`, so updating a project means
editing JSON, not markup.

| Path | What it holds |
|---|---|
| `index.html` | Page layout and sections |
| `style.css` | Design tokens and utility classes |
| `script.js` | Loads `data/*.json` and renders projects, experience, achievements, skills |
| `data/` | Projects, experience, achievements, skills |
| `assets/` | CV (PDF), avatar, project screenshots |

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening `index.html` directly won't work — the browser blocks `fetch()` of the JSON files from `file://`.)
