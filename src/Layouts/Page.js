import { useLocation } from 'react-router-dom';

import Close from "@/Components/Close";
import Preloader from "@/Components/Preloader";
import ScrollToTop from '@/Components/ScrollToTop';

// TODO: refact
const PageLayout = ({ children }) => {
  const location = useLocation();
  return (
    <Preloader>
      {location.pathname !== '/' && <Close />}
    {children}
    <ScrollToTop />
  </Preloader>
  );
};

export default PageLayout;