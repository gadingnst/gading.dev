# Link Component

Reusable Link component with intuitive styling using DaisyUI 5 and liquid glass design integration.

## Features

- 🎨 **Multiple Variants**: Default, button, glass, ghost, outline, and accent styles
- 📱 **Responsive Design**: Mobile-first approach with responsive sizing
- ✨ **Liquid Glass Effect**: Seamless integration with liquid glass design system
- 🔗 **External Link Support**: Automatic external link handling with visual indicators
- 🎯 **Accessibility**: Focus management and keyboard navigation
- 🎭 **Icon Support**: Left/right icon positioning with smooth animations
- 🎪 **Smooth Animations**: Hover effects, transitions, and micro-interactions

## Usage

```tsx
import { Link } from '@/packages/components/base/Navigations';

// Basic usage
<Link href="/about">About Us</Link>

// Button variant
<Link href="/contact" variant="button">Contact</Link>

// Liquid glass effect
<Link href="/dashboard" variant="glass">Dashboard</Link>

// With icon
<Link 
  href="/home" 
  variant="glass"
  icon={<HomeIcon />}
  iconPosition="left"
>
  Home
</Link>

// External link
<Link href="https://github.com" external>
  GitHub
</Link>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'button' \| 'glass' \| 'ghost' \| 'outline' \| 'accent'` | `'default'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size of the link |
| `icon` | `ReactNode` | `undefined` | Icon to display |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of the icon |
| `external` | `boolean` | `false` | Whether the link is external (adds target="_blank" and external icon) |
| `disabled` | `boolean` | `false` | Whether the link is disabled |
| `className` | `string` | `undefined` | Additional CSS classes |

*Inherits all props from NextLink component*

## Variants

### Default
Standard text link with hover underline effect.

```tsx
<Link href="/page">Default Link</Link>
```

### Button
Button-styled link with primary color and shadow effects.

```tsx
<Link href="/action" variant="button">Button Link</Link>
```

### Glass
Liquid glass effect with backdrop blur and transparency.

```tsx
<Link href="/dashboard" variant="glass">Glass Link</Link>
```

### Ghost
Subtle button style with transparent background.

```tsx
<Link href="/secondary" variant="ghost">Ghost Link</Link>
```

### Outline
Outlined button style with border.

```tsx
<Link href="/outlined" variant="outline">Outline Link</Link>
```

### Accent
Accent color button for special actions.

```tsx
<Link href="/special" variant="accent">Accent Link</Link>
```

## Sizes

```tsx
<Link href="/page" size="xs">Extra Small</Link>
<Link href="/page" size="sm">Small</Link>
<Link href="/page" size="md">Medium (default)</Link>
<Link href="/page" size="lg">Large</Link>
```

## Icons

```tsx
// Left icon (default)
<Link href="/home" icon={<HomeIcon />}>
  Home
</Link>

// Right icon
<Link href="/next" icon={<ArrowIcon />} iconPosition="right">
  Next
</Link>
```

## External Links

```tsx
// Automatically adds target="_blank", rel="noopener noreferrer", and external icon
<Link href="https://example.com" external>
  External Site
</Link>
```

## Responsive Design

```tsx
// Responsive sizing
<Link 
  href="/responsive" 
  variant="glass"
  className="text-sm md:text-base lg:text-lg"
>
  Responsive Text
</Link>

// Full width on mobile
<Link 
  href="/mobile" 
  variant="button"
  className="w-full sm:w-auto"
>
  Mobile Full Width
</Link>
```

## Accessibility

- Focus management with visible focus rings
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA attributes for external links
- Color contrast compliance

## Animation Effects

- Smooth hover transitions (300ms)
- Scale effect on active state
- Icon animations on hover
- Backdrop blur transitions for glass variant
- Elevation changes with shadow effects

## Integration with Liquid Glass Design

The `glass` variant seamlessly integrates with the liquid glass design system:

- Uses `liquid-glass` utility class
- Backdrop blur and saturation effects
- Transparent backgrounds with border styling
- Consistent with other glass components in the design system

## Best Practices

1. **Use appropriate variants**: 
   - `default` for inline text links
   - `button` for primary actions
   - `glass` for navigation in glass containers
   - `ghost` for secondary actions

2. **External links**: Always use `external` prop for external URLs

3. **Icons**: Keep icons simple and relevant to the link purpose

4. **Responsive design**: Consider mobile-first approach with responsive classes

5. **Accessibility**: Ensure sufficient color contrast and focus states

## Examples

See `Link.example.tsx` for comprehensive usage examples.