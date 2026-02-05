import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ListingForm from '@/components/listings/ListingForm';
import LoadingState from '@/components/common/LoadingState';
import EmptyState from '@/components/common/EmptyState';
import { useGetListing } from '@/hooks/queries/useListingDetail';
import { useUpdateListing } from '@/hooks/mutations/useUpdateListing';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { toast } from 'sonner';
import type { ListingInput } from '@/backend';

export default function SellEditListingPage() {
  const { listingId } = useParams({ from: '/sell/edit/$listingId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: listing, isLoading } = useGetListing(listingId);
  const updateMutation = useUpdateListing();

  const isOwner = identity && listing && listing.seller.toString() === identity.getPrincipal().toString();

  const handleSubmit = async (data: ListingInput) => {
    try {
      await updateMutation.mutateAsync({ id: listingId, input: data });
      toast.success('Listing updated successfully!');
      navigate({ to: '/listing/$listingId', params: { listingId } });
    } catch (error) {
      toast.error('Failed to update listing');
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!listing) {
    return (
      <EmptyState
        title="Listing Not Found"
        message="This listing doesn't exist or has been removed."
        actionLabel="Go to Profile"
        onAction={() => navigate({ to: '/profile' })}
      />
    );
  }

  if (!isOwner) {
    return (
      <EmptyState
        title="Access Denied"
        message="You can only edit your own listings."
        actionLabel="Go Back"
        onAction={() => navigate({ to: '/listing/$listingId', params: { listingId } })}
      />
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/listing/$listingId', params: { listingId } })}
        className="mb-6 rounded-full"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Listing
      </Button>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-3xl">Edit Listing ✏️</CardTitle>
        </CardHeader>
        <CardContent>
          <ListingForm
            initialData={{
              title: listing.title,
              description: listing.description,
              price: listing.price,
              quantity: listing.quantity,
              images: listing.images,
            }}
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
