import { useNavigate } from '@tanstack/react-router';
import ListingCard from './ListingCard';
import LoadingState from '@/components/common/LoadingState';
import EmptyState from '@/components/common/EmptyState';
import type { Listing } from '@/backend';

interface ListingGridProps {
  listings: Listing[];
  isLoading: boolean;
}

export default function ListingGrid({ listings, isLoading }: ListingGridProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingState />;
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Toys Found"
        message="No fidget toys match your search. Try different keywords or browse all categories!"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          onClick={() => navigate({ to: '/listing/$listingId', params: { listingId: listing.id } })}
        />
      ))}
    </div>
  );
}
