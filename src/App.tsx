import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import { UserProvider } from './global/UserContext';
import { ToastProvider } from './global/ToastContext';

import Routes from './routes';

import ToastsContainer from './components/toastContainer';

const App: React.FC = () => (
  <BrowserRouter>
    <ToastProvider>
      <UserProvider>
        <Routes />
        <ToastsContainer />
      </UserProvider>
    </ToastProvider>
  </BrowserRouter>
);

export default App;
