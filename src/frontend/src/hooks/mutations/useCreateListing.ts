import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { ListingInput, ProductID } from '@/backend';

export function useCreateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ListingInput): Promise<ProductID> => {
      if (!actor) throw new Error('Actor not available');
      
      // The backend now auto-creates seller profile if needed
      // createListing returns the new listing ID
      const listingId = await actor.createListing(input);
      return listingId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['myListings'] });
      queryClient.invalidateQueries({ queryKey: ['sellers'] });
      queryClient.invalidateQueries({ queryKey: ['isSeller'] });
    },
  });
}
