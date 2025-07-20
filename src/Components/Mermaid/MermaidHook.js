import { useEffect, useState } from "react";

export default function useMermaid(config = {}) {
  const [mermaidReady, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function init() {
      if (cancelled) return;
      const m = window.mermaid;
      if (m && !m._initialized) {
        m.initialize({ startOnLoad: false, securityLevel: "loose", theme: "base", ...config });
        m._initialized = true;
      }
      if (m) setReady(true);
    }

    /* Already present? -> init immediately */
    if (window.mermaid) {
      init();
      return;
    }

    /* Otherwise wait until the CDN script fires its load event */
    const el = document.getElementById("mermaid-cdn");
    if (el) {
      el.addEventListener("load", init);
      el.addEventListener("error", () => !cancelled && console.error("Mermaid failed to load"));
    }

    return () => {
      cancelled = true;
      el && el.removeEventListener("load", init);
    };
  }, [config]);

  return mermaidReady;
}