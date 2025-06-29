import Button from './Button';

/**
 * Example usage of the Button component with various variants and configurations
 * This file demonstrates all available props and styling options
 */
function ButtonExamples() {
  return (
    <div className="space-y-8 p-6">
      {/* Basic Variants */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </section>

      {/* Status Variants */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Status Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="error">Error</Button>
          <Button variant="info">Info</Button>
        </div>
      </section>

      {/* Liquid Glass Effect */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Liquid Glass Effect</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="glass">Glass Button</Button>
          <Button variant="glass" size="sm">Small Glass</Button>
          <Button variant="glass" size="lg">Large Glass</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" size="xs">Extra Small</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </section>

      {/* Shapes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Shapes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Default</Button>
          <Button variant="primary" shape="square" icon={<PlusIcon />} />
          <Button variant="primary" shape="circle" icon={<HeartIcon />} />
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Buttons with Icons</h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary"
              icon={<DownloadIcon />}
              iconPosition="left"
            >
              Download
            </Button>
            <Button 
              variant="glass"
              icon={<ArrowRightIcon />}
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Loading States</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" loading>
            Loading...
          </Button>
          <Button variant="glass" loading>
            Processing
          </Button>
          <Button variant="outline" loading size="sm">
            Saving
          </Button>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Disabled States</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" disabled>
            Disabled Primary
          </Button>
          <Button variant="glass" disabled>
            Disabled Glass
          </Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
        </div>
      </section>

      {/* Wide and Block */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Wide and Block Buttons</h3>
        <div className="space-y-4">
          <Button variant="primary" wide>
            Wide Button
          </Button>
          <Button variant="glass" block>
            Block Button (Full Width)
          </Button>
        </div>
      </section>

      {/* Interactive Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Interactive Examples</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary"
              onClick={() => alert('Primary clicked!')}
            >
              Click Me
            </Button>
            <Button 
              variant="glass"
              icon={<ShareIcon />}
              onClick={() => alert('Share clicked!')}
            >
              Share
            </Button>
          </div>
        </div>
      </section>

      {/* Responsive Design */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Responsive Design</h3>
        <div className="space-y-2">
          <Button 
            variant="primary"
            className="w-full sm:w-auto"
          >
            Responsive Width
          </Button>
          <Button 
            variant="glass"
            size="sm"
            className="md:btn-md lg:btn-lg"
          >
            Responsive Size
          </Button>
        </div>
      </section>
    </div>
  );
}

// Example icon components (you would import these from your icon library)
function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

export default ButtonExamples;