import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUploader from './ImageUploader';
import { listingPresets } from './listingPresets';
import type { ListingInput } from '@/backend';

interface ListingFormProps {
  initialData?: ListingInput;
  onSubmit: (data: ListingInput) => Promise<void>;
  isSubmitting: boolean;
}

export default function ListingForm({ initialData, onSubmit, isSubmitting }: ListingFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData ? String(Number(initialData.price) / 100) : '');
  const [quantity, setQuantity] = useState(initialData ? String(Number(initialData.quantity)) : '');
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  const handlePresetSelect = (presetId: string) => {
    const preset = listingPresets.find((p) => p.id === presetId);
    if (preset) {
      setTitle(preset.title);
      setDescription(preset.description);
      setPrice(String(preset.price));
      setQuantity(String(preset.quantity));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceInCents = Math.round(parseFloat(price) * 100);
    const quantityNum = parseInt(quantity);

    if (!title.trim() || !description.trim() || priceInCents <= 0 || quantityNum <= 0) {
      return;
    }

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      price: BigInt(priceInCents),
      quantity: BigInt(quantityNum),
      images,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="preset">Choose a preset (optional)</Label>
        <Select onValueChange={handlePresetSelect}>
          <SelectTrigger id="preset" className="rounded-full">
            <SelectValue placeholder="Select a template to get started..." />
          </SelectTrigger>
          <SelectContent>
            {listingPresets.map((preset) => (
              <SelectItem key={preset.id} value={preset.id}>
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Pick a template to auto-fill the form, then customize as needed.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="e.g., Rainbow Pop-it Fidget Toy"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your fidget toy..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="9.99"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity *</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            placeholder="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Images (up to 3)</Label>
        <ImageUploader images={images} onChange={setImages} />
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-full">
        {isSubmitting ? 'Saving...' : initialData ? 'Update Listing' : 'Create Listing'}
      </Button>
    </form>
  );
}
