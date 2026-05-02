# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start       # dev server at http://0.0.0.0:5173 (accessible on local network)
npm run build   # production build → _site/
```

No test suite. Verify changes by running the dev server and checking the browser.

## Architecture

**Eleventy (11ty) v3 static site** — Markdown source → HTML output in `_site/`.

### Data flow

`src/_data/chapters.json` is the single source of truth for chapter metadata (number, slug, title, subtitle, bonus flag). Both the nav in `base.njk` and the index grid in `index.njk` iterate over this array. Adding a chapter requires an entry here AND a corresponding `src/chapters/<slug>.md`.

### Templates

- `src/_includes/base.njk` — shell with sticky header, mobile nav, `{% block content %}`, footer. Uses Nunjucks `{% block %}` system, **not** `{{ content | safe }}`.
- `src/_includes/chapter.njk` — extends `base.njk`. Renders sidebar, chapter header (eyebrow/h1/subtitle), prose via `{{ content | safe }}`, and prev/next pagination using the `prevChapter`/`nextChapter` custom filters defined in `.eleventy.js`.
- `src/index.njk` — uses `{% extends "base.njk" %}` directly (no `layout:` frontmatter) because it uses `{% block %}`.

Chapter markdown files use frontmatter:
```yaml
layout: chapter.njk
title: "..."
subtitle: "..."
chapterSlug: capitulo-N   # must match slug in chapters.json
```

### Widgets

Each chapter can embed interactive widgets as raw HTML blocks inside the `.md` file, followed by a `<script>` tag loading the corresponding file from `src/assets/js/widgets/`.

**Critical rule:** No blank lines inside widget HTML blocks. CommonMark terminates an HTML block at the first blank line, causing the markdown parser to inject empty `<p>` tags between elements.

Existing widgets:
- `oportunidad.js` — opportunity cost (cap. 1): button choices with stat bars
- `valor-marginal.js` — marginal value trading (cap. 2): one-direction barter (🫐→🍍) with decreasing marginal value, bienestar meter
- `precio-maximo.js` — price ceiling (cap. 2): vertical slider + seller dot chart showing supply withdrawal

Widget JS pattern: IIFE, bail early if root element not found, vanilla DOM only.

### `src/assets/js/main.js`

Runs on every page. Two responsibilities:
1. Mobile nav toggle
2. Auto-wraps any `h3` starting with "Lo que aprendiste" + its following `ul` in a `.summary-box` div

### CSS

Single file: `src/assets/css/main.css`. CSS custom properties for the full design system (colors, fonts, sizes). Key variables: `--color-accent: #b45309` (amber), `--font-sans: Inter`, `--font-serif: Lora`.

Breakpoints: `1024px` (sidebar collapses) and `768px` (mobile layout, widget adjustments).

### Deployment

Push to `main` → GitHub Actions builds and deploys to GitHub Pages automatically.
