import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Globe, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PublishingSharePage() {
  const [copied, setCopied] = useState(false);
  const publicUrl = window.location.origin;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Share2 className="h-8 w-8 text-orange-500" />
          Publishing & Share
        </h1>
        <p className="text-muted-foreground">
          Share your marketplace with the world
        </p>
      </div>

      <div className="space-y-6">
        {/* Hosting Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-orange-500" />
              Hosting on the Internet Computer
            </CardTitle>
            <CardDescription>
              Your marketplace is live and accessible worldwide
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This application is published as a web app on the{' '}
              <strong className="text-foreground">Internet Computer (ICP)</strong>, a
              decentralized blockchain network. Your marketplace is already live and can be
              accessed by anyone with the URL.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg border">
              <p className="text-sm font-medium mb-2">What this means:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Your app is hosted on a decentralized network</li>
                <li>No traditional cloud hosting required</li>
                <li>Accessible 24/7 from anywhere in the world</li>
                <li>Secure and tamper-resistant infrastructure</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Public URL Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Public URL</CardTitle>
            <CardDescription>
              Share this link to let others access your marketplace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted/50 p-3 rounded-lg border font-mono text-sm break-all">
                {publicUrl}
              </div>
              <Button
                onClick={handleCopyLink}
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Anyone with this URL can browse your marketplace and create listings after logging in.
            </p>
          </CardContent>
        </Card>

        {/* Important Note Card */}
        <Card className="border-orange-200 dark:border-orange-900">
          <CardHeader>
            <CardTitle className="text-orange-600 dark:text-orange-400">
              Important Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This project does not support deployment to Google Cloud, Google Play Store, or
              other traditional hosting platforms. The application is specifically designed to
              run on the Internet Computer blockchain network.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
