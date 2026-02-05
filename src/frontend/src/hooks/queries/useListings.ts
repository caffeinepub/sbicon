import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { Listing } from '@/backend';

export function useGetAllListings() {
  const { actor, isFetching } = useActor();

  return useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: async () => {
      if (!actor) return [];
      const sellers = await actor.getAllSellers();
      const allListings: Listing[] = [];
      sellers.forEach((seller) => {
        allListings.push(...seller.listings);
      });
      return allListings;
    },
    enabled: !!actor && !isFetching,
  });
}
