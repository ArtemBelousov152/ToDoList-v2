import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </React.StrictMode>
);
