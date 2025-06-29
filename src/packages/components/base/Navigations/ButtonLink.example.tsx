import ButtonLink from './ButtonLink';

/**
 * Example usage of the ButtonLink component with various variants and configurations
 * This file demonstrates all available props and styling options
 */
function ButtonLinkExamples() {
  return (
    <div className="space-y-8 p-6">
      {/* Button Variants */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/login" variant="button">Primary Button</ButtonLink>
          <ButtonLink href="/signup" variant="ghost">Ghost Button</ButtonLink>
          <ButtonLink href="/docs" variant="outline">Outline Button</ButtonLink>
          <ButtonLink href="/premium" variant="accent">Accent Button</ButtonLink>
        </div>
      </section>

      {/* Glass Effect */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Liquid Glass Effect</h3>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/dashboard" variant="glass">Glass Link</ButtonLink>
          <ButtonLink href="/settings" variant="glass" size="sm">Small Glass</ButtonLink>
          <ButtonLink href="/profile" variant="glass" size="lg">Large Glass</ButtonLink>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/xs" variant="button" size="xs">Extra Small</ButtonLink>
          <ButtonLink href="/sm" variant="button" size="sm">Small</ButtonLink>
          <ButtonLink href="/md" variant="button" size="md">Medium</ButtonLink>
          <ButtonLink href="/lg" variant="button" size="lg">Large</ButtonLink>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h3 className="text-lg font-semibold mb-4">ButtonLinks with Icons</h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-4">
            <ButtonLink 
              href="/home" 
              variant="glass"
              icon={<HomeIcon />}
              iconPosition="left"
            >
              Home
            </ButtonLink>
            <ButtonLink 
              href="/search" 
              variant="button"
              icon={<SearchIcon />}
              iconPosition="right"
            >
              Search
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section>
        <h3 className="text-lg font-semibold mb-4">External ButtonLinks</h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="https://github.com" external variant="outline">
              GitHub (external)
            </ButtonLink>
            <ButtonLink 
              href="https://twitter.com" 
              external 
              variant="glass"
              icon={<TwitterIcon />}
            >
              Twitter
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Disabled ButtonLinks */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Disabled ButtonLinks</h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/disabled" disabled variant="button">Disabled button</ButtonLink>
            <ButtonLink href="/disabled" disabled variant="glass">Disabled glass</ButtonLink>
            <ButtonLink href="/disabled" disabled variant="ghost">Disabled ghost</ButtonLink>
          </div>
        </div>
      </section>

      {/* Responsive Design */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Responsive Design</h3>
        <div className="space-y-2">
          <ButtonLink 
            href="/responsive" 
            variant="glass"
            className="text-sm md:text-base lg:text-lg"
          >
            Responsive text size
          </ButtonLink>
          <ButtonLink 
            href="/mobile" 
            variant="button"
            className="w-full sm:w-auto"
          >
            Full width on mobile
          </ButtonLink>
        </div>
      </section>

      {/* Mixed Usage */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Mixed Usage Examples</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <ButtonLink 
              href="/download" 
              variant="accent"
              icon={<DownloadIcon />}
              iconPosition="left"
            >
              Download
            </ButtonLink>
            <ButtonLink 
              href="https://docs.example.com" 
              external
              variant="outline"
              icon={<DocumentIcon />}
              iconPosition="right"
            >
              Documentation
            </ButtonLink>
          </div>
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

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

export default ButtonLinkExamples;