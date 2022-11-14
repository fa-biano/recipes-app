import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Provider from './contextApi/Provider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
