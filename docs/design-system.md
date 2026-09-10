# Design System

## Visual Direction

The portfolio uses a dark-first, premium, slightly futuristic visual language. The goal is a calm personal digital identity rather than a template, dashboard, or gaming interface.

## Typography

- Display / headings: Space Grotesk
- Body: Inter
- Mono / metadata: IBM Plex Mono

Heading scale is editorial and restrained. Body text stays highly readable at every breakpoint. Mono is reserved for labels, technical metadata, and citations.

## Colors

The palette is intentionally restrained:

- background: deep ink
- foreground: soft off-white
- accent: muted cyan/teal
- surfaces: dark layered neutrals
- borders: subtle, low-contrast lines

The system includes semantic slots for success, warning, and destructive states without introducing extra visual noise.

## Spacing

Spacing follows a 4px / 8px rhythm with generous section padding and large whitespace around major content blocks.

## Radius

The radius scale is intentionally small and consistent:

- small
- medium
- large
- pill

## Elevation

Depth is communicated through surface contrast, borders, and minimal shadowing. Shadows are reserved for floating or interactive surfaces.

## Motion

Motion is restrained and supports four basic categories:

- entrance animation
- hover interaction
- page transitions
- future scroll-triggered motion

Reduced-motion preferences are respected by minimizing transforms and keeping transitions subtle.

## Component Architecture

- `components/ui`: reusable primitives such as buttons, chips, badges, inputs, and surfaces
- `components/layout`: container and spacing primitives
- `components/motion`: reusable motion presets for later animated sections

## Accessibility

The foundation uses semantic HTML, visible focus states, keyboard-friendly controls, and contrast-aware tokens. Hover is never the only interaction signal.
