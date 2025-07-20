import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';


/* Guard against duplicate inserts across multiple pages */
const CDN_URL =
  "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
const SCRIPT_ID = "mermaid-cdn";

const MermaidScript = (
  <script
    id={SCRIPT_ID}
    src={CDN_URL}
    async
    crossOrigin="anonymous"
  />
);

const SEO = ({ title, description, name = 'Iurii Shapkarin', type = 'website', aeoScript, MermaidScript }) => {

  const { pathname } = useLocation();
  const canonicalUrl = `https://shapkarin.me${pathname}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Redirect if we're on .html version, TODO: suync with crawler */}
      {/* <meta httpEquiv="refresh" content={`0;url=${canonicalUrl}`} /> */}

      {/* OpenGraph/Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {(aeoScript !== null || aeoScript !== '') && (
        <script type="application/ld+json">
          {JSON.stringify(aeoScript)}
        </script>
      )}

      {MermaidScript && <MermaidScript />}
    </Helmet>
  );
};

export default SEO; 