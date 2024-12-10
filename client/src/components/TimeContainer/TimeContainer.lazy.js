import React, { lazy, Suspense } from 'react';

const LazyTimeContainer = lazy(() => import('./TimeContainer'));

const TimeContainer = props => (
  <Suspense fallback={null}>
    <LazyTimeContainer {...props} />
  </Suspense>
);

export default TimeContainer;
