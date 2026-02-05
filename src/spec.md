# Specification

## Summary
**Goal:** Add an in-app “Publishing / Share” section that explains the app is published on the Internet Computer and lets users copy the current public site URL.

**Planned changes:**
- Add a discoverable “Publishing / Share” entry point in the main UI (e.g., footer/header link or simple settings/about page).
- Create a “Publishing / Share” section with clear English text stating deployment is to the Internet Computer and that Google hosting is not supported.
- Display the current public URL using `window.location.origin` and add a “Copy link” button.
- On copy, write the URL to the clipboard and show a non-intrusive success confirmation (toast or equivalent).

**User-visible outcome:** Users can open a “Publishing / Share” section, read where the app is hosted (Internet Computer), see the current public URL, and copy it with one click with a brief success message.
