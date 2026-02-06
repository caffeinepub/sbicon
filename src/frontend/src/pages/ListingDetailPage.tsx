import { useState } from 'react';
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { ArrowLeft, Edit, Trash2, User, Copy, Check, Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LoadingState from '@/components/common/LoadingState';
import EmptyState from '@/components/common/EmptyState';
import SellerDisplayName from '@/components/sellers/SellerDisplayName';
import { useGetListing } from '@/hooks/queries/useListingDetail';
import { useDeactivateListing } from '@/hooks/mutations/useDeactivateListing';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { toast } from 'sonner';

export default function ListingDetailPage() {
  const { listingId } = useParams({ from: '/listing/$listingId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: listing, isLoading } = useGetListing(listingId);
  const deactivateMutation = useDeactivateListing();
  const [copied, setCopied] = useState(false);

  const isOwner = identity && listing && listing.seller.toString() === identity.getPrincipal().toString();

  const publicListingUrl = `${window.location.origin}/listing/${listingId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicListingUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleDeactivate = async () => {
    try {
      await deactivateMutation.mutateAsync(listingId);
      toast.success('Listing removed successfully!');
      navigate({ to: '/profile' });
    } catch (error) {
      toast.error('Failed to remove listing');
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!listing) {
    return (
      <EmptyState
        title="Listing Not Found"
        message="This fidget toy listing doesn't exist or has been removed."
        actionLabel="Browse Toys"
        onAction={() => navigate({ to: '/' })}
      />
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/' })}
        className="mb-6 rounded-full"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="space-y-4">
          {listing.images.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {listing.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-2 overflow-hidden">
                      <CardContent className="p-0">
                        <img
                          src={image}
                          alt={`${listing.title} - Image ${index + 1}`}
                          className="w-full h-96 object-cover"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {listing.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </>
              )}
            </Carousel>
          ) : (
            <Card className="border-2">
              <CardContent className="p-0">
                <div className="w-full h-96 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-950 dark:to-yellow-950 flex items-center justify-center">
                  <span className="text-6xl">🎮</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Listing Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{listing.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="text-lg px-4 py-1 rounded-full">
                ${Number(listing.price) / 100}
              </Badge>
              <Badge variant="outline" className="rounded-full">
                {Number(listing.quantity)} available
              </Badge>
            </div>
          </div>

          {/* Share Section */}
          <Card className="border-2 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold text-lg">Share this listing</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                This listing is public and accessible via its URL. Share it with anyone!
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="flex-1 rounded-full"
                  size="lg"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Publishing Guidance */}
          <Alert className="border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20">
            <ExternalLink className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-sm">
              Want this listing to appear in Google search results?{' '}
              <Link
                to="/publishing"
                className="font-semibold text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1"
              >
                Learn about publishing and indexing
                <ExternalLink className="h-3 w-3" />
              </Link>
              . Note: Search engines may take days or weeks to discover and index new listings.
            </AlertDescription>
          </Alert>

          <Card className="border-2">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-lg">Seller</h3>
              </div>
              <SellerDisplayName seller={listing.seller} />
            </CardContent>
          </Card>

          {/* Owner Actions */}
          {isOwner && (
            <div className="flex gap-3">
              <Button
                onClick={() => navigate({ to: '/sell/edit/$listingId', params: { listingId } })}
                className="flex-1 rounded-full"
                size="lg"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Listing
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="lg" className="rounded-full">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove this listing?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently remove your listing. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeactivate} disabled={deactivateMutation.isPending}>
                      {deactivateMutation.isPending ? 'Removing...' : 'Remove'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
