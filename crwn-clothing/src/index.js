import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

ReactDOM.render(
  // Provider is a component class that we get from react-redux,
  // The parent component has access to all the things related to the store
  <Provider store={store}>
    <BrowserRouter>
      {/* Allow the app to have access to the persistor flow itself */}
      {/* PersistGate will RECEIVE the store, fire off action to REHYDRATE the state */}
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
