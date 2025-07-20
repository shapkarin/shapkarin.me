import { useEffect, useState } from "react";
import useMermaid from "./MermaidHook";

export default function MermaidCDN({ chart, className = "" }) {
  const [svgContent, setSvgContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id] = useState(() => `m-${crypto.randomUUID()}`);
  const mermaidReady = useMermaid();

  /* Render once Mermaid is ready */
  useEffect(() => {
    if (!mermaidReady || !chart) return;
    
    const mermaid = window.mermaid;
    setLoading(true);
    setError(null);

    try {
      mermaid.render(id, chart)
        .then((result) => {
          // Modern mermaid returns an object with svg property
          const svg = result?.svg || result;
          setSvgContent(svg);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Mermaid render error:', err);
          setError(err.message || 'Failed to render diagram');
          setLoading(false);
        });
    } catch (err) {
      // Fallback for older mermaid versions that use callbacks
      try {
        mermaid.render(id, chart, (svg) => {
          setSvgContent(svg);
          setLoading(false);
        });
      } catch (callbackErr) {
        console.error('Mermaid render error:', callbackErr);
        setError(callbackErr.message || 'Failed to render diagram');
        setLoading(false);
      }
    }

    return () => {
      setSvgContent("");
      setError(null);
      setLoading(false);
      // Clean up mermaid internal state
      delete mermaid.mermaidAPI?._svgIds?.[id];
    };
  }, [chart, mermaidReady, id]);

  if (error) {
    return (
      <div className={`mermaid-error ${className}`} style={{ 
        padding: '1rem', 
        border: '1px solid #ff6b6b', 
        backgroundColor: '#ffe0e0', 
        color: '#d63031',
        borderRadius: '4px'
      }}>
        <strong>Diagram Error:</strong> {error}
        <details style={{ marginTop: '0.5rem' }}>
          <summary>Chart source</summary>
          <pre style={{ fontSize: '0.8em', marginTop: '0.5rem' }}>{chart}</pre>
        </details>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`mermaid-loading ${className}`} style={{
        padding: '1rem',
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic'
      }}>
        Rendering diagram...
      </div>
    );
  }

  if (!svgContent) {
    return <div className={className} />;
  }

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}