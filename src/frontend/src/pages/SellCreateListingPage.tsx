import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ListingForm from '@/components/listings/ListingForm';
import { useCreateListing } from '@/hooks/mutations/useCreateListing';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { toast } from 'sonner';
import type { ListingInput } from '@/backend';
import EmptyState from '@/components/common/EmptyState';
import { parseCanisterError } from '@/utils/canisterErrors';

export default function SellCreateListingPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const createMutation = useCreateListing();

  const isAuthenticated = !!identity;

  const handleSubmit = async (data: ListingInput) => {
    try {
      const newListingId = await createMutation.mutateAsync(data);
      toast.success('Listing created successfully! 🎉');
      navigate({ to: '/listing/$listingId', params: { listingId: newListingId } });
    } catch (error) {
      const errorMessage = parseCanisterError(error);
      toast.error(errorMessage);
      console.error('Create listing error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <EmptyState
        title="Login Required"
        message="Please login to create a listing."
        actionLabel="Go to Home"
        onAction={() => navigate({ to: '/' })}
      />
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/profile' })}
        className="mb-6 rounded-full"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Profile
      </Button>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-3xl">Create New Listing 🎮</CardTitle>
        </CardHeader>
        <CardContent>
          <ListingForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
