import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router-dom';
import App from './App';
import Provider from './contextApi/Provider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Provider>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>,
  );
