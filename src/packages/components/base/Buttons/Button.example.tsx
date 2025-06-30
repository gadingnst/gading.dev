import { ArrowRight, Download, Heart, Plus, Share } from 'lucide-react';

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

// Example icon components using lucide-react
function PlusIcon() {
  return <Plus className="w-4 h-4" />;
}

function HeartIcon() {
  return <Heart className="w-4 h-4" />;
}

function DownloadIcon() {
  return <Download className="w-4 h-4" />;
}

function ArrowRightIcon() {
  return <ArrowRight className="w-4 h-4" />;
}

function ShareIcon() {
  return <Share className="w-4 h-4" />;
}

export default ButtonExamples;