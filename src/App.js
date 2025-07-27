import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/Components/Background';
import About from '@/Components/About';
import Menu from '@/Components/Menu';
import Structure from './Structure';

import './App.less';
import Footer from '@/Components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
     queries: {
       suspense: true,
       staleTime: 60 * 1000 * 17, // 15 minutes chached data lifetime]
       retry: true,
     },
   },
});

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
        <a href="#menu" className="a11y hidden">Go to Menu</a>
        <BrowserRouter>
        <About />
        <Menu id="menu"/>
        <div className="Wrap">
          <Structure />
        </div>
        <Footer />
        </BrowserRouter>
    </QueryClientProvider>
  );
}
