// import { useCallback } from 'react';
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const SEO = ({
  title,
  description,
  name = "Iurii Shapkarin",
  type = "website",
  aeoScript,
  keywords = "",
}) => {
  const { pathname } = useLocation();
  const HOST = "https://shapkarin.me";
  const ARTICLES_LIST_CANONICAL_URL = HOST;
  const canonicalUrl = `${HOST}${pathname}`;
  const ARTICLES_URL_PATH = "/articles";
  // // eslint-disable-next-line
  // const isMetaRedirect = useCallback(
  //   () =>
  //     pathname !== ARTICLES_URL_PATH &&
  //     pathname.startsWith(ARTICLES_URL_PATH) &&
  //     // process.env.NODE_ENV === "production",
  //   [pathname]
  // );

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {pathname === ARTICLES_URL_PATH ? (
        <link rel="canonical" href={ARTICLES_LIST_CANONICAL_URL} />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}

      {/* Redirect if we're on .html version, TODO: suync with crawler */}
      {/* <meta httpEquiv="refresh" content={`0;url=${canonicalUrl}`} /> */}

      {/* {isMetaRedirect() && (
        <meta httpEquiv="refresh" content={`0;url=${canonicalUrl}`} />
      )} */}

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

      {(aeoScript !== null || aeoScript !== "") && (
        <script type="application/ld+json">{JSON.stringify(aeoScript)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
