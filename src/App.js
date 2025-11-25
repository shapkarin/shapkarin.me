import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import '@/Components/Background';
import About from '@/Components/About';
import Menu from '@/Components/Menu';
import Structure from './Structure';

import './App.less';
import Footer from '@/Components/Footer';
import { queryClient } from '@/DAL';

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
