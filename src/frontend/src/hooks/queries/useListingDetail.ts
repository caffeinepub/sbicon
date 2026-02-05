import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { Listing } from '@/backend';

export function useGetListing(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Listing | null>({
    queryKey: ['listing', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getListing(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}
