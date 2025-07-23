import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, name = 'Iurii Shapkarin', type = 'website', aeoScript, keywords = '' }) => {

  const { pathname } = useLocation();
  const canonicalUrl = `https://shapkarin.me${pathname}`;
  console.log(pathname, 'pathname');
  
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name="keywords" content={keywords} />
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
    </Helmet>
  );
};

export default SEO; 