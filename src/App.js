import { BrowserRouter } from 'react-router-dom';
import {
  QueryClientProvider,
  dehydrate,
  HydrationBoundary,
  defaultShouldDehydrateQuery
} from '@tanstack/react-query';

import Background from '@/Components/Background';
import About from '@/Components/About';
import Menu from '@/Components/Menu';
import Structure from './Structure';

import Footer from '@/Components/Footer';
import { queryClient } from '@/DAL';

import './App.less';

const AEO_SCRIPT_QUERY_KEY = 'AeoScript';
const isAeoScriptQuery = ({ queryKey }) => queryKey?.[0] === AEO_SCRIPT_QUERY_KEY;

const shouldDehydrateQuery = (query) => (
  defaultShouldDehydrateQuery(query) && !isAeoScriptQuery(query)
);

window.snapSaveState = () => dehydrate(queryClient, { shouldDehydrateQuery });

const preloadedState = window.queries ? {
  mutations: window.mutations || [],
  queries: (window.queries || []).filter((query) => !isAeoScriptQuery(query))
} : undefined;

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
