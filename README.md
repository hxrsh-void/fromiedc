# KageLandingPage (ThreeUI) in fromiedc

Integrates the ThreeUI `KageLandingPage` component from its exact registered source
(source revision SHA-256 `c8e06b90397a`, package `@designcodeio/threeui@1.2.0`).

## Run

```bash
npm install
npm run dev    # or: npm run build && npm run preview
```

Open the local URL Vite prints. The page iframes `/landing-pages/kage.html`,
served from `public/`, and applies the configured typography/colour props.

## Layout

- `src/App.tsx` — the configured `<KageLandingPage />` usage (Onest fonts, vermilion `#e0231c`).
- `src/shaders/` — exact registered component source, byte-for-byte from the
  ThreeUI source bundle (`LandingPages.tsx`, `LandingPageFrame.tsx`,
  `pageTypography.ts`, `pageRecipes.ts`, `threeui.css`). The app imports the
  published package build of this same source via `@designcodeio/threeui`.
- `public/landing-pages/kage.html` — canonical authored page (byte-exact).
- `public/landing-pages/secret-pathways-assets/` — fonts, Three.js runtime and
  all 14 image assets, copied byte-for-byte from the ThreeUI package.

All registered files and binary assets were verified against their published
SHA-256 hashes before committing.

## To-do list

The to-do list app (previously deployed at
https://to-do-list-three-fawn-84.vercel.app) lives in `public/todo/` and is
served at `/todo/` alongside the Kage experience. Plain HTML/CSS/JS; tasks are
saved on each visitor's device via localStorage.
