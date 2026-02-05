import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';

export function useIsSeller() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isSeller'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isSeller();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
