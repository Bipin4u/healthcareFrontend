// src/App.tsx

import React from 'react';
import { CssBaseline } from '@mui/material';
import Main from './Main';
import Header from './Header';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Main />
    </>
  );
};

export default App;
