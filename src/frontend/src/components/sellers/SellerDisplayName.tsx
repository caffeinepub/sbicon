import { useGetSellerProfile } from '@/hooks/queries/useSellers';
import type { Principal } from '@icp-sdk/core/principal';

interface SellerDisplayNameProps {
  seller: Principal;
}

export default function SellerDisplayName({ seller }: SellerDisplayNameProps) {
  const { data: profile, isLoading } = useGetSellerProfile(seller);

  if (isLoading) {
    return <span className="text-muted-foreground">Loading...</span>;
  }

  return (
    <span className="font-medium">
      {profile?.displayName || 'Anonymous Seller'}
    </span>
  );
}
