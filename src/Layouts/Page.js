import { useLocation } from 'react-router-dom';

import Close from "@/Components/Close";
import Preloader from "@/Components/Preloader";
import ScrollToTop from '@/Components/ScrollToTop';

/* 
  TODO: 
  perf: create cached object from `preloaderConfig` list, use each url as key
*/
const PageLayout = ({ children }) => {
  const location = useLocation();
  const defaultProps = {};
  const preloaderConfig = [
    { urls: ['/', 'articles', 'github'], props: { lines: 100, height: 842 } },
    { urls: ['packages'], props: { lines: 20, height: 503 } },
    { urls: ['creative'], props: { lines: 15, height: 450 } }
  ];
  
  function getPreloaderProps(pathname) {
    for (const cfg of preloaderConfig) {
      if (cfg.urls.some(prefix => prefix === '/' ? pathname === '/' : pathname.startsWith(`/${prefix}`))) {
        return cfg.props;
      }
    }
    return defaultProps;
  }
  
  const preloaderProps = { ...getPreloaderProps(location?.pathname) };
  return (
    <Preloader {...preloaderProps}>
      {location?.pathname !== '/' && <Close />}
    {children}
    <ScrollToTop />
  </Preloader>
  );
};

export default PageLayout;