# Portfolio

A single-page cybersecurity & development portfolio. Dark theme by default
(cyan `#00e5ff` on near-black `#0b0f14`), self-hosted fonts, strict CSP,
and **all editable content lives in one file: `js/data.js`**.

No inline scripts and no inline event handlers are used anywhere, so the
Content-Security-Policy stays strict.

## Structure

```
├── index.html          # page skeleton (no content, no inline JS/styles)
├── thanks.html         # form success page
├── css/styles.css      # design system + self-hosted @font-face
├── js/data.js          # ★ ALL content lives here (search "TODO")
├── js/main.js          # renders data.js into the page + interactions
├── assets/
│   ├── profile.jpg     # ← drop your photo here (square works best)
│   ├── profile-placeholder.svg
│   ├── projects/       # ← screenshots go here (site-1.jpg, site-2.jpg, ...)
│   ├── favicon.svg
│   └── fonts/          # Inter + JetBrains Mono (self-hosted, variable)
├── _headers            # security headers (Netlify / Cloudflare Pages)
└── README.md
```

## Editing your content

Open `js/data.js` and search for `TODO`. Everything is there:

- **Personal details** — name, title, bio, location, taglines
- **Profile photo** — save your picture as `assets/profile.jpg`
  (the placeholder icon swaps in automatically if the file is missing)
- **Skills** — three groups, each shown only when non-empty
- **Web Projects** — always visible; 6 cards (name, description,
  "what I built", tech tags, live URL, year, screenshot). The first
  card is Buchan Safari Kenya; screenshots live in `assets/projects/`
- **Security Engagements** — always visible; 7 placeholder cards with
  `TODO` fields (title, sector, type, description, role, outcome,
  tech). Cards expand on click to reveal role and outcome. No client
  names, logos or links — the sector label is all that's shown
- **Experience, education, certifications, write-ups** —
  arrays with commented examples; a section hides itself automatically
  while its array is empty
- **Contact links** — email / GitHub / LinkedIn (also used in the footer)
- **Meta** — page title, description, OG image

After editing `data.js`, save and refresh — nothing else needs changing.

## Contact form

The form uses **Netlify Forms** with a honeypot field (`bot-field`) and
client-side validation in `js/main.js`. On success it redirects to
`thanks.html`. To read submissions: Netlify dashboard → Forms.

> Netlify Forms only processes submissions on Netlify-hosted sites.
> On other hosts the form will not deliver messages — see the
> deployment notes below.

## Deploying

### Netlify (recommended)

Drag the folder into the Netlify drop zone, or connect a Git repo.
The `_headers` file is picked up automatically, and Netlify Forms
works out of the box.

### Cloudflare Pages

Also supports the `_headers` file. Connect the repo or upload the
folder in the Cloudflare dashboard → Workers & Pages → Create → Pages.

### GitHub Pages — security header note

GitHub Pages **cannot set custom HTTP headers**, so the `_headers`
file is ignored there. Two options:

1. **Partial mitigation (already built in):** `index.html` and
   `thanks.html` contain the CSP as a `<meta>` tag, which browsers
   honour for most directives. Caveats: `frame-ancestors`,
   `report-uri` and a few other directives are *not* supported in
   meta tags, so clickjacking protection must come from elsewhere.
2. **Full protection:** serve the same static files through
   Cloudflare Pages or Netlify (both apply `_headers`), or put
   Cloudflare in front of the GitHub Pages URL and add the headers
   via a Transform/Rule.

Also note: the contact form needs a form backend on GitHub Pages
(e.g. Formspree or a `mailto:` action) since Netlify Forms won't
process submissions there.

## Local preview

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

(Opening `index.html` directly via `file://` also works for browsing,
but the form requires a hosted environment.)
# my-potfolio
