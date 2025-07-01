import Close from "@/Components/Close";
import Preloader from "@/Components/Preloader";
import ScrollToTop from '@/Components/ScrollToTop';

// TODO: refact
const PageLayout = ({ children }) => (
  <Preloader>
    <Close />
    {children}
    <ScrollToTop />
  </Preloader>
);

export default PageLayout;