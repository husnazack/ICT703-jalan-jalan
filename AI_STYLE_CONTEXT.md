# Jalan-Jalan UI/UX Design System - AI Context Document

This document provides complete technical specifications for rebuilding the Jalan-Jalan UI in another project.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.0 | App Router, React framework |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | v4 | Utility-first CSS |
| shadcn/ui | new-york style | Component primitives |
| Framer Motion | 12.26.2 | Animations |
| Lucide React | 0.562.0 | Icons |
| Recharts | 3.6.0 | Data visualization |

---

## Project Setup

### Package Dependencies

```json
{
  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.26.2",
    "lucide-react": "^0.562.0",
    "next": "16.1.0",
    "react": "19.2.3",
    "react-day-picker": "^9.13.0",
    "react-dom": "19.2.3",
    "recharts": "^3.6.0",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  }
}
```

### PostCSS Config (postcss.config.mjs)

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### TypeScript Config (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### shadcn/ui Config (components.json)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## Typography

### Primary Font: Nunito

```tsx
import { Nunito } from "next/font/google";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Apply in layout
<body className={`${nunito.variable} antialiased`}>
```

### Font Variables

```css
--font-sans: var(--font-nunito);
--font-mono: var(--font-geist-mono);
--font-display: var(--font-nunito);
```

### Font Weights

| Weight | Usage |
|--------|-------|
| 400 | Body text (rarely used) |
| 500 | Secondary text |
| 600 | **Default body weight** |
| 700 | Semi-bold emphasis |
| 800 | **Headings (h1-h6)** |
| 900 | Extra bold emphasis |

### Typography Base Styles

```css
body {
  font-family: var(--font-nunito), 'Nunito', system-ui, sans-serif;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 800;
  letter-spacing: -0.02em;
}
```

---

## Color System

### Brand Palette (Jalan-Jalan)

Colors extracted from brand mascot (a travel bus):

| Color Name | Hex | CSS Variable | Usage |
|------------|-----|--------------|-------|
| **Terracotta** | `#C75A3B` | `--jj-terracotta` | Primary CTA, headers, key actions |
| Terracotta Dark | `#A84832` | `--jj-terracotta-dark` | Hover states, shadows |
| Terracotta Light | `#E07050` | `--jj-terracotta-light` | Light accents |
| **Sky Blue** | `#7CB9E8` | `--jj-sky` | Secondary actions, links |
| Sky Blue Dark | `#5A9FD4` | `--jj-sky-dark` | Hover states |
| Sky Blue Light | `#A8D4F5` | `--jj-sky-light` | Backgrounds |
| **Cyan** | `#7DD4E4` | `--jj-cyan` | Info, highlights |
| Cyan Dark | `#5AC0D3` | `--jj-cyan-dark` | Hover states |
| Cyan Light | `#A5E5F0` | `--jj-cyan-light` | Backgrounds |
| **Green** | `#389B59` | `--jj-green` | Success, progress, nature |
| Green Dark | `#2D7D46` | `--jj-green-dark` | Hover states |
| Green Light | `#4CB76D` | `--jj-green-light` | Light accents |
| **Cream** | `#F5EDE0` | `--jj-cream` | Backgrounds, cards |
| Cream Dark | `#E8DCC8` | `--jj-cream-dark` | Borders, shadows |
| Cream Light | `#FDF8F2` | `--jj-cream-light` | Page backgrounds |
| **Brown** | `#3D1F1A` | `--jj-brown` | Primary text, outlines |
| Brown Light | `#5C3830` | `--jj-brown-light` | Secondary text |
| **Navy** | `#1E3A8A` | `--jj-navy` | Trust, depth, premium actions |
| Navy Light | `#2B4B9B` | `--jj-navy-light` | Hover states |
| **Coral** | `#E85D3B` | `--jj-coral` | Alerts, energy, emphasis |
| Coral Dark | `#C94A2B` | `--jj-coral-dark` | Hover states |
| **Yellow** | `#FBBF24` | `--duo-yellow` | XP badges, highlights |
| **Pink** | `#F472B6` | `--duo-pink` | Accent color |

### Semantic Colors (Light Theme)

