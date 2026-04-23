# Lithium Design System

Minimal React + Tailwind + Storybook starter for building a design system from
Figma without extra framework layers.

## Scripts

- `npm run dev` starts the Vite app
- `npm run storybook` starts Storybook on port `6006`
- `npm run build` builds the app
- `npm run build-storybook` builds the Storybook site

## Project shape

- `src/components` contains design-system components and stories
- `src/index.css` contains Tailwind import plus design tokens
- `.storybook` contains the minimal Storybook config

## Recommended workflow

1. Define the smallest useful token set from Figma.
2. Build one component at a time with a small prop API.
3. Review states in Storybook before scaling the library.
4. Add more variants only when product usage justifies them.
