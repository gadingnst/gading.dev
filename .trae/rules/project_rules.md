## Next.js + React + TypeScript + DaisyUI Coding Rules 🚀

### Daisy UI v5
https://daisyui.com/llms.txt

### TypeScript Usage
- Use TypeScript for all code (no JS-only files).
- Prefer `interface` over `type`.
- Use functional components with TypeScript interfaces.
- Use camelCase for all variable and function names.
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`).

### Function Definitions
- Prefer using `function name() {}` for defining functions (pure functions).
- Avoid `const name = () => {}` unless necessary (e.g., callbacks, event handlers).
- Prefer async/await over callbacks for asynchronous code.

### Component & File Structure
- Use React functional components with Tailwind CSS + DaisyUI for UI.
- Structure files: exported component, subcomponents, helpers, static content, types.
- Structure import statements: external libraries first, then internal modules.
- Use modular file structure for components, helpers, and static content. create page in `@/modules/{ModuleName}/{ModuleName}.page.tsx`, then import it in `@/app/{module-name}/page.tsx`

### UI & Mobile-First Design
- Always implement mobile-first responsive design (base first).
- Use Tailwind’s responsive prefixes:
  - Base (no prefix): Mobile (320px-639px)
  - sm: Small tablets (640px+)
  - md: Tablets (768px+)
  - lg: Small desktops (1024px+)
  - xl: Large desktops (1280px+)
  - 2xl: Extra large screens (1536px+)
- Layout Principles:
  - `flex-col` on mobile, `flex-row` on larger screens when needed
  - Collapsible (hamburger) navigation for mobile
  - Stack vertical on mobile, horizontal on desktop
  - Full-width on mobile, max-width on desktop
- Typography & Spacing:
  - Smaller text for mobile (`text-sm`, `text-base`)
  - Bigger text on larger screens (`md:text-lg`, `lg:text-xl`)
  - Tighter spacing on mobile (`p-4`, `gap-2`), wider on desktop (`md:p-6`, `lg:gap-4`)
- Interactive Elements:
  - Prioritize DaisyUI component defaults (which are mobile-first & accessible).
  - Touch-first interaction
  - Hover states only on larger screens (`lg:hover:bg-gray-100`)
  - Swipe gestures and touch-friendly UI
- Light/Dark Mode Support:
  - **Always build UI that is compatible with Light & Dark mode.**
  - Use DaisyUI classes like `bg-base-100`, `bg-base-200`, `bg-primary`, `text-primary-content`, etc.
  - Avoid hardcoding raw colors (`#fff`, `#000`), use semantic DaisyUI variables.
  - Test every page in both modes before production.
- Content Strategy:
  - Prioritize content above the fold on mobile
  - Progressive disclosure for larger screens
  - Collapsible sections on mobile
  - Hide non-essential elements on mobile using `hidden sm:block`

### Performance Optimization
- Optimize images: WebP format, responsive sizes, lazy loading, `Next.js Image` component.
- Minimize bundle size for mobile users with dynamic imports.
- Optimize Web Vitals (LCP, CLS, FID).
- Minimize `'use client'`:
  - Favor server components and Next.js SSR.
  - Use only when necessary for Web APIs.
- Use dynamic loading for non-critical components.

### API & Server Conventions
- Prefer server actions over `/api` routes for server-side logic:
  - Use server actions for form submissions, data mutations, server-side operations.
  - Use `/api` routes only for webhooks or third-party integrations.
- Server actions provide better type safety, performance, and DX.

### Advanced React Patterns
- Minimize `useEffect` and `setState`; prefer React Server Components (RSC).
- Wrap client components in `Suspense` with fallback.
- Follow Next.js official docs for Data Fetching, Rendering, and Routing.

### Component Styling Rules
1. **Use `cn([])` for classes:** `import cn from '@/designs/utils/cn';`
2. **TypeScript required** - proper types for all components

#### Example
```tsx
// ✅ Good
import cn from '@/designs/utils/cn';

<Button
  className={cn([
    "custom-class",
    condition && "extra-class"
  ])}
>
  Click me
</Button>

// ❌ Bad
<button className={`custom-class ${condition && "extra-class"}`}>Click me</button>
```

### Component Design Pattern Rules
- **Always follow the established component patterns** in `@/packages/components/base/`
- **Reuse existing base components** before creating new ones:
  - Use `Button` from `@/packages/components/base/Buttons` for all button interactions
  - Use `Link` from `@/packages/components/base/Navigations` for all navigation links
  - Check existing components in `@/packages/components/base/` before implementing custom solutions
- **Component Structure Standards**:
  - Each component must have: `ComponentName.tsx`, `index.ts`, `ComponentName.example.tsx`, `README.md`
  - Use consistent prop interfaces with proper TypeScript definitions
  - Include comprehensive documentation and usage examples
  - Follow the established variant, size, and styling patterns

### Liquid Glass Design System
- **Always integrate with liquid glass design** when creating UI components
- **Use established liquid glass utilities**:
  - `liquid-glass` - Primary glass effect with backdrop blur and transparency
  - `liquid-glass-shadow` - Enhanced glass effect with shadow styling
- **Glass Design Principles**:
  - Backdrop blur and saturation effects for depth
  - Transparent backgrounds with subtle borders
  - Consistent shadow and elevation patterns
  - Smooth transitions and hover effects
- **Glass Component Integration**:
  - Always provide a `glass` variant for components that support it
  - Ensure glass effects work seamlessly with light/dark mode
  - Maintain visual hierarchy with appropriate opacity levels
  - Use glass effects for overlays, modals, navigation, and floating elements
- **Glass Styling Guidelines**:
  - Combine `liquid-glass` with appropriate DaisyUI classes
  - Use `hover:bg-base-100/30` and `hover:border-primary/20` for interactive states
  - Apply `hover:shadow-lg hover:shadow-primary/10` for elevation changes
  - Include `hover:-translate-y-0.5` for subtle lift effects
