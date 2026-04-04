import { useLocation } from 'react-router-dom';

import Close from "@/Components/Close";
import ScrollToTop from '@/Components/ScrollToTop';

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' && <Close />}
      {children}
      <ScrollToTop />
    </>
  );
};

export default PageLayout;