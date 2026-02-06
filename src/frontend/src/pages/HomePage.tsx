import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BrandHeader from '@/components/branding/BrandHeader';
import CategoryFilter from '@/components/listings/CategoryFilter';
import ListingGrid from '@/components/listings/ListingGrid';
import { useGetAllListings } from '@/hooks/queries/useListings';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: allListings = [], isLoading } = useGetAllListings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredListings = allListings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           listing.title.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-100 via-yellow-100 to-lime-100 dark:from-orange-950 dark:via-yellow-950 dark:to-lime-950 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <BrandHeader />
          <div className="text-center space-y-6 mt-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Buy & Sell Fidget Toys
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The ultimate marketplace for fidget toy enthusiasts. Discover unique toys and connect with sellers!
            </p>
            
            {/* How It Works Info */}
            <Alert className="max-w-2xl mx-auto border-2 bg-white/50 dark:bg-black/20">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm text-left">
                <strong>How to buy:</strong> Browse listings, click on items you like, and use the "Contact Seller" button to reach out directly. Arrange payment and shipping with the seller.
              </AlertDescription>
            </Alert>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for fidget toys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-full border-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <ListingGrid
            listings={filteredListings}
            isLoading={isLoading}
          />
        </div>
      </section>
    </div>
  );
}
