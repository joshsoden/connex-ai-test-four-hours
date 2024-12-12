import React, { lazy, Suspense } from 'react';

const LazyMetricsContainer = lazy(() => import('./MetricsContainer'));

const MetricsContainer = props => (
  <Suspense fallback={null}>
    <LazyMetricsContainer {...props} />
  </Suspense>
);

export default MetricsContainer;
