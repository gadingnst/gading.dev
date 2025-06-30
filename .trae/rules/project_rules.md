## Next.js + React + TypeScript + DaisyUI Rules 🚀

### Core Stack
- **Framework**: Next.js with TypeScript (no JS files)
- **UI**: DaisyUI v5 + Tailwind CSS ([docs](https://daisyui.com/llms.txt))
- **Icons**: `lucide-react` only
- **Styling**: `cn([])` utility from `@/designs/utils/cn`

### Code Style
- Use `interface` over `type`
- Use `function name() {}` for pure functions, arrow functions for callbacks
- camelCase for variables/functions, descriptive names with auxiliary verbs
- External imports first, then internal modules

### File Structure
- Pages: `@/modules/{ModuleName}/{ModuleName}.page.tsx` → `@/app/{module-name}/page.tsx`
- Components: `ComponentName.tsx`, `index.ts`, `ComponentName.example.tsx`, `README.md`
- Order: exported component, subcomponents, helpers, static content, types

### Mobile-First Design
- **Responsive**: Base (mobile) → sm (640px+) → md (768px+) → lg (1024px+) → xl (1280px+)
- **Layout**: `flex-col` mobile, `flex-row` desktop; full-width mobile, max-width desktop
- **Typography**: Smaller mobile (`text-sm`), larger desktop (`md:text-lg`)
- **Spacing**: Tighter mobile (`p-4`, `gap-2`), wider desktop (`md:p-6`, `lg:gap-4`)
- **Interactions**: Touch-first, hover states on `lg:` only

### Light/Dark Mode
- Use DaisyUI semantic classes: `bg-base-100`, `bg-primary`, `text-primary-content`, and soon.
- Never hardcode colors (`#fff`, `#000`)
- Test both modes before production

### Performance
- Minimize `'use client'`, favor Server Components
- Use `Next.js Image` with WebP, lazy loading
- Dynamic imports for non-critical components
- Wrap client components in `Suspense`

### Server Logic
- **Prefer**: Server actions for forms/mutations
- **Use `/api` only for**: Webhooks, third-party integrations

### Component Patterns
- Reuse base components from `@/packages/components/base/`
- Use `Button`, `Link` components instead of custom solutions
- Follow established variant/size patterns

### Glass Design
- Use `liquid-glass` and `liquid-glass-shadow` utilities
- Provide `glass` variant for applicable components
- Combine with DaisyUI classes for light/dark compatibility

### Icons
- Import from `lucide-react`: `import { IconName } from 'lucide-react'`
- Replace all `<svg>` with lucide components
- Use consistent sizing: `className="w-4 h-4"`
- Common mappings: `ExternalLink`, `Loader2`, `Home`, `Search`, `Plus`, `Download`

### Styling Example
```tsx
// ✅ Good
import cn from '@/designs/utils/cn';
import { Plus } from 'lucide-react';

<Button className={cn(["btn-primary", isActive && "btn-active"])}>
  <Plus className="w-4 h-4" />
  Add Item
</Button>

// ❌ Bad
<button className={`btn-primary ${isActive && "btn-active"}`}>
  <svg>...</svg>
  Add Item
</button>
```
