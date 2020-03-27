// Functional component don't have any state
import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, ...otherProps }) => (
  // type will come with otherProps
  <button className="custom-button" {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
