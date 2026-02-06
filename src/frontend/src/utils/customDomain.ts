/**
 * Validates and normalizes custom domain input
 */

const BLOCKED_DOMAINS = [
  'google.com',
  'www.google.com',
  'facebook.com',
  'www.facebook.com',
  'twitter.com',
  'www.twitter.com',
  'youtube.com',
  'www.youtube.com',
  'instagram.com',
  'www.instagram.com',
];

export interface DomainValidationResult {
  isValid: boolean;
  error?: string;
  canonicalUrl?: string;
}

/**
 * Validates and normalizes a custom domain input
 * Accepts bare domains (example.com) or HTTPS URLs (https://example.com)
 * Rejects paths, queries, fragments, and blocked third-party domains
 */
export function validateAndNormalizeDomain(input: string): DomainValidationResult {
  if (!input || input.trim() === '') {
    return {
      isValid: false,
      error: 'Please enter a domain name',
    };
  }

  const trimmedInput = input.trim();
  let hostname: string;
  let url: URL;

  try {
    // Try to parse as URL
    if (trimmedInput.startsWith('http://') || trimmedInput.startsWith('https://')) {
      url = new URL(trimmedInput);
      hostname = url.hostname;

      // Reject http:// - only https:// allowed
      if (url.protocol === 'http:') {
        return {
          isValid: false,
          error: 'Only HTTPS URLs are supported. Please use https:// instead of http://',
        };
      }

      // Check for path, query, or fragment
      if (url.pathname !== '/' || url.search !== '' || url.hash !== '') {
        return {
          isValid: false,
          error: 'Domain cannot include a path, query parameters, or fragment. Please enter only the domain (e.g., example.com or https://example.com)',
        };
      }
    } else {
      // Treat as bare domain - add https:// to parse
      url = new URL(`https://${trimmedInput}`);
      hostname = url.hostname;

      // Check for path, query, or fragment in the bare domain input
      if (url.pathname !== '/' || url.search !== '' || url.hash !== '') {
        return {
          isValid: false,
          error: 'Domain cannot include a path, query parameters, or fragment. Please enter only the domain (e.g., example.com)',
        };
      }
    }
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid domain format. Please enter a valid domain (e.g., example.com or https://example.com)',
    };
  }

  // Check if domain is blocked
  const normalizedHostname = hostname.toLowerCase();
  if (BLOCKED_DOMAINS.includes(normalizedHostname)) {
    return {
      isValid: false,
      error: `You cannot use "${hostname}" as your custom domain. You must use a domain that you own. Please purchase a domain from a registrar like Namecheap, GoDaddy, or Cloudflare.`,
    };
  }

  // Check for valid domain structure (at least one dot, no spaces)
  if (!hostname.includes('.') || hostname.includes(' ')) {
    return {
      isValid: false,
      error: 'Please enter a valid domain name (e.g., example.com)',
    };
  }

  // Return canonical HTTPS URL
  return {
    isValid: true,
    canonicalUrl: `https://${hostname}`,
  };
}

/**
 * Generates the .env snippet for copying
 */
export function generateEnvSnippet(canonicalUrl: string): string {
  return `VITE_PUBLIC_URL=${canonicalUrl}`;
}

/**
 * Local storage key for persisting custom domain input
 */
const STORAGE_KEY = 'customDomainInput';

/**
 * Save custom domain input to localStorage
 */
export function saveCustomDomainInput(input: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, input);
  } catch (error) {
    console.error('Failed to save custom domain input:', error);
  }
}

/**
 * Load custom domain input from localStorage
 */
export function loadCustomDomainInput(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch (error) {
    console.error('Failed to load custom domain input:', error);
    return '';
  }
}

/**
 * Clear custom domain input from localStorage
 */
export function clearCustomDomainInput(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear custom domain input:', error);
  }
}
