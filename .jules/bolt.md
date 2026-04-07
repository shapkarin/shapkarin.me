## 2024-06-25 - Avoid Dynamic Device Detection During Renders
**Learning:** Calling functions like `isMobile()` from the `is-mobile` library during render cycles or inside components negatively impacts React performance because it parses the user agent string with regular expressions on every render.
**Action:** Always import and use the statically evaluated constant `isMobile` from `src/constants.js` (e.g., `import { isMobile } from "@/constants"`) instead of dynamically calling `is-mobile` to prevent unnecessary repeated parsing.
