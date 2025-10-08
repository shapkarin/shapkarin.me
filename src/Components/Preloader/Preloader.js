import { Suspense } from 'react';
import ContentLoader from 'react-content-loader';
import clsx from 'clsx';

import ErrorBoundary from '@/Components/ErrorBoundary';

const SkeletonLoader = ({ height, width, lines, className }) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className={clsx('SkeletonLoader', className)}
  >
    {Array.from({ length: lines }).map((_, index) => (
      <rect key={index} x="0" y={index * 30} rx="4" ry="4" width="100%" height="20" />
    ))} 
  </ContentLoader>
);

const Preloader = function({ children, height = 200, width = '100%', lines = 7, className }) {
  return (
    <ErrorBoundary>
      <Suspense
        className="Suspense"
        fallback={<SkeletonLoader height={height} width={width} lines={lines} className={className} />}
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  )
};

export default Preloader;
