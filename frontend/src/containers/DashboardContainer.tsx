import { Dashboard, Home, NewShipmentPage } from 'pages';
import { AllowedForRoute, ProtectedRoute } from 'protection';
import { Route, Routes } from 'react-router-dom';

const AuthContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />}> </Route>
            <Route path='/newShipment' element={<AllowedForRoute role='customer'><NewShipmentPage/></AllowedForRoute>}> </Route>
            <Route path='/*' element={<Dashboard />}></Route>
        </Routes>
    );
};

export default AuthContainer