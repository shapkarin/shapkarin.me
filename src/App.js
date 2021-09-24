import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'Components/Background';

import About from 'Components/About';
import Menu from 'Components/Menu';
import Structure from 'Components/Structure';

import './App.less';

const history = createBrowserHistory();
const queryClient = new QueryClient({
  defaultOptions: {
     queries: {
       suspense: true,
       staleTime: 60 * 1000 * 15, // 15 minutes chached data lifetime
     },
   },
});

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <About />
      <div className="Wrap">
        <BrowserRouter history={history}>
          <Menu />
          <Structure />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}
