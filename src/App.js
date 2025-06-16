import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'Components/Background';

import About from 'Components/About';
import Structure from './Structure';

import './App.less';

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
      <div className="Wrap">
        <Structure />
      </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
