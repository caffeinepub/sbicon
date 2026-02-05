export interface ListingPreset {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export const listingPresets: ListingPreset[] = [
  {
    id: 'rainbow-popit',
    name: 'Rainbow Pop-it',
    title: 'Rainbow Pop-it Fidget Toy',
    description: 'Colorful silicone bubble popping toy with rainbow design. Perfect for stress relief and sensory play. Durable, washable, and endlessly satisfying!',
    price: 8.99,
    quantity: 5,
  },
  {
    id: 'metal-spinner',
    name: 'Metal Spinner',
    title: 'Premium Metal Fidget Spinner',
    description: 'High-quality metal fidget spinner with smooth bearings for long spin times. Great for focus and relaxation. Compact and pocket-friendly design.',
    price: 12.99,
    quantity: 3,
  },
  {
    id: 'squishy-ball',
    name: 'Squishy Ball',
    title: 'Stress Relief Squishy Ball',
    description: 'Soft, squeezable stress ball perfect for hand exercises and anxiety relief. Non-toxic material, returns to original shape after every squeeze.',
    price: 5.99,
    quantity: 10,
  },
  {
    id: 'infinity-cube',
    name: 'Infinity Cube',
    title: 'Infinity Cube Fidget Toy',
    description: 'Mesmerizing infinity cube that folds and unfolds endlessly. Smooth hinges provide satisfying tactile feedback. Great for desk fidgeting.',
    price: 9.99,
    quantity: 4,
  },
  {
    id: 'sensory-rings',
    name: 'Sensory Rings',
    title: 'Spiky Sensory Rings Set',
    description: 'Set of 3 textured sensory rings for tactile stimulation. Stretchy, durable silicone material. Perfect for fidgeting and focus enhancement.',
    price: 6.99,
    quantity: 8,
  },
  {
    id: 'magnetic-balls',
    name: 'Magnetic Balls',
    title: 'Magnetic Building Balls Set',
    description: 'Set of 216 small magnetic balls for creative building and fidgeting. Endless shape possibilities. Includes storage case. Ages 14+.',
    price: 15.99,
    quantity: 2,
  },
];
