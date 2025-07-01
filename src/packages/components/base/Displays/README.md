# Parallax Component

A React component for creating smooth parallax scrolling effects, inspired by the `react-parallax` library but built specifically for this project with TypeScript support and modern React patterns.

## Features

- 🎯 **Smooth Parallax Effects**: Create engaging scroll-based animations
- 🖼️ **Background Image Support**: Easy background image integration
- 🌫️ **Dynamic Blur**: Static or scroll-based blur effects
- 🎨 **Custom Render Layers**: Add custom overlays that respond to scroll
- 📱 **Mobile Optimized**: Performance-optimized for all devices
- ♿ **Accessible**: Respects user motion preferences
- 🎛️ **Highly Configurable**: Extensive customization options

## Basic Usage

```tsx
import { Parallax } from '@/packages/components/base/Displays';

function MyComponent() {
  return (
    <Parallax
      bgImage="/path/to/image.jpg"
      bgImageAlt="Description"
      strength={200}
      className="h-96"
    >
      <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white">Parallax Content</h1>
      </div>
    </Parallax>
  );
}
```

## Advanced Examples

### Dynamic Blur Effect

```tsx
<Parallax
  bgImage="/background.jpg"
  bgImageAlt="Background"
  strength={150}
  blur={{ min: 0, max: 15 }}
  className="h-screen"
>
  <YourContent />
</Parallax>
```

### Custom Background Element

```tsx
import { Parallax, Background } from '@/packages/components/base/Displays';

<Parallax strength={300} className="h-96">
  <Background className="bg-gradient-to-br from-blue-500 to-purple-600">
    <div className="absolute inset-0 bg-black/20" />
  </Background>
  <YourContent />
</Parallax>
```

### Custom Render Layer

```tsx
<Parallax
  bgImage="/image.jpg"
  strength={100}
  renderLayer={(percentage) => (
    <div
      className="absolute inset-0 bg-black"
      style={{ opacity: percentage * 0.5 }}
    />
  )}
>
  <YourContent />
</Parallax>
```

### Reverse Direction

```tsx
<Parallax
  bgImage="/image.jpg"
  strength={-200} // Negative value for reverse direction
>
  <YourContent />
</Parallax>
```

## Props

### Parallax Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bgImage` | `string` | - | Background image URL |
| `bgImageAlt` | `string` | `''` | Alt text for background image |
| `bgImageSize` | `string` | - | Image sizes attribute |
| `bgImageSrcSet` | `string` | - | Image srcset attribute |
| `style` | `React.CSSProperties` | - | Custom styles for container |
| `bgStyle` | `React.CSSProperties` | - | Additional styles for background |
| `bgClassName` | `string` | - | Custom className for background |
| `contentClassName` | `string` | `'react-parallax-content'` | Custom className for content |
| `bgImageStyle` | `React.CSSProperties` | - | Specific styles for background image |
| `strength` | `number` | `100` | Parallax effect strength in pixels |
| `blur` | `number \| { min: number; max: number }` | `0` | Blur effect configuration |
| `renderLayer` | `(percentage: number) => React.ReactNode` | - | Custom layer renderer |
| `disabled` | `boolean` | `false` | Disable parallax effect |
| `className` | `string` | - | Additional className |
| `parent` | `Element \| null` | - | Parent element for nested scrolling |
| `children` | `React.ReactNode` | - | Content to display |

### Background Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional className |
| `children` | `React.ReactNode` | - | Background content |

## Performance Considerations

- Uses `requestAnimationFrame` for smooth animations
- Passive scroll listeners for better performance
- CSS `transform3d` for hardware acceleration
- Lazy loading for background images
- Automatic cleanup of event listeners

## Accessibility

- Respects `prefers-reduced-motion` media query
- Proper alt text support for background images
- Semantic HTML structure
- Keyboard navigation friendly

## Browser Support

- Modern browsers with CSS transforms support
- Graceful degradation for older browsers
- Mobile Safari optimized

## Tips

1. **Performance**: Use `strength` values between -300 and 300 for best performance
2. **Mobile**: Consider reducing `strength` on mobile devices
3. **Images**: Use optimized images (WebP when possible)
4. **Height**: Always set a height on the Parallax container
5. **Z-index**: Content has `z-index: 10`, background has `z-index: -1`

## Common Patterns

### Hero Section

```tsx
<Parallax
  bgImage="/hero-bg.jpg"
  bgImageAlt="Hero background"
  strength={200}
  className="h-screen flex items-center justify-center"
>
  <div className="text-center text-white">
    <h1 className="text-6xl font-bold mb-4">Welcome</h1>
    <p className="text-xl">Scroll to see the magic</p>
  </div>
</Parallax>
```

### Card with Parallax Background

```tsx
<div className="rounded-lg overflow-hidden">
  <Parallax
    bgImage="/card-bg.jpg"
    strength={100}
    className="h-64 p-6 flex items-end"
  >
    <div className="text-white">
      <h3 className="text-2xl font-bold">Card Title</h3>
      <p>Card description</p>
    </div>
  </Parallax>
</div>
```

## Troubleshooting

**Parallax not working?**
- Ensure the container has a defined height
- Check that `disabled` prop is not set to `true`
- Verify the background image URL is correct

**Performance issues?**
- Reduce the `strength` value
- Use smaller, optimized images
- Consider disabling on mobile devices

**Content not visible?**
- Check z-index values
- Ensure content has proper contrast against background
- Verify content className is applied correctly