import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// Higher Order Component
// Take some component = WRAPPED COMPONENT (gets isLoading properties), returns a component
// This WRAPPED COMPONENT gets wrapped into
const WithSpinner = (WrappedComponent) => {
  // The wrapped component that gets PASSED into this component
  // isLoading is boolean, true/false is handled by some outside logic
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

  return Spinner;
};

export default WithSpinner;
