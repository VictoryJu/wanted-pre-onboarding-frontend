import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from 'src/pages/auth/Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='signup' />
        <Route path='signin' Component={Login} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;