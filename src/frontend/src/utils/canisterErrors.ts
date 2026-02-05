/**
 * Utility to parse and normalize backend canister errors into user-friendly messages
 */

export function parseCanisterError(error: unknown): string {
  if (!error) return 'An unknown error occurred';

  // Handle Error objects
  if (error instanceof Error) {
    const message = error.message;

    // Extract trap messages from IC agent errors
    if (message.includes('Canister trapped')) {
      const trapMatch = message.match(/trapped: (.+?)(?:\n|$)/);
      if (trapMatch) {
        return mapErrorMessage(trapMatch[1]);
      }
    }

    // Extract reject messages
    if (message.includes('reject')) {
      const rejectMatch = message.match(/reject message: (.+?)(?:\n|$)/);
      if (rejectMatch) {
        return mapErrorMessage(rejectMatch[1]);
      }
    }

    return mapErrorMessage(message);
  }

  // Handle string errors
  if (typeof error === 'string') {
    return mapErrorMessage(error);
  }

  // Handle object errors with message property
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return mapErrorMessage(String((error as { message: unknown }).message));
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Map known backend error messages to user-friendly versions
 */
function mapErrorMessage(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Seller profile errors
  if (lowerMessage.includes('seller profile') && lowerMessage.includes('not')) {
    return 'Please set up your seller profile first. Go to your profile page to get started.';
  }

  if (lowerMessage.includes('seller profile already exists')) {
    return 'You already have a seller profile.';
  }

  // Authorization errors
  if (lowerMessage.includes('unauthorized')) {
    return 'You do not have permission to perform this action. Please log in.';
  }

  // Listing errors
  if (lowerMessage.includes('listing not found')) {
    return 'This listing could not be found. It may have been removed.';
  }

  if (lowerMessage.includes('only the seller can')) {
    return 'Only the listing owner can perform this action.';
  }

  // Actor/connection errors
  if (lowerMessage.includes('actor not available')) {
    return 'Connection to the backend is not ready. Please wait a moment and try again.';
  }

  // Return the original message if no mapping found
  return message;
}