```css
:root {
  /* Backgrounds */
  --background: #FFFDF9;      /* Warm cream page bg */
  --foreground: #3D1F1A;      /* Brown text */

  /* Cards & Popovers */
  --card: #FFFFFF;
  --card-foreground: #3D1F1A;
  --popover: #FFFFFF;
  --popover-foreground: #3D1F1A;

  /* Primary Action (Terracotta) */
  --primary: #C75A3B;
  --primary-foreground: #FFFFFF;

  /* Secondary (Cream) */
  --secondary: #F5EDE0;
  --secondary-foreground: #3D1F1A;

  /* Muted */
  --muted: #F5EDE0;
  --muted-foreground: #8B7355;

  /* Accent (Sky Blue) */
  --accent: #7CB9E8;
  --accent-foreground: #FFFFFF;

  /* Destructive */
  --destructive: #E85D3B;

  /* Borders & Inputs */
  --border: #E8DCC8;
  --input: #FFFFFF;
  --ring: #C75A3B;

  /* Chart Colors */
  --chart-1: #389B59;  /* Green */
  --chart-2: #7CB9E8;  /* Sky */
  --chart-3: #C75A3B;  /* Terracotta */
  --chart-4: #1E3A8A;  /* Navy */
  --chart-5: #E85D3B;  /* Coral */
}
```

### Dark Theme

```css
.dark {
  --background: #1A1210;       /* Deep brown */
  --foreground: #F5EDE0;       /* Cream text */
  --card: #2A1F1A;
  --card-foreground: #F5EDE0;
  --popover: #2A1F1A;
  --popover-foreground: #F5EDE0;

  --primary: #E07050;          /* Lighter terracotta */
  --primary-foreground: #1A1210;

  --secondary: #3D2A24;
  --secondary-foreground: #F5EDE0;

  --muted: #3D2A24;
  --muted-foreground: #C4A589;

  --accent: #A8D4F5;           /* Lighter sky */
  --accent-foreground: #1A1210;

  --destructive: #F87171;
  --border: #3D2A24;
  --input: #3D2A24;
  --ring: #E07050;
}
```

---

## Border Radius System

```css
--radius: 1rem;              /* Base: 16px */
--radius-sm: calc(var(--radius) - 4px);   /* 12px */
--radius-md: calc(var(--radius) - 2px);   /* 14px */
--radius-lg: var(--radius);               /* 16px */
--radius-xl: calc(var(--radius) + 4px);   /* 20px */
--radius-2xl: calc(var(--radius) + 8px);  /* 24px */
--radius-3xl: calc(var(--radius) + 12px); /* 28px */
--radius-4xl: calc(var(--radius) + 16px); /* 32px */
```

---

## Utility Function

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Component Patterns

### 3D Button System (Duolingo-style)

Buttons have a raised 3D effect with shadow that responds to press.

```css
.duo-btn {
  @apply relative inline-flex items-center justify-center gap-2 font-bold text-lg rounded-2xl px-6 py-3;
  @apply transition-all duration-150 ease-out;
  @apply active:translate-y-1 active:shadow-none;
  --btn-shadow-color: var(--jj-terracotta-dark);
  box-shadow: 0 4px 0 var(--btn-shadow-color);
  background: var(--jj-terracotta);
  color: white;
}

.duo-btn:hover {
  filter: brightness(1.05);
}

.duo-btn:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 var(--btn-shadow-color);
}
```

#### Button Variants

| Class | Color | Use Case |
|-------|-------|----------|
| `.duo-btn` | Terracotta | Primary CTA |
| `.duo-btn-blue` | Sky Blue | Secondary |
| `.duo-btn-green` | Green | Success/Confirm |
| `.duo-btn-orange` | Coral | Accent/Warning |
| `.duo-btn-purple` | Navy | Premium |
| `.duo-btn-red` | Coral | Destructive |
| `.duo-btn-outline` | Transparent | Ghost |
| `.duo-btn-disabled` | Gray | Disabled |

#### Button Sizes

| Class | Padding | Shadow |
|-------|---------|--------|
| `.duo-btn-sm` | `px-4 py-2 rounded-xl` | `0 3px 0` |
| `.duo-btn` (default) | `px-6 py-3 rounded-2xl` | `0 4px 0` |
| `.duo-btn-lg` | `px-8 py-4 rounded-3xl` | `0 6px 0` |

