# Specification

## Summary
**Goal:** Fix listing creation so authenticated users can create listings even without an existing seller profile, and show the real backend (canister) error details when failures occur.

**Planned changes:**
- Ensure a seller profile exists before/when `createListing` runs so first-time sellers can successfully create a listing from `/sell/create` (e.g., auto-create profile or initialize it as part of the flow).
- Update the Create Listing frontend to surface actionable error details by parsing and displaying the underlying canister error/trap message (or a clear mapped message) instead of only showing a generic “Failed to create listing” toast.
- Add frontend support for seller profile creation by implementing a React Query mutation hook for `createSellerProfile` and integrating it into the existing profile setup experience (using display name or prompting for one) prior to listing creation.

**User-visible outcome:** A signed-in user who has never created a seller profile can complete profile setup and create a listing from the Create Listing page, and if something fails they see the actual error message in the UI without needing the browser console.
