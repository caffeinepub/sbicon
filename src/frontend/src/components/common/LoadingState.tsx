import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-4" />
      <p className="text-lg text-muted-foreground">Loading awesome toys...</p>
    </div>
  );
}
