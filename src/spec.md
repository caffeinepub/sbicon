# Specification

## Summary
**Goal:** Support custom domain setups by showing a configurable canonical public URL for sharing/SEO, and ensure sitemap + SEO metadata align with that canonical URL.

**Planned changes:**
- Update the Publishing & Share page (`/publishing`) to display both the current deployed URL (`window.location.origin`) and a canonical public URL derived from `import.meta.env.VITE_PUBLIC_URL` (fallback to `window.location.origin`), each with copy-to-clipboard + success/error toasts.
- Add/confirm plain-English “Custom Domain” guidance on the Publishing & Share page, including a checklist covering domain registration, DNS setup, propagation wait time, and setting `VITE_PUBLIC_URL` + redeploying; clarify the app does not buy/register domains.
- Update sitemap generation to use the configurable public base URL, ensuring `frontend/scripts/generate-sitemap.mjs` is the source of truth and the committed `frontend/public/sitemap.xml` is no longer hardcoded to the previous draft URL.
- Ensure SEO metadata continues to use `%VITE_PUBLIC_URL%` in `frontend/index.html` for `og:url` and JSON-LD fields, with runtime fallback to `window.location.origin` when the env var is not set.

**User-visible outcome:** On `/publishing`, users can copy both the current deployment URL and the canonical public URL, and they see clear steps for setting up a custom domain and updating `VITE_PUBLIC_URL` + redeploying so SEO metadata and the sitemap use the correct public URL.
