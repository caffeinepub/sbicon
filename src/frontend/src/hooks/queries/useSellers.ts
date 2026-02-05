import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { SellerProfile } from '@/backend';
import type { Principal } from '@icp-sdk/core/principal';

export function useGetSellerProfile(seller: Principal) {
  const { actor, isFetching } = useActor();

  return useQuery<SellerProfile | null>({
    queryKey: ['sellerProfile', seller.toString()],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getSellerProfile(seller);
      } catch (error) {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}
