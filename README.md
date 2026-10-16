# void-islands-css-missing-repro

Minimal reproduction: in a production build, CSS imported by a component (not directly by a page/layout file) is dropped from island pages and Markdown pages. It works in dev.

- `void@1.1.11`, `@void/react@1.1.11`, `@void/md@1.1.11`, `vite@8.3.4`
- Node.js 24, pnpm 12

## Structure

- `src/global.css` sets `body { background: rgb(255, 0, 0) }`
- `src/Shell.tsx` imports `./global.css`
- `pages/layout.tsx` renders `<Shell>` (it does **not** import the CSS itself)
- `pages/index.island.tsx` — island page without islands
- `pages/about.md` — Markdown page

## Steps

```sh
pnpm install
pnpm dev                    # red background on / and /about
pnpm build && pnpm preview  # no stylesheet on / and /about
```

## Expected

Both pages include the stylesheet in production, as they do in dev.

## Actual

- `pnpm dev`: the CSS is injected (`<style data-vite-dev-id=".../src/global.css">`).
- `pnpm build`: there is no client build output at all (`dist/client` is missing); the CSS only ends up in `dist/ssr/assets/`. The pages are served without any `<link rel="stylesheet">`.

## Workaround

Import the CSS directly in `pages/layout.tsx`:

```tsx
import "../src/global.css";
```

With that, `virtual:void-islands-client` is built and both pages get `<link rel="stylesheet" href="/assets/islands-client-*.css">` (and still no `<script>`).
