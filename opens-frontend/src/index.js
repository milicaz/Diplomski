import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';
import { ToastContextProvider } from './contexts/ToastContext';
import './index.css';

// if (process.env.NODE_ENV === 'production') {
disableReactDevTools();
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

