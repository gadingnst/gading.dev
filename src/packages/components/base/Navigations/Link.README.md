# Link Component

A simple and accessible Link component for text-based navigation, built with DaisyUI 5 and featuring clean typography and external link handling.

## Features

- **Simple Text Links**: Clean, underlined text links with hover effects
- **4 Sizes**: `xs`, `sm`, `md`, `lg`
- **Icon Support**: Left or right positioned icons
- **External Links**: Automatic external link handling with security and visual indicators
- **Responsive**: Mobile-first responsive design
- **Accessible**: WCAG compliant with proper focus states
- **Animations**: Smooth hover and focus transitions
- **TypeScript**: Full type safety and IntelliSense support

## Basic Usage

```tsx
import { Link } from '@/packages/components/base/Navigations';

// Simple text link
<Link href="/about">About Us</Link>

// Link with size
<Link href="/contact" size="lg">Contact</Link>

// External link (automatically shows external icon)
<Link href="https://github.com" external>GitHub</Link>

// Link with icon
<Link href="/home" icon={<HomeIcon />}>Home</Link>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size of the link text |
| `icon` | `ReactNode` | `undefined` | Icon to display |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of the icon |
| `external` | `boolean` | `false` | Whether the link is external (shows external icon) |
| `disabled` | `boolean` | `false` | Whether the link is disabled |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | - | Link content |
| ...rest | `NextLinkProps` | - | All Next.js Link props |

## Text Styling

The Link component provides clean, accessible text links with consistent styling:

### Basic Text Link
Standard text link with underline on hover:
```tsx
<Link href="/page">Standard Text Link</Link>
```

### With Hover Effects
Smooth transitions and color changes:
```tsx
<Link href="/hover">Link with Hover Effects</Link>
```

### In Paragraph Context
Seamlessly integrates with text content:
```tsx
<p>
  This is a paragraph with an <Link href="/inline">inline link</Link> that 
  flows naturally with the text.
</p>
```

## Sizes

The Link component supports four different text sizes:

```tsx
<Link href="/xs" size="xs">Extra Small Link</Link>
<Link href="/sm" size="sm">Small Link</Link>
<Link href="/md" size="md">Medium Link</Link>
<Link href="/lg" size="lg">Large Link</Link>
```

## Icons

Add icons to enhance link meaning and usability:

```tsx
import { HomeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

{/* Icon on the left */}
<Link 
  href="/home" 
  icon={<HomeIcon />}
  iconPosition="left"
>
  Home
</Link>

{/* Icon on the right */}
<Link 
  href="/next" 
  icon={<ArrowRightIcon />}
  iconPosition="right"
>
  Next Page
</Link>
```

## External Links

External links automatically open in new tabs, include security attributes, and show an external link icon:

```tsx
{/* Simple external link */}
<Link href="https://github.com" external>
  GitHub
</Link>

{/* External link with custom icon */}
<Link 
  href="https://twitter.com" 
  external 
  icon={<TwitterIcon />}
>
  Follow us on Twitter
</Link>
```

## Responsive Design

Links adapt beautifully to different screen sizes:

```tsx
{/* Responsive text size */}
<Link 
  href="/responsive" 
  className="text-sm md:text-base lg:text-lg"
>
  Responsive Link
</Link>

{/* Block on mobile, inline on desktop */}
<Link 
  href="/mobile" 
  className="block sm:inline"
>
  Mobile Optimized
</Link>
```

## Disabled State

Disable links when needed:

```tsx
<Link href="/disabled" disabled>
  Disabled Text Link
</Link>

<Link href="/disabled" disabled icon={<HomeIcon />}>
  Disabled Link with Icon
</Link>
```

## Accessibility

The Link component follows WCAG guidelines:

- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Meets WCAG AA contrast requirements
- **Focus Management**: Clear focus states with ring indicators
- **External Link Indication**: Visual and screen reader indication for external links

```tsx
{/* Accessible external link */}
<Link 
  href="https://example.com" 
  external
  aria-label="Visit Example.com (opens in new tab)"
>
  Example
</Link>
```

## Best Practices

1. **Link Text**:
   - Use descriptive, meaningful link text
   - Avoid generic text like "click here" or "read more"
   - Keep link text concise but informative

2. **Icon Usage**:
   - Use icons sparingly and meaningfully
   - Ensure icons enhance rather than clutter the link
   - Consider icon position based on reading flow
   - Avoid icons in paragraph text unless necessary

3. **External Links**:
   - Always set `external={true}` for external URLs
   - The component automatically shows external link indicators
   - Consider security implications of external links

4. **Responsive Design**:
   - Test links on different screen sizes
   - Ensure touch targets are large enough on mobile
   - Use responsive classes when needed

5. **Accessibility**:
   - Provide descriptive link text that makes sense out of context
   - Use ARIA labels for complex links
   - Ensure sufficient color contrast
   - Test with keyboard navigation and screen readers

## Complete Example

```tsx
import { Link } from '@/packages/components/base/Navigations';
import { 
  HomeIcon, 
  DocumentIcon, 
  ExternalLinkIcon 
} from '@heroicons/react/24/outline';

function NavigationExample() {
  return (
    <div className="space-y-6">
      {/* Basic Navigation Links */}
      <nav className="flex flex-wrap gap-4">
        <Link href="/" icon={<HomeIcon />}>Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {/* Different Sizes */}
      <div className="space-y-2">
        <Link href="/small" size="sm">Small Link</Link>
        <Link href="/medium" size="md">Medium Link</Link>
        <Link href="/large" size="lg">Large Link</Link>
      </div>

      {/* External Links */}
      <div className="flex flex-wrap gap-4">
        <Link href="https://github.com" external>
          GitHub
        </Link>
        <Link 
          href="https://docs.example.com" 
          external 
          icon={<DocumentIcon />}
        >
          External Documentation
        </Link>
      </div>

      {/* In Paragraph Context */}
      <div className="prose">
        <p>
          For more information, please visit our 
          <Link href="/help">help center</Link> or check out the 
          <Link href="https://github.com/example" external>source code</Link> 
          on GitHub.
        </p>
      </div>

      {/* Responsive Navigation */}
      <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Link href="/mobile" className="block sm:inline">
          Mobile Optimized
        </Link>
        <Link href="/desktop" size="sm">
          Desktop Link
        </Link>
      </nav>
    </div>
  );
}
```

## Related Components

- **ButtonLink**: For button-styled navigation links with variants like `button`, `ghost`, `outline`, `accent`, and `glass`
- **NextLink**: The underlying Next.js Link wrapper used by this component

## Migration from Previous Version

If you were using the Link component with button variants (`button`, `ghost`, `outline`, `accent`, `glass`), please migrate to the new `ButtonLink` component:

```tsx
// Before
<Link href="/action" variant="button">Action</Link>
<Link href="/secondary" variant="ghost">Secondary</Link>

// After
<ButtonLink href="/action" variant="button">Action</ButtonLink>
<ButtonLink href="/secondary" variant="ghost">Secondary</ButtonLink>
```