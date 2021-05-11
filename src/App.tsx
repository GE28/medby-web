import React from 'react';

import './App.css';

import { UserProvider } from './global/UserContext';
import { ToastProvider } from './global/ToastContext';

import RegisterPage from './pages/register';

import ToastContainer from './components/toastContainer';

const App: React.FC = () => (
  <ToastProvider>
    <UserProvider>
      <RegisterPage />
      <ToastContainer />
    </UserProvider>
  </ToastProvider>
);

export default App;
