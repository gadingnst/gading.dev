import { Download, FileText, Home, Search, Twitter } from 'lucide-react';

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

      {/* Locale-Aware ButtonLinks */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Locale-Aware ButtonLinks</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/dashboard" variant="button">Dashboard (no locale)</ButtonLink>
            <ButtonLink href="/dashboard" withCurrentLocale variant="glass">
              Dashboard (with current locale)
            </ButtonLink>
            <ButtonLink 
              href="/settings" 
              withCurrentLocale 
              variant="outline"
              icon={<HomeIcon />}
            >
              Settings (with locale and icon)
            </ButtonLink>
            <ButtonLink 
              href="/external" 
              withCurrentLocale 
              external 
              variant="accent"
            >
              External (with locale)
            </ButtonLink>
          </div>
          <div className="mt-4 p-4 bg-base-200 rounded-lg">
            <p className="text-sm text-base-content/70">
              <strong>Note:</strong> When <code>withCurrentLocale=true</code>, the href will be automatically 
              prefixed with the current language code (e.g., /en/dashboard, /id/settings).
            </p>
          </div>
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

function DownloadIcon() {
  return <Download className="w-4 h-4" />;
}

function DocumentIcon() {
  return <FileText className="w-4 h-4" />;
}

export default ButtonLinkExamples;
