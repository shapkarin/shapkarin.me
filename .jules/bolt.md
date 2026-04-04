## 2025-04-04 - React Syntax Highlighter Bundle Bloat
**Learning:** `react-syntax-highlighter` synchronous `Prism` import pulls in numerous language definitions that massively bloat the bundle.
**Action:** Use `PrismAsync` to dynamically load languages only when needed, avoiding massive bundle additions.

## 2025-04-04 - Code Splitting for Route Pages
**Learning:** `src/Structure/Pages.js` imports all page components synchronously, resulting in a monolithic bundle.
**Action:** Use `React.lazy()` and `<Suspense>` to dynamically import page components and split the bundle.
