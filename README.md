# Charles Auma | Red Team & Security Developer Portfolio

Portfolio of Charles Auma, a red team operator and security developer based in Nairobi, Kenya.
Penetration testing, OSINT, threat hunting, and secure web development.

## Overview

Single-page portfolio built with plain HTML, CSS and vanilla JavaScript — no frameworks, no
build step. Fonts (Inter, JetBrains Mono) are self-hosted, and all content is rendered
client-side from `js/data.js`.

## Customising

Edit `js/data.js` and search for `TODO` — every piece of content lives there: personal
details, about text, skills, web projects, security engagements, contact links and page
metadata. Save screenshots in `assets/projects/` and your photo as `assets/profile.jpg`,
then reference them from `data.js`. Save and refresh; nothing else needs changing.
Sections with empty arrays (experience, education, certifications, write-ups) hide
themselves automatically.

## Deployment

**Assumed host: Netlify.** The contact form uses Netlify Forms and the site ships a
`_headers` file, so Netlify is the natural fit.

- Drag the folder into the Netlify drop zone, or connect a Git repo.
- `_headers` is applied automatically; form submissions appear in the Netlify dashboard
  under **Forms**.

> Netlify Forms only processes submissions on Netlify-hosted sites. If you actually host
> on GitHub Pages (or elsewhere), tell me and I will switch the form to Formspree or
> `mailto:` — the form and validation would need a small update that this README does
> not cover.

## Security

- Strict Content-Security-Policy: no inline scripts, no inline styles, no external
  domains — everything is self-hosted.
- Enforced through the `_headers` file, with a matching CSP `<meta>` tag in
  `index.html` and `thanks.html` as a fallback.
- Note: a CSP in a `<meta>` tag does **not** support `frame-ancestors`, so
  clickjacking protection relies on the HTTP header set by `_headers`.

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
