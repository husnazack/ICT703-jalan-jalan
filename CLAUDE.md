# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jalan-Jalan is a cognitive travel planning platform built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui components. The platform consists of 5 feature modules developed by different groups.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Feature Modules (Routes)

| Module | Route | Purpose |
|--------|-------|---------|
| Group 1 | `/chat` | Context-aware AI planning assistant |
| Group 2 | `/wanderboard`, `/dashboard/*` | Interactive travel information dashboard |
| Group 3 | `/informatics/*` | Personal travel informatics (9 screens) |
| Group 4 | `/community/*`, `/admin/*`, `/login`, `/register` | Social & community knowledge layer |
| Group 5 | `/predictions/*` | Predictive & collective analytics |

### Component Organization

```
src/components/
├── ui/           # shadcn/ui primitives (Button, Card, Input, Dialog, etc.)
├── shared/       # Cross-module components (Navigation, Footer)
├── chat/         # Group 1 chat components
├── dashboard/    # Group 2 dashboard components
│   └── cards/    # Dashboard card components
└── informatics/  # Group 3 informatics components
```

Feature-specific components use barrel exports via `index.ts` files.

### Path Alias

Use `@/*` to import from `src/*` (configured in tsconfig.json).

### Styling

- Tailwind CSS v4 with CSS variables for theming
- Use `cn()` from `@/lib/utils` for conditional class merging
- Color scheme uses purple-based theme with `#1E3A8A` primary
- Some modules (Groups 3, 5) use teal (`#14B8A6`) accents
- Dark mode supported via `.dark` class

### Design References

Figma designs available for Groups 1, 2, and 4. See `PROGRESS.md` for links and implementation status.
