import React from 'react';
import "assets/scss/main.scss"
import { AuthProvider } from 'providers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from 'pages';
import { AuthContainer } from 'containers';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<AuthContainer />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
