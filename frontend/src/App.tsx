import "assets/scss/main.scss"
import { AuthProvider, MuiThemeProvider } from 'providers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from 'pages';
import { AuthContainer, DashboardContainer } from 'containers';
import { GuestRoute, ProtectedRoute } from "protection";

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<GuestRoute><Home /></GuestRoute>} />
            <Route path="/auth/*" element={<GuestRoute><AuthContainer /></GuestRoute>} />
            <Route path="/dashboard/*" element={<DashboardContainer />} />
            <Route path="/*" element={<GuestRoute><Home /></GuestRoute>} />
          </Routes>
        </AuthProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
