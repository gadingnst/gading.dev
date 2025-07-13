# Button Component

Reusable Button component with intuitive styling using DaisyUI 5 and liquid glass design integration.

## Features

- 🎨 **Multiple Variants**: Primary, secondary, accent, ghost, glass, outline, and status variants
- 📱 **Responsive Design**: Mobile-first approach with responsive sizing
- ✨ **Liquid Glass Effect**: Seamless integration with liquid glass design system
- 🔄 **Loading States**: Built-in loading spinner with smooth animations
- 🎯 **Accessibility**: Focus management, keyboard navigation, and ARIA support
- 🎭 **Icon Support**: Left/right icon positioning with loading state handling
- 🎪 **Smooth Animations**: Hover effects, transitions, and micro-interactions
- 🔲 **Multiple Shapes**: Default, square, and circle shapes
- 📏 **Flexible Sizing**: Extra small to large with wide and block options

## Usage

```tsx
import { Button } from '@/packages/components/base/Buttons';

// Basic usage
<Button variant="primary">Click Me</Button>

// With icon
<Button 
  variant="glass"
  icon={<DownloadIcon />}
  iconPosition="left"
>
  Download
</Button>

// Loading state
<Button variant="primary" loading>
  Processing...
</Button>

// Different shapes
<Button variant="primary" shape="circle" icon={<HeartIcon />} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'glass' \| 'outline' \| 'error' \| 'warning' \| 'success' \| 'info'` | `'primary'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size of the button |
| `shape` | `'default' \| 'square' \| 'circle'` | `'default'` | Shape of the button |
| `icon` | `ReactNode` | `undefined` | Icon to display |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of the icon |
| `loading` | `boolean` | `false` | Whether the button is in loading state |
| `wide` | `boolean` | `false` | Whether the button should be wider |
| `block` | `boolean` | `false` | Whether the button should be full width |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `className` | `string` | `undefined` | Additional CSS classes |

*Inherits all props from HTMLButtonElement*

## Variants

### Primary
Main action button with primary color and shadow effects.

```tsx
<Button variant="primary">Primary Action</Button>
```

### Secondary
Secondary action button with secondary color scheme.

```tsx
<Button variant="secondary">Secondary Action</Button>
```

### Accent
Accent color button for special actions.

```tsx
<Button variant="accent">Special Action</Button>
```

### Ghost
Subtle button style with transparent background.

```tsx
<Button variant="ghost">Ghost Button</Button>
```

### Glass
Liquid glass effect with backdrop blur and transparency.

```tsx
<Button variant="glass">Glass Button</Button>
```

### Outline
Outlined button style with border.

```tsx
<Button variant="outline">Outline Button</Button>
```

### Status Variants
Buttons for different status messages.

```tsx
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
<Button variant="info">Info</Button>
```

## Sizes

```tsx
<Button variant="primary" size="xs">Extra Small</Button>
<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium (default)</Button>
<Button variant="primary" size="lg">Large</Button>
```

## Shapes

```tsx
// Default rectangular shape
<Button variant="primary">Default</Button>

// Square shape (for icon-only buttons)
<Button variant="primary" shape="square" icon={<PlusIcon />} />

// Circle shape (for icon-only buttons)
<Button variant="primary" shape="circle" icon={<HeartIcon />} />
```

## Icons

```tsx
// Left icon (default)
<Button variant="primary" icon={<DownloadIcon />}>
  Download
</Button>

// Right icon
<Button variant="primary" icon={<ArrowIcon />} iconPosition="right">
  Next
</Button>

// Icon-only buttons
<Button variant="primary" shape="square" icon={<EditIcon />} />
<Button variant="primary" shape="circle" icon={<HeartIcon />} />
```

## Loading States

```tsx
// Loading with text
<Button variant="primary" loading>
  Processing...
</Button>

// Loading replaces icon
<Button variant="primary" icon={<SaveIcon />} loading>
  Saving
</Button>

// Loading in different variants
<Button variant="glass" loading>
  Loading Glass
</Button>
```

## Wide and Block Buttons

```tsx
// Wide button (extra padding)
<Button variant="primary" wide>
  Wide Button
</Button>

// Block button (full width)
<Button variant="primary" block>
  Block Button
</Button>
```

## Disabled State

```tsx
<Button variant="primary" disabled>
  Disabled Button
</Button>

// Automatically disabled when loading
<Button variant="primary" loading>
  Loading (Auto-disabled)
</Button>
```

## Event Handling

```tsx
<Button 
  variant="primary"
  onClick={() => console.log('Button clicked!')}
>
  Click Me
</Button>

<Button 
  variant="glass"
  onMouseEnter={() => console.log('Mouse entered')}
  onMouseLeave={() => console.log('Mouse left')}
>
  Hover Me
</Button>
```

## Responsive Design

```tsx
// Responsive sizing
<Button 
  variant="primary"
  size="sm"
  className="md:btn-md lg:btn-lg"
>
  Responsive Size
</Button>

// Full width on mobile, auto on larger screens
<Button 
  variant="primary"
  className="w-full sm:w-auto"
>
  Responsive Width
</Button>

// Different variants on different screen sizes
<Button 
  variant="outline"
  className="md:btn-primary"
>
  Responsive Variant
</Button>
```

## Accessibility

- Focus management with visible focus rings
- Keyboard navigation support (Enter and Space)
- Screen reader friendly
- Proper ARIA attributes
- Color contrast compliance
- Disabled state handling

## Animation Effects

- Smooth hover transitions (300ms)
- Scale effect on active state (scale-95)
- Icon animations on hover
- Loading spinner animation
- Elevation changes with shadow effects
- Backdrop blur transitions for glass variant

## Integration with Liquid Glass Design

The `glass` variant seamlessly integrates with the liquid glass design system:

- Uses `liquid-glass` utility class
- Backdrop blur and saturation effects
- Transparent backgrounds with border styling
- Consistent with other glass components in the design system

## Best Practices

1. **Use appropriate variants**: 
   - `primary` for main actions
   - `secondary` for secondary actions
   - `ghost` for subtle actions
   - `glass` for buttons in glass containers
   - Status variants for feedback messages

2. **Loading states**: Always provide feedback for async operations

3. **Icons**: Keep icons simple and relevant to the button purpose

4. **Accessibility**: Ensure sufficient color contrast and focus states

5. **Responsive design**: Consider mobile-first approach with responsive classes

6. **Button text**: Use clear, action-oriented text

## Examples

See `Button.example.tsx` for comprehensive usage examples.

## Common Patterns

### Form Buttons
```tsx
<div className="flex gap-2">
  <Button variant="primary" type="submit">
    Save
  </Button>
  <Button variant="ghost" type="button">
    Cancel
  </Button>
</div>
```

### Action Buttons with Icons
```tsx
<div className="flex gap-2">
  <Button variant="success" icon={<CheckIcon />}>
    Approve
  </Button>
  <Button variant="error" icon={<XIcon />}>
    Reject
  </Button>
</div>
```

### Loading States
```tsx
const [isLoading, setIsLoading] = useState(false);

<Button 
  variant="primary" 
  loading={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await performAction();
    setIsLoading(false);
  }}
>
  {isLoading ? 'Processing...' : 'Submit'}
</Button>
```