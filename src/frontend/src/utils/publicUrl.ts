/**
 * Get the canonical public URL for the application.
 * Uses VITE_PUBLIC_URL environment variable if set, otherwise falls back to window.location.origin.
 */
export function getPublicUrl(): string {
  const envUrl = import.meta.env.VITE_PUBLIC_URL;
  
  // Check if env var is set and not empty (after trimming)
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim();
  }
  
  // Fallback to current origin
  return window.location.origin;
}

/**
 * Get the current deployment URL (always returns the actual current origin).
 */
export function getCurrentDeploymentUrl(): string {
  return window.location.origin;
}
