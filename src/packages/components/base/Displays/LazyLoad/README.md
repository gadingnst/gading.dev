# LazyImage Component

A React component library for lazy loading images and components with various effects and optimizations, inspired by the `react-lazy-load-image-component` library but built specifically for this project with TypeScript support and modern React patterns.

## Features

- 🚀 **Lazy Loading**: Load images only when they enter the viewport
- 🎯 **IntersectionObserver**: Uses modern browser APIs with fallback support
- 🎨 **Visual Effects**: Built-in blur, opacity, and black-and-white transitions
- 🖼️ **Placeholder Support**: Custom placeholders and low-quality image previews
- ⚡ **Performance Optimized**: Throttled/debounced scroll events and global scroll tracking
- 📱 **Mobile Friendly**: Touch-optimized with passive event listeners
- ♿ **Accessible**: Respects user motion preferences
- 🎛️ **Highly Configurable**: Extensive customization options
- 📦 **Component Lazy Loading**: Lazy load any React component, not just images
- 🔄 **HOC Support**: Higher-order component for scroll position tracking

## Installation

The component is already included in the project. Import the CSS effects if you want to use visual transitions:

```tsx
import '@/packages/components/base/Displays/LazyImage/effects.css';
```

## Basic Usage

### LazyImage

```tsx
import { LazyImage } from '@/packages/components/base/Displays/LazyImage';

function MyComponent() {
  return (
    <LazyImage
      src="/path/to/image.jpg"
      alt="Description"
      width={400}
      height={300}
      className="rounded-lg shadow-lg"
    />
  );
}
```

### LazyLoadComponent

```tsx
import { LazyLoadComponent } from '@/packages/components/base/Displays/LazyImage';

function MyComponent() {
  return (
    <LazyLoadComponent
      placeholder={<div>Loading...</div>}
      threshold={100}
    >
      <HeavyComponent />
    </LazyLoadComponent>
  );
}
```

## Advanced Examples

### Blur Effect

```tsx
import { LazyImage } from '@/packages/components/base/Displays/LazyImage';
import '@/packages/components/base/Displays/LazyImage/effects.css';

<LazyImage
  src="/high-quality-image.jpg"
  placeholderSrc="/low-quality-preview.jpg"
  alt="Beautiful landscape"
  effect="blur"
  width={800}
  height={600}
/>
```

### Custom Placeholder

```tsx
function CustomPlaceholder() {
  return (
    <div className="flex items-center justify-center bg-base-200 rounded-lg">
      <ImageIcon className="w-8 h-8" />
      <span>Loading image...</span>
    </div>
  );
}

<LazyImage
  src="/image.jpg"
  alt="Custom placeholder example"
  placeholder={<CustomPlaceholder />}
  width={400}
  height={300}
/>
```

### Scroll Position Tracking

```tsx
import { trackWindowScroll, useWindowScrollPosition } from '@/packages/components/base/Displays/LazyImage';

// Using HOC
const ScrollTrackedLazyImage = trackWindowScroll(LazyImage);

// Using hook
function ScrollDisplay() {
  const { scrollPosition, isScrollTracking } = useWindowScrollPosition();
  
  return (
    <div>Scroll Y: {scrollPosition.y}px</div>
  );
}
```

### Performance Optimization

```tsx
// Multiple images with optimized scroll tracking
const OptimizedLazyImage = trackWindowScroll(LazyImage, {
  throttleTime: 100,
  usePassive: true
});

// Grid of images
{images.map((image, index) => (
  <OptimizedLazyImage
    key={index}
    src={image.src}
    alt={image.alt}
    effect="opacity"
    threshold={200}
    width={300}
    height={200}
  />
))}
```

## Props

### LazyImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | **Required.** Image source URL |
| `alt` | `string` | - | **Required.** Alt text for the image |
| `width` | `number \| string` | - | Image width |
| `height` | `number \| string` | - | Image height |
| `placeholderSrc` | `string` | - | Placeholder image source while loading |
| `placeholder` | `React.ReactNode` | - | Custom placeholder component |
| `effect` | `'blur' \| 'opacity' \| 'black-and-white'` | - | Visual effect during loading |
| `threshold` | `number` | `100` | Threshold in pixels before image starts loading |
| `useIntersectionObserver` | `boolean` | `true` | Whether to use IntersectionObserver |
| `visibleByDefault` | `boolean` | `false` | Whether image should be visible by default |
| `wrapperClassName` | `string` | - | Custom className for wrapper |
| `wrapperProps` | `React.HTMLAttributes<HTMLSpanElement>` | - | Props for wrapper element |
| `delayMethod` | `'throttle' \| 'debounce'` | `'throttle'` | Delay method for scroll events |
| `delayTime` | `number` | `300` | Delay time in milliseconds |
| `beforeLoad` | `() => void` | - | Function called before image starts loading |
| `onLoad` | `(event: React.SyntheticEvent<HTMLImageElement>) => void` | - | Function called when image has loaded |
| `afterLoad` | `() => void` | - | Function called after image has loaded (deprecated) |
| `className` | `string` | - | Additional className for image |
| `style` | `React.CSSProperties` | - | Custom styles for image |
| `...imgProps` | `React.ImgHTMLAttributes<HTMLImageElement>` | - | Any other image attributes |

