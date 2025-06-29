import Link from './Link';

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

// Example icon components (you would import these from your icon library)
function HomeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

export default LinkExamples;
