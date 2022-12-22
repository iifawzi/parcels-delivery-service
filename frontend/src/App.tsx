import React from 'react';
import "assets/scss/main.scss"
import { AuthProvider } from 'providers';

function App() {
  return (
    <AuthProvider>
    </AuthProvider>
  );
}

export default App;
