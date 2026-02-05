import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ListingGrid from '@/components/listings/ListingGrid';
import CategoryFilter from '@/components/listings/CategoryFilter';
import BrandHeader from '@/components/branding/BrandHeader';
import { useGetAllListings } from '@/hooks/queries/useListings';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { data: listings = [], isLoading } = useGetAllListings();

  // Filter listings based on search and category
  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || listing.title.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-yellow-50 to-lime-100 dark:from-orange-950 dark:via-yellow-950 dark:to-lime-950 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <BrandHeader />
          <div className="mt-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Find Your Next Favorite Fidget Toy! 🎉
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Buy, sell, and trade awesome fidget toys with other kids
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-background/50 backdrop-blur-sm sticky top-0 z-10 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for fidget toys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg rounded-full border-2"
              />
            </div>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <ListingGrid listings={filteredListings} isLoading={isLoading} />
        </div>
      </section>
    </div>
  );
}
