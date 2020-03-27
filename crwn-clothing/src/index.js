import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    {/* BrowserRoute wrap around our App component, gives our App all routing functionality */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
