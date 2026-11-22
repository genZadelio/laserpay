# Deployment and trust policy

This project is published at **https://laserpay-adelio.netlify.app/**. GitHub Pages must remain disabled for this repository while the shared `genzadelio.github.io` host is under Google Safe Browsing review.

No hosting platform can guarantee that a URL will never be reviewed or flagged. These release rules reduce avoidable trust, phishing, and brand-confusion risks.

## Required release checklist

- Keep the visible educational-demo disclosure and the no-affiliation statement.
- Do not add credential, OTP, payment, account, or personal-data forms to this static demo.
- Use clearly fictional or illustrative values; do not present sample data as customer, transaction, employee, endorsement, performance, or compliance claims.
- Do not imply ownership of a company, domain, payment network, or third-party brand.
- Do not commit API keys, tokens, credentials, or other secrets.
- Keep the Netlify canonical URL and `og:url` aligned with the primary public deployment.
- Keep the restrictive `Content-Security-Policy`, including `form-action 'none'`.
- Confirm the published page has the expected title, disclosure, local assets, and no unexpected forms before making it primary.
- If GitHub Pages is ever re-enabled, repeat the content review and Safe Browsing check first.

## Deployment

Netlify uses the repository root as its publish directory and reads `netlify.toml` for security headers. There is no build step.