### 3D Card System

```css
.duo-card {
  @apply bg-white rounded-3xl border-2 p-6;
  border-color: var(--jj-cream-dark);
  box-shadow: 0 4px 0 var(--jj-cream-dark);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  color: var(--jj-brown);
}

.duo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 var(--jj-cream-dark);
}

.duo-card-interactive:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 var(--jj-cream-dark);
}
```

#### Card Color Variants

| Class | Border & Shadow Color |
|-------|----------------------|
| `.duo-card-green` | Green |
| `.duo-card-blue` | Sky Blue |
| `.duo-card-orange` / `.duo-card-terracotta` | Terracotta |
| `.duo-card-purple` / `.duo-card-navy` | Navy |
| `.duo-card-coral` | Coral |
| `.duo-card-cyan` | Cyan |

### Input System

```css
.duo-input {
  @apply w-full px-4 py-3 text-lg font-semibold rounded-2xl border-2;
  @apply transition-all duration-150;
  @apply focus:outline-none focus:ring-0;
  border-color: var(--jj-cream-dark);
  background: #FFFFFF;
  color: var(--jj-brown);
}

.duo-input::placeholder {
  color: var(--jj-brown-light);
  opacity: 0.6;
}

.duo-input:focus {
  border-color: var(--jj-terracotta);
  box-shadow: 0 0 0 3px rgba(199, 90, 59, 0.2);
}
```

### Progress Bars

```css
.duo-progress {
  @apply relative h-5 rounded-full overflow-hidden;
  background: var(--jj-cream-dark);
}

.duo-progress-bar {
  @apply h-full rounded-full transition-all duration-500 ease-out;
  background: linear-gradient(180deg, var(--jj-green-light) 0%, var(--jj-green) 100%);
}
```

### XP Progress Bar

```css
.duo-xp-bar {
  @apply relative h-3 rounded-full overflow-hidden;
  background: var(--jj-cream-dark);
}

.duo-xp-fill {
  @apply h-full rounded-full;
  background: linear-gradient(90deg, var(--duo-yellow) 0%, var(--jj-terracotta) 100%);
}
```

---

## Wizard/Lesson Layout

Full-screen step-based experience:

```css
.duo-wizard-container {
  @apply min-h-screen flex flex-col;
  background: var(--jj-cream-light);
}

.duo-wizard-content {
  @apply flex-1 flex flex-col items-center px-4 pt-4;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: calc(6rem + env(safe-area-inset-bottom));
}

.duo-wizard-footer {
  @apply fixed bottom-0 left-0 right-0 px-4 pt-4;
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  background: #FFFFFF;
  border-top: 2px solid var(--jj-cream-dark);
}
```

### Wizard Option Cards

```css
.duo-wizard-option {
  @apply w-full flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer;
  border-color: var(--jj-cream-dark);
  background: #FFFFFF;
  box-shadow: 0 4px 0 var(--jj-cream-dark);
}

.duo-wizard-option.selected {
  border-color: var(--jj-terracotta);
  background: rgba(199, 90, 59, 0.08);
  box-shadow: 0 4px 0 var(--jj-terracotta-dark);
}
```

---

## Bottom Navigation

```css
.duo-bottom-nav {
  @apply fixed bottom-0 left-0 right-0 z-50;
  background: #FFFFFF;
  border-top: 2px solid var(--jj-cream-dark);
  padding-bottom: env(safe-area-inset-bottom);
}

.duo-nav-item {
  @apply flex flex-col items-center justify-center;
  flex: 1;
  padding: 0.5rem 0.125rem;
  border-radius: 0.75rem;
  border: 2px solid transparent;
  color: var(--jj-brown-light);
}

.duo-nav-item.active {
  color: var(--jj-terracotta);
  background: linear-gradient(135deg, rgba(199, 90, 59, 0.15) 0%, rgba(199, 90, 59, 0.25) 100%);
  border-color: var(--jj-terracotta);
  box-shadow: 0 2px 8px rgba(199, 90, 59, 0.3);
}
```

