import React, { PureComponent, Suspense } from 'react';
import PropTypes from 'prop-types';

const Preloader = function({ children }) {
  return (
    <Suspense
      className="Suspense"
      fallback={<div style={{ fontSize: 17 }}>Loading....</div>}
    >
      {children}
    </Suspense>
  )
};

export default Preloader;
