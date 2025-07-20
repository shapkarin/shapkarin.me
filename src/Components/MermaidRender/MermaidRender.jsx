import React, { useEffect, useRef, useState, Suspense, lazy } from "react";

// Core component that handles mermaid rendering
function MermaidRenderCore({ chart, config = {}, className = "" }) {
  const container = useRef(null);
  const [id] = useState(() => `merm-${crypto.randomUUID()}`);

  useEffect(() => {
    let cancelled = false;
    let mermaid;

    /* Import at runtime → SSR safe, smaller first-load */
    import("mermaid").then((m) => {
      if (cancelled) return;
      mermaid = m.default;

      /* one-time global init */
      if (!mermaid._react_initialized) {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "base",
          ...config,
        });
        mermaid._react_initialized = true;
      }

      mermaid
        .render(id, chart)
        .then(({ svg }) => {
          if (container.current) container.current.innerHTML = svg;
        })
        .catch(console.error);
    });

    /* cleanup */
    return () => {
      cancelled = true;
      if (container.current) container.current.innerHTML = "";
      import("mermaid").then((m) => {
        delete m.mermaidAPI?._svgIds?.[id];
      });
    };
  }, [chart, config, id]);

  return (
    <div ref={container} className={`mermaid-box ${className}`} />
  );
}

// Lazy-load the core component
const LazyMermaidRender = lazy(() => 
  Promise.resolve({ default: MermaidRenderCore })
);

// Export component wrapped in Suspense
export default function MermaidRender(props) {
  return (
    <Suspense fallback={<div className="pulse">Loading diagram…</div>}>
      <LazyMermaidRender {...props} />
    </Suspense>
  );
}