---

## Animations

### Mascot Bounce

```css
@keyframes mascot-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.duo-mascot {
  animation: mascot-bounce 2s ease-in-out infinite;
}
```

### Flame Dance (Streak)

```css
@keyframes flame-dance {
  0% { transform: scale(1) rotate(-5deg); }
  100% { transform: scale(1.1) rotate(5deg); }
}

.duo-streak-flame {
  animation: flame-dance 0.5s ease-in-out infinite alternate;
}
```

### Celebration Pop

```css
@keyframes celebration-pop {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}
```

### Bounce In

```css
@keyframes bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}
```

### Slide Up Fade

```css
@keyframes slide-up-fade {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

### Animation Utility Classes

```css
.animate-float-bounce { animation: float-bounce 3s ease-in-out infinite; }
.animate-shimmer { animation: shimmer 2s linear infinite; }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
.animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.animate-slide-up-fade { animation: slide-up-fade 0.4s ease-out; }
```

---

## Gamification Components

### Streak Badge

```css
.duo-streak {
  @apply inline-flex items-center gap-2 rounded-2xl font-bold;
  background: linear-gradient(135deg, var(--jj-terracotta) 0%, var(--jj-coral) 100%);
  color: white;
}
```

### XP Badge

```css
.duo-xp-badge {
  @apply inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold;
  background: var(--duo-yellow);
  color: var(--jj-brown);
}
```

### Level Badge

```css
.duo-level-badge {
  @apply inline-flex items-center justify-center font-extrabold rounded-full;
  background: linear-gradient(135deg, var(--duo-yellow) 0%, var(--jj-terracotta) 100%);
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
```

### Avatar

```css
.duo-avatar {
  @apply relative rounded-full overflow-hidden border-4;
  border-color: var(--jj-terracotta);
  box-shadow: 0 4px 0 var(--jj-terracotta-dark);
}
```

---

## Accessibility

### High Contrast Mode

Add `.high-contrast` class to root for maximum readability:

```css
.high-contrast {
  --background: #FFFFFF;
  --foreground: #000000;
  --primary: #0000EE;
  --border: #000000;
  /* ... */
}

.dark.high-contrast {
  --background: #000000;
  --foreground: #FFFFFF;
  --primary: #FFFF00;
  --border: #FFFFFF;
  /* ... */
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Mobile Safe Areas

```css
.safe-bottom {
  padding-bottom: calc(5rem + env(safe-area-inset-bottom));
}

.safe-top {
  padding-top: env(safe-area-inset-top);
}
```

---

## Performance Optimizations

### GPU Acceleration

```css
.duo-card,
.duo-btn,
.duo-wizard-option,
.duo-nav-item,
.duo-mascot {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### Scroll Optimization

```css
.scroll-smooth {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

### Containment

```css
.contain-layout { contain: layout; }
.contain-paint { contain: paint; }
.contain-strict { contain: strict; }
```

---

## Directory Structure

```
src/
├── app/
│   ├── globals.css          # All CSS variables & custom styles
│   └── layout.tsx           # Root layout with providers
├── components/
│   ├── ui/                   # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── shared/               # Cross-module components
├── contexts/                 # React contexts
├── hooks/                    # Custom hooks
└── lib/
    └── utils.ts              # cn() utility
```

---

## Quick Start Checklist

1. **Install dependencies** from package.json
2. **Configure PostCSS** with `@tailwindcss/postcss`
3. **Set up TypeScript** with path alias `@/*`
4. **Initialize shadcn/ui** with `new-york` style
5. **Add Nunito font** via `next/font/google`
6. **Copy globals.css** with all CSS variables
7. **Create utils.ts** with `cn()` function
8. **Apply font variable** to body: `${nunito.variable} antialiased`

---

## Design Philosophy

1. **Playful & Approachable**: Rounded corners (2xl-3xl), warm colors
2. **3D Depth**: Bottom shadows on interactive elements
3. **Gamified**: XP, streaks, levels, celebrations
4. **Mobile-First**: Bottom nav, safe areas, touch-friendly targets
5. **Accessible**: High contrast mode, reduced motion support
6. **Performance**: GPU acceleration, containment, smooth scrolling
