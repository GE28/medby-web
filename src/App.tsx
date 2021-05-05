import React from 'react';
import './App.css';

import { UserProvider } from './global/UserContext';

import LoginPage from './pages/login';

const App: React.FC = () => (
  <UserProvider>
    <LoginPage />
  </UserProvider>
);

export default App;
