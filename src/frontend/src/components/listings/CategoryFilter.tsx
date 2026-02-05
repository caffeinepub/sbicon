import { Button } from '@/components/ui/button';

const CATEGORIES = ['All', 'Pop-it', 'Spinner', 'Squishy', 'Cube', 'Other'];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category)}
          className="rounded-full"
          size="sm"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
