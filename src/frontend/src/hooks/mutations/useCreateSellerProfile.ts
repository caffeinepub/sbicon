import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';

export function useCreateSellerProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (displayName: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createSellerProfile(displayName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellerProfile'] });
      queryClient.invalidateQueries({ queryKey: ['isSeller'] });
      queryClient.invalidateQueries({ queryKey: ['sellers'] });
    },
  });
}
