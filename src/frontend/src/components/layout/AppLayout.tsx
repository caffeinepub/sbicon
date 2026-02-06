import { Link } from '@tanstack/react-router';
import { ShoppingBag } from 'lucide-react';
import LoginButton from '@/components/auth/LoginButton';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle background pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/fidget-pattern.dim_1600x900.png)',
          backgroundSize: '800px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ShoppingBag className="h-6 w-6 text-orange-500" />
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight">SBIGLIDE</span>
              <span className="text-xs text-muted-foreground leading-tight">Fidget Market</span>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm font-medium hover:text-orange-500 transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/profile"
              className="text-sm font-medium hover:text-orange-500 transition-colors"
            >
              Profile
            </Link>
            <LoginButton />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">{children}</main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <strong className="text-foreground">SBIGLIDE</strong> - Your trusted fidget toy marketplace
          </p>
          <p>
            © 2026. Built with ❤️ using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors underline"
            >
              caffeine.ai
            </a>
            {' · '}
            <Link
              to="/publishing"
              className="hover:text-orange-500 transition-colors underline"
            >
              Publishing / Share
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
