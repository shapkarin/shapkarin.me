import { BrowserRouter } from 'react-router-dom';
import {
  QueryClientProvider,
  dehydrate,
  HydrationBoundary
} from '@tanstack/react-query';

import Background from '@/Components/Background';
import About from '@/Components/About';
import Menu from '@/Components/Menu';
import Structure from './Structure';

import './App.less';
import Footer from '@/Components/Footer';
import { queryClient } from '@/DAL';

window.snapSaveState = () => dehydrate(queryClient);
const preloadedState = window.__INITIAL_STATE__;

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={preloadedState}>
        <Background />
        <a href="#menu" className="a11y hidden">Go to Menu</a>
        <BrowserRouter>
        <About />
        <Menu id="menu"/>
        <div className="Wrap">
          <Structure />
        </div>
        <Footer />
        </BrowserRouter>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
