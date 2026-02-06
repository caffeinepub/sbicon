# Specification

## Summary
**Goal:** Improve the Publishing & Share page with a guided custom domain entry, validation, and copyable canonical `VITE_PUBLIC_URL` configuration.

**Planned changes:**
- Add a “Custom Domain” input on the existing Publishing & Share page that accepts either a bare domain (e.g., `example.com`) or an HTTPS URL (e.g., `https://example.com`).
- Validate and show clear English errors when the input includes any path/query/fragment, or when the domain is a blocked third-party domain (at minimum `google.com` and `www.google.com`, with or without `https://`).
- Normalize accepted input into a canonical HTTPS URL (e.g., `example.com` → `https://example.com`, `https://example.com/` → `https://example.com`) and display it.
- Provide a copy-to-clipboard control that copies the exact `.env` line: `VITE_PUBLIC_URL=https://<domain>` based on the normalized value.
- Persist the entered domain locally so it restores after reload.
- Add guidance clarifying that changing the domain in the UI does not connect DNS; the user must configure DNS at their registrar and then rebuild/redeploy with `VITE_PUBLIC_URL` set.

**User-visible outcome:** Users can enter the domain they own, see a clean canonical `https://` URL, copy an exact `VITE_PUBLIC_URL=...` line for their `.env`, and receive clear guidance about DNS setup and redeploying.
