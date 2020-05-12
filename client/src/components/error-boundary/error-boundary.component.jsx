import React from 'react';

import {
  ErrorImageContainer,
  ErrorImageOverlay,
  ErrorImageText,
} from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasError: false,
    };
  }

  // Get the error that is thrown in any of the children of this error boundary component
  // Take this error boundary component and WRAP it around a bunch of components...
  // if any of those wrapped components inside get an error, the getDerivedState catches error
  // https://reactjs.org/docs/error-boundaries.html
  static getDerivedStateFromError(error) {
    // Process the error
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  // https://www.kapwing.com/404-illustrations?ref=producthunt
  render() {
    if (this.state.hasError) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
          <ErrorImageText>Sorry this page is broken</ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
