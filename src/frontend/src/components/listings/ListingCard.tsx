import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Listing } from '@/backend';

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
}

export default function ListingCard({ listing, onClick }: ListingCardProps) {
  const imageUrl = listing.images[0] || null;

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 overflow-hidden group"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-950 dark:to-yellow-950">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🎮</span>
          </div>
        )}
      </div>
      <CardContent className="pt-4">
        <h3 className="font-bold text-lg line-clamp-2 mb-2">{listing.title}</h3>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-base px-3 py-1 rounded-full">
            ${Number(listing.price) / 100}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {Number(listing.quantity)} left
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
