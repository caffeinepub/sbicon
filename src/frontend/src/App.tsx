import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import ListingDetailPage from './pages/ListingDetailPage';
import ProfilePage from './pages/ProfilePage';
import SellCreateListingPage from './pages/SellCreateListingPage';
import SellEditListingPage from './pages/SellEditListingPage';
import PublishingSharePage from './pages/PublishingSharePage';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const listingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listing/$listingId',
  component: ListingDetailPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
});

const sellCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sell/create',
  component: SellCreateListingPage,
});

const sellEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sell/edit/$listingId',
  component: SellEditListingPage,
});

const publishingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/publishing',
  component: PublishingSharePage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  listingDetailRoute,
  profileRoute,
  sellCreateRoute,
  sellEditRoute,
  publishingRoute,
]);

// Create router
const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
