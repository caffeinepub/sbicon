import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Globe, Share2, Search, ExternalLink, FileCode, Link2 } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getPublicUrl, getCurrentDeploymentUrl } from '@/utils/publicUrl';

export default function PublishingSharePage() {
  const [copiedDeployment, setCopiedDeployment] = useState(false);
  const [copiedCanonical, setCopiedCanonical] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  
  const currentDeploymentUrl = getCurrentDeploymentUrl();
  const canonicalPublicUrl = getPublicUrl();
  const exampleHtmlUrl = `${canonicalPublicUrl}/static-html-example.html`;

  const handleCopyDeploymentUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentDeploymentUrl);
      setCopiedDeployment(true);
      toast.success('Deployment URL copied to clipboard!');
      setTimeout(() => setCopiedDeployment(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleCopyCanonicalUrl = async () => {
    try {
      await navigator.clipboard.writeText(canonicalPublicUrl);
      setCopiedCanonical(true);
      toast.success('Canonical URL copied to clipboard!');
      setTimeout(() => setCopiedCanonical(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleCopyHtmlLink = async () => {
    try {
      await navigator.clipboard.writeText(exampleHtmlUrl);
      setCopiedHtml(true);
      toast.success('HTML link copied to clipboard!');
      setTimeout(() => setCopiedHtml(false), 2000);
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
          Share your marketplace with the world and improve search visibility
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

        {/* Current Deployment URL Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Deployment URL</CardTitle>
            <CardDescription>
              The actual URL where your site is currently deployed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted/50 p-3 rounded-lg border font-mono text-sm break-all">
                {currentDeploymentUrl}
              </div>
              <Button
                onClick={handleCopyDeploymentUrl}
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                {copiedDeployment ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This is the current Internet Computer URL where your marketplace is deployed.
            </p>
          </CardContent>
        </Card>

        {/* Canonical Public URL Card */}
        <Card>
          <CardHeader>
            <CardTitle>Canonical Public URL</CardTitle>
            <CardDescription>
              The primary URL used for sharing, SEO, and sitemaps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted/50 p-3 rounded-lg border font-mono text-sm break-all">
                {canonicalPublicUrl}
              </div>
              <Button
                onClick={handleCopyCanonicalUrl}
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                {copiedCanonical ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This URL is used in SEO metadata, Open Graph tags, and sitemap generation. 
              {canonicalPublicUrl !== currentDeploymentUrl && (
                <span className="block mt-1 text-orange-600 dark:text-orange-400">
                  Note: This differs from your current deployment URL. Make sure your custom domain DNS is properly configured.
                </span>
              )}
            </p>
            <Alert>
              <AlertDescription className="text-xs">
                <strong>Configuration:</strong> Set via the <code className="bg-muted px-1.5 py-0.5 rounded">VITE_PUBLIC_URL</code> environment variable. 
                When not configured, it defaults to the current deployment URL.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Custom Domain Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-orange-500" />
              Custom Domain
            </CardTitle>
            <CardDescription>
              Use your own domain name for your marketplace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You can connect a custom domain (like <code className="text-xs bg-muted px-1.5 py-0.5 rounded">yourdomain.com</code>) to your marketplace. This requires purchasing a domain from a domain registrar and configuring DNS settings.
            </p>
            
            <div className="bg-muted/50 p-4 rounded-lg border space-y-3">
              <p className="text-sm font-medium mb-2">Step-by-step checklist:</p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>
                  <strong className="text-foreground">Purchase a domain</strong> from a domain registrar (e.g., Namecheap, GoDaddy, Google Domains, Cloudflare). This system does not automatically register or purchase domains.
                </li>
                <li>
                  <strong className="text-foreground">Configure DNS records</strong> in your registrar's control panel to point to your current deployment URL
                  <ul className="ml-6 mt-1 space-y-1 list-disc list-inside text-xs">
                    <li>Add a CNAME record pointing to your current caffeine.xyz URL</li>
                    <li>Or add A/AAAA records if provided by your hosting platform</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-foreground">Wait for DNS propagation</strong> (typically 15 minutes to 48 hours). You can check propagation status using online DNS checker tools.
                </li>
                <li>
                  <strong className="text-foreground">Update your build configuration</strong> by setting the <code className="text-xs bg-background px-1.5 py-0.5 rounded">VITE_PUBLIC_URL</code> environment variable to your custom domain (e.g., <code className="text-xs bg-background px-1.5 py-0.5 rounded">https://yourdomain.com</code>)
                </li>
                <li>
                  <strong className="text-foreground">Rebuild and redeploy</strong> your application. This updates the canonical public URL, SEO metadata (Open Graph tags, JSON-LD), and sitemap to use your custom domain.
                </li>
                <li>
                  <strong className="text-foreground">Add the new domain to Google Search Console</strong> and verify ownership using one of Google's verification methods
                </li>
                <li>
                  <strong className="text-foreground">Re-submit your sitemap</strong> at <code className="text-xs bg-background px-1.5 py-0.5 rounded">https://yourdomain.com/sitemap.xml</code> in Google Search Console
                </li>
              </ol>
            </div>

            <Alert>
              <AlertDescription className="text-xs">
                <strong>Important:</strong> This system does not automatically purchase or register domains for you. You must manage domain registration and DNS configuration through your chosen domain registrar. The custom domain will point to your existing Internet Computer deployment. After configuring your custom domain and updating <code className="bg-muted px-1.5 py-0.5 rounded">VITE_PUBLIC_URL</code>, you must rebuild and redeploy to update SEO metadata and sitemap URLs.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Static HTML File Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-orange-500" />
              Static HTML Files
            </CardTitle>
            <CardDescription>
              Add custom HTML pages to your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You can add standalone HTML files to your website by placing them in the{' '}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">frontend/public/</code>{' '}
              directory at build time.
            </p>
            
            <div className="bg-muted/50 p-4 rounded-lg border space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">How it works:</p>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Provide the HTML filename (e.g., <code className="text-xs bg-background px-1.5 py-0.5 rounded">example.html</code>)</li>
                  <li>Provide the complete HTML file content</li>
                  <li>The file will be added to <code className="text-xs bg-background px-1.5 py-0.5 rounded">frontend/public/</code> at build time</li>
                  <li>Access it at <code className="text-xs bg-background px-1.5 py-0.5 rounded">{canonicalPublicUrl}/filename.html</code></li>
                </ol>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border space-y-2">
              <p className="text-sm font-medium">Example:</p>
              <p className="text-xs text-muted-foreground mb-2">
                A static HTML file has been added to demonstrate this feature:
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background p-2 rounded border font-mono text-xs break-all">
                  {exampleHtmlUrl}
                </div>
                <Button
                  onClick={handleCopyHtmlLink}
                  variant="outline"
                  size="icon"
                  className="shrink-0 h-8 w-8"
                >
                  {copiedHtml ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <a
                href="/static-html-example.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-orange-500 hover:underline mt-2"
              >
                View example page
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <Alert>
              <AlertDescription className="text-xs">
                <strong>Note:</strong> Static HTML files must be added at build time. They cannot be uploaded or modified after deployment. To add a new HTML file, provide the filename and complete HTML content, then rebuild and redeploy your application.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Google Indexing Guide Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-orange-500" />
              Getting Found on Google
            </CardTitle>
            <CardDescription>
              Steps to help Google discover and index your marketplace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Follow these steps to improve your site's visibility in Google search results:
            </p>
            
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-sm mb-2">Step 1: Set up Google Search Console</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Visit{' '}
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline inline-flex items-center gap-1"
                  >
                    Google Search Console
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  {' '}and add your website property.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-sm mb-2">Step 2: Verify site ownership</h3>
                <p className="text-sm text-muted-foreground">
                  Follow Google's verification process to prove you own the site. You may need to add a DNS record or HTML file.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-sm mb-2">Step 3: Submit your sitemap</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  In Google Search Console, go to "Sitemaps" and submit:
                </p>
                <code className="text-xs bg-background px-2 py-1 rounded border block">
                  {canonicalPublicUrl}/sitemap.xml
                </code>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-sm mb-2">Step 4: Request indexing</h3>
                <p className="text-sm text-muted-foreground">
                  Use the URL Inspection tool in Google Search Console to request indexing for your homepage and key pages.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-sm mb-2">Step 5: Share your link publicly</h3>
                <p className="text-sm text-muted-foreground">
                  Post your marketplace URL on social media, forums, or other websites. Google discovers sites faster when they're linked from other places.
                </p>
              </div>
            </div>

            <Alert className="border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20">
              <AlertTitle className="text-orange-600 dark:text-orange-400 font-semibold">
                Important: No Guarantees
              </AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                Google controls when and how sites appear in search results. Following these steps improves discoverability, but does not guarantee immediate indexing, specific rankings, or placement for any search term. Indexing typically takes days to weeks, and ranking depends on many factors beyond your control.
              </AlertDescription>
            </Alert>
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
