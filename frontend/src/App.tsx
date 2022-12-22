import "assets/scss/main.scss"
import { AuthProvider, MuiThemeProvider } from 'providers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from 'pages';
import { AuthContainer } from 'containers';

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/*" element={<AuthContainer />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </AuthProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
