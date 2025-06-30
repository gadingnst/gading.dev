import Link from './Link';
import { Home, Search, Twitter } from 'lucide-react';

/**
 * Example usage of the Link component for simple text-based navigation
 * This file demonstrates all available props and styling options
 */
function LinkExamples() {
  return (
    <div className="space-y-8 p-6">
      {/* Basic Text Links */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic Text Links</h3>
        <div className="space-y-2">
          <Link href="/about">Simple link</Link>
          <Link href="/contact" size="sm">Small link</Link>
          <Link href="/portfolio" size="lg">Large link</Link>
          <Link href="/blog" size="xs">Extra small link</Link>
        </div>
      </section>

      {/* Links with Different Sizes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Link Sizes</h3>
        <div className="space-y-2">
          <Link href="/xs" size="xs">Extra Small Text Link</Link>
          <Link href="/sm" size="sm">Small Text Link</Link>
          <Link href="/md" size="md">Medium Text Link</Link>
          <Link href="/lg" size="lg">Large Text Link</Link>
        </div>
      </section>

      {/* Links with Icons */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Links with Icons</h3>
        <div className="space-y-2">
          <Link
            href="/home"
            icon={<HomeIcon />}
            iconPosition="left"
          >
            Home
          </Link>
          <Link
            href="/search"
            icon={<SearchIcon />}
            iconPosition="right"
          >
            Search
          </Link>
        </div>
      </section>

      {/* External Links */}
      <section>
        <h3 className="text-lg font-semibold mb-4">External Links</h3>
        <div className="space-y-2">
          <Link href="https://github.com" external>
            GitHub (external)
          </Link>
          <Link
            href="https://twitter.com"
            external
            icon={<TwitterIcon />}
          >
            Twitter
          </Link>
        </div>
      </section>

      {/* Disabled Links */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Disabled Links</h3>
        <div className="space-y-2">
          <Link href="/disabled" disabled>Disabled text link</Link>
          <Link href="/disabled" disabled icon={<HomeIcon />}>Disabled with icon</Link>
        </div>
      </section>

      {/* Responsive Design */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Responsive Design</h3>
        <div className="space-y-2">
          <Link
            href="/responsive"
            className="text-sm md:text-base lg:text-lg"
          >
            Responsive text size
          </Link>
          <Link
            href="/mobile"
            className="block sm:inline"
          >
            Block on mobile, inline on desktop
          </Link>
        </div>
      </section>

      {/* In Paragraph Context */}
      <section>
        <h3 className="text-lg font-semibold mb-4">In Paragraph Context</h3>
        <div className="space-y-4">
          <p className="text-base-content">
            This is a paragraph with an <Link href="/inline">inline link</Link> that
            flows naturally with the text. You can also have
            <Link href="https://example.com" external>external links</Link> that
            open in a new tab.
          </p>
          <p className="text-base-content">
            Links can also have <Link href="/icon" icon={<SearchIcon />}>icons</Link>
            when used inline, though this should be used sparingly for better readability.
          </p>
        </div>
      </section>
    </div>
  );
}

// Example icon components using lucide-react
function HomeIcon() {
  return <Home className="w-4 h-4" />;
}

function SearchIcon() {
  return <Search className="w-4 h-4" />;
}

function TwitterIcon() {
  return <Twitter className="w-4 h-4" />;
}

export default LinkExamples;
