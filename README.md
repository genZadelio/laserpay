# Laserpay — educational finance UI demo

Laserpay is an original, responsive portfolio concept for a fictional finance dashboard. It uses only HTML, CSS, and vanilla JavaScript.

- **Live demo:** https://laserpay-adelio.netlify.app/
- **Source:** https://github.com/genZadelio/laserpay

## Demo safeguards

This is a non-transactional UI demonstration:

- No login, sign-up, password, payment, or personal-data form
- No backend, analytics, tracking pixels, or financial API connection
- Fictional sample values and interface labels only
- No claims of endorsement by real companies or customers
- No financial, banking, payment, payroll, or credit services

The public deployment is hosted on Netlify. GitHub Pages should remain disabled for this repository while the shared `genzadelio.github.io` host is under Google Safe Browsing review.

## Run locally

From this directory:

```powershell
python -m http.server 8000
```

Then open `http://127.0.0.1:8000`.

## Deploy

The repository root is the Netlify publish directory. `netlify.toml` applies security headers and a restrictive Content Security Policy. The page has no build step or runtime dependencies.

## Included

- Responsive desktop and mobile navigation
- Five-slide hero carousel with controls
- Product-suite, industry, and developer concept sections
- Interactive code tabs and FAQ accordion
- Informational demo dialog without authentication fields
- Scroll-reveal animations and reduced-motion support

## Structure

- `index.html` — page markup
- `styles.css` — responsive design system and components
- `script.js` — interactions and content switching
- `assets/images/` — local editorial imagery
- `assets/favicon.svg` — original project favicon
- `netlify.toml` — Netlify publishing and security-header configuration

The implementation and sample content are original to this project. This is not affiliated with or endorsed by any financial provider, payment network, or company shown as an example workflow.
