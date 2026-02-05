import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LoadingState from '@/components/common/LoadingState';
import EmptyState from '@/components/common/EmptyState';
import ListingGrid from '@/components/listings/ListingGrid';
import { useGetCallerUserProfile } from '@/hooks/queries/useCurrentUserProfile';
import { useGetMyListings } from '@/hooks/queries/useMyListings';
import { useSaveUserProfile } from '@/hooks/mutations/useSaveUserProfile';
import { useCreateSellerProfile } from '@/hooks/mutations/useCreateSellerProfile';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { toast } from 'sonner';
import { parseCanisterError } from '@/utils/canisterErrors';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { identity, loginStatus } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: myListings = [], isLoading: listingsLoading } = useGetMyListings();
  const saveProfileMutation = useSaveUserProfile();
  const createSellerMutation = useCreateSellerProfile();

  const [displayName, setDisplayName] = useState('');
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const isAuthenticated = !!identity;
  const needsProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  // Show profile setup dialog when needed
  if (needsProfileSetup && !showProfileSetup) {
    setShowProfileSetup(true);
  }

  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      toast.error('Please enter a display name');
      return;
    }

    try {
      // Save user profile first
      await saveProfileMutation.mutateAsync({ displayName: displayName.trim() });
      
      // Then create seller profile with the same display name
      await createSellerMutation.mutateAsync(displayName.trim());
      
      toast.success('Profile saved! You can now create listings.');
      setShowProfileSetup(false);
    } catch (error) {
      const errorMessage = parseCanisterError(error);
      toast.error(errorMessage);
      console.error('Profile setup error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <EmptyState
        title="Login Required"
        message="Please login to view your profile and manage your listings."
        actionLabel="Go to Home"
        onAction={() => navigate({ to: '/' })}
      />
    );
  }

  if (profileLoading || loginStatus === 'initializing') {
    return <LoadingState />;
  }

  const isSaving = saveProfileMutation.isPending || createSellerMutation.isPending;

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      {/* Profile Setup Dialog */}
      <Dialog open={showProfileSetup} onOpenChange={setShowProfileSetup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome! 🎉</DialogTitle>
            <DialogDescription>
              Let's set up your profile so others can see who you are when you sell toys!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Your Display Name</Label>
              <Input
                id="displayName"
                placeholder="Enter your name..."
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveProfile()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveProfile} disabled={isSaving} className="rounded-full">
              {isSaving ? 'Setting up...' : 'Save Profile'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Header */}
      <Card className="mb-8 border-2">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">{userProfile?.displayName || 'Loading...'}</CardTitle>
              <p className="text-sm text-muted-foreground">Fidget Toy Seller</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* My Listings Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">My Listings</h2>
          <Button onClick={() => navigate({ to: '/sell/create' })} size="lg" className="rounded-full">
            <Plus className="mr-2 h-5 w-5" />
            Create Listing
          </Button>
        </div>

        {listingsLoading ? (
          <LoadingState />
        ) : myListings.length === 0 ? (
          <EmptyState
            title="No Listings Yet"
            message="Start selling your fidget toys by creating your first listing!"
            actionLabel="Create Listing"
            onAction={() => navigate({ to: '/sell/create' })}
          />
        ) : (
          <ListingGrid listings={myListings} isLoading={false} />
        )}
      </div>
    </div>
  );
}
