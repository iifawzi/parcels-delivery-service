import { Dashboard, Home, NewShipmentPage } from 'pages';
import { AllowedForRoute, ProtectedRoute } from 'protection';
import { Route, Routes } from 'react-router-dom';

const AuthContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />}> </Route>
            <Route path='/newShipment' element={<ProtectedRoute><AllowedForRoute role='customer'><NewShipmentPage /></AllowedForRoute></ProtectedRoute>}> </Route>
            <Route path='/*' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}> </Route>
        </Routes>
    );
};

export default AuthContainer