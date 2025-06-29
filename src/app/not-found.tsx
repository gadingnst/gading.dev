import { NextLink } from '@/packages/components/base/Navigations';

/**
 * Global not-found page for invalid routes
 * This page is shown when a route doesn't match any existing pages
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-base-content px-8">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-error">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-base opacity-80 max-w-md">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NextLink href="/" className="btn btn-primary">
            Go Home
          </NextLink>
          <NextLink href="/id" className="btn btn-outline">
            Beranda (ID)
          </NextLink>
        </div>
      </div>
    </div>
  );
}
