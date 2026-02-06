import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the public URL from environment variable
// When not set, use localhost for development (not a hardcoded production URL)
const publicUrl = process.env.VITE_PUBLIC_URL && process.env.VITE_PUBLIC_URL.trim() !== ''
  ? process.env.VITE_PUBLIC_URL.trim()
  : 'http://localhost:3000';

// Define the routes to include in the sitemap
const routes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/publishing', changefreq: 'monthly', priority: '0.5' },
  { path: '/profile', changefreq: 'weekly', priority: '0.7' },
];

// Generate the sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${publicUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

// Write the sitemap to the public directory
const sitemapPath = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(sitemapPath, sitemap, 'utf-8');

console.log(`✓ Sitemap generated at ${sitemapPath} with base URL: ${publicUrl}`);
