import { Suspense } from 'react';
import ContentLoader from 'react-content-loader';

import ErrorBoundary from '@/Components/ErrorBoundary';

const SkeletonLoader = ({ height, width, lines }) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {Array.from({ length: lines }).map((_, index) => (
      <rect key={index} x="0" y={index * 30} rx="4" ry="4" width="100%" height="20" />
    ))} 
  </ContentLoader>
);

const Preloader = function({ children, height = 200, width = '100%', lines = 7 }) {
  return (
    <ErrorBoundary>
      <Suspense
        className="Suspense"
        fallback={<SkeletonLoader height={height} width={width} lines={lines} />}
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  )
};

export default Preloader;
