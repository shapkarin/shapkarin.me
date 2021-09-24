import { Suspense } from 'react';

import ErrorBoundary from './ErrorBoundary';

const Preloader = function({ children }) {
  return (
    <ErrorBoundary>
      <Suspense
        className="Suspense"
        fallback={<div style={{ fontSize: 17 }}>Loading....</div>}
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  )
};

export default Preloader;