### LazyLoadComponent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | **Required.** Content to lazy load |
| `placeholder` | `React.ReactNode` | - | Placeholder content while not in view |
| `threshold` | `number` | `100` | Threshold in pixels before component loads |
| `useIntersectionObserver` | `boolean` | `true` | Whether to use IntersectionObserver |
| `visibleByDefault` | `boolean` | `false` | Whether component should be visible by default |
| `className` | `string` | - | Custom className for wrapper |
| `style` | `React.CSSProperties` | - | Custom styles for wrapper |
| `delayMethod` | `'throttle' \| 'debounce'` | `'throttle'` | Delay method for scroll events |
| `delayTime` | `number` | `300` | Delay time in milliseconds |
| `beforeLoad` | `() => void` | - | Function called before component starts loading |
| `afterLoad` | `() => void` | - | Function called after component has loaded |
| `as` | `keyof JSX.IntrinsicElements` | `'div'` | Custom wrapper element type |

### trackWindowScroll Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `throttleTime` | `number` | `300` | Throttle delay in milliseconds |
| `usePassive` | `boolean` | `true` | Whether to use passive event listeners |
| `trackHorizontal` | `boolean` | `true` | Whether to track horizontal scroll |
| `trackVertical` | `boolean` | `true` | Whether to track vertical scroll |

## Effects

The component includes three built-in effects that require importing the CSS file:

```tsx
import '@/packages/components/base/Displays/LazyImage/effects.css';
```

### Available Effects

1. **`blur`**: Renders a blurred placeholder and transitions to sharp image
2. **`black-and-white`**: Renders a grayscale placeholder and transitions to color
3. **`opacity`**: Fades in from transparent to opaque

### Custom Effect Timing

You can customize transition timing using wrapper props:

```tsx
<LazyImage
  src="/image.jpg"
  alt="Custom timing"
  effect="blur"
  wrapperProps={{
    style: {
      transitionDelay: '0.5s',
      transitionDuration: '0.8s'
    }
  }}
/>
```

## Performance Tips

1. **Use trackWindowScroll HOC**: For multiple lazy components, use the HOC to share scroll position tracking
2. **Optimize thresholds**: Use appropriate threshold values (100-300px typically work well)
3. **Choose the right delay method**: Use `throttle` for smooth scrolling, `debounce` for performance
4. **Placeholder images**: Use low-quality placeholder images for better perceived performance
5. **IntersectionObserver**: Keep it enabled unless you need to support very old browsers

## Browser Support

- **IntersectionObserver**: Modern browsers (IE11+ with polyfill)
- **Fallback**: Scroll-based detection for older browsers
- **Passive listeners**: Supported in modern browsers for better performance
- **Reduced motion**: Respects `prefers-reduced-motion` media query

## Accessibility

- Always provide meaningful `alt` text for images
- The component respects `prefers-reduced-motion` settings
- Focus styles are included for keyboard navigation
- High contrast mode is supported

## Common Patterns

### Image Gallery

```tsx
const images = [
  { src: '/image1.jpg', alt: 'Description 1' },
  { src: '/image2.jpg', alt: 'Description 2' },
  // ...
];

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {images.map((image, index) => (
    <LazyImage
      key={index}
      src={image.src}
      alt={image.alt}
      effect="opacity"
      className="rounded-lg shadow-md"
      width={300}
      height={200}
    />
  ))}
</div>
```

### Hero Image with Blur

```tsx
<LazyImage
  src="/hero-image-hd.jpg"
  placeholderSrc="/hero-image-lowres.jpg"
  alt="Hero background"
  effect="blur"
  className="w-full h-screen object-cover"
  threshold={500}
/>
```

### Lazy Content Sections

```tsx
<LazyLoadComponent
  threshold={200}
  placeholder={<SkeletonLoader />}
  beforeLoad={() => console.log('Loading heavy content')}
>
  <ExpensiveChart data={chartData} />
</LazyLoadComponent>
```

## Migration from react-lazy-load-image-component

This component is designed to be a drop-in replacement with the same API:

```tsx
// Before
import { LazyLoadImage } from 'react-lazy-load-image-component';

// After
import { LazyImage as LazyLoadImage } from '@/packages/components/base/Displays/LazyImage';
```

Most props are compatible, with some additional features and TypeScript improvements.