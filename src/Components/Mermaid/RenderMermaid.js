import { useEffect, useRef, useState } from "react";
import useMermaid from "../hooks/useMermaid";

export default function MermaidCDN({ chart, className = "" }) {
  const box = useRef(null);
  const [id] = useState(() => `m-${crypto.randomUUID()}`);
  const mermaidReady = useMermaid();

  /* Render once Mermaid is ready */
  useEffect(() => {
    if (!mermaidReady) return;
    const mermaid = window.mermaid;

    mermaid.render(id, chart, (svg) => {
      if (box.current) box.current.innerHTML = svg;
    });

    return () => {
      if (box.current) box.current.innerHTML = "";
      delete mermaid.mermaidAPI?._svgIds?.[id];
    };
  }, [chart, mermaidReady, id]);

  return <div ref={box} className={className} />;
}