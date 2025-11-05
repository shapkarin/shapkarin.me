import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Close from "@/Components/Close";
import Preloader from "@/Components/Preloader";
import ScrollToTop from '@/Components/ScrollToTop';

const commonProps = { lines: 100, height: 842 };

const preloaderConfig = {
  '/': { ...commonProps },
  '/articles/': { ...commonProps },
  '/github/repositories/': { ...commonProps },
  '/github/likes/': { ...commonProps },
  '/packages/': { lines: 20, height: 503 },
  '/creative/': { lines: 15, height: 450 }
};

const defaultProps = {};

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  
  const preloaderProps = useMemo(() => {
    return preloaderConfig[pathname] || defaultProps;
  }, [pathname]);

  return (
    <Preloader {...preloaderProps}>
      {pathname !== '/' && <Close />}
      {children}
      <ScrollToTop />
  </Preloader>
  );
};

export default PageLayout;