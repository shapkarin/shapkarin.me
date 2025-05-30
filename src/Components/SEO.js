import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, name = 'Iurii Shapkarin', type = 'website' }) => {
  // TODO: fix canonical url redirect
  // const isRedirect = window.location.pathname.endsWith('.html') || 
  //                   !window.location.pathname.includes('/gallery/');
  
  // // Check if the request is from react-snap (Puppeteer)
  // const isPuppeteer = navigator.userAgent.includes('HeadlessChrome') || 
  //                     navigator.userAgent.includes('Puppeteer');

  const location = useLocation();
  const articleName = location.pathname;
  const canonicalUrl = `https://shapkarin.me${articleName}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Redirect if we're on .html version and NOT from Puppeteer */}
      {/* {isRedirect && !isPuppeteer && (
        <meta httpEquiv="refresh" content={`0;url=${canonicalUrl}`} />
      )} */}

      {/* OpenGraph/Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO; 