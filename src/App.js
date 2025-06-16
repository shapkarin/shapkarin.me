import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'Components/Background';

import About from 'Components/About';
import Menu from 'Components/Menu';
import Structure from './Structure';

import './App.less';
import Footer from 'Components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
     queries: {
       suspense: true,
       staleTime: 60 * 1000 * 17, // 15 minutes chached data lifetime
     },
   },
});

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <About />
      <Menu />
      <div className="Wrap">
        <Structure />
      </div>
      <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
