import React from 'react';

import Spinner from '../spinner/spinner.component';

// Higher Order Component
// Take some component = WRAPPED COMPONENT (gets isLoading properties), returns a component
// This WRAPPED COMPONENT gets wrapped into
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
