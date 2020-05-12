import React from 'react';

import './homepage.styles.scss';
import Directory from '../../components/directory/directory.component';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => {
  // Manually throw error to show Error Boundary
  // throw Error;

  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;
