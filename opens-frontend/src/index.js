import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';
import './index.css';
import { ToastContextProvider } from './contexts/ToastContext';

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

