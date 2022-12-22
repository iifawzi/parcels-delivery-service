import { Dashboard, Home } from 'pages';
import { AllowedForRoute, ProtectedRoute } from 'protection';
import { Route, Routes } from 'react-router-dom';

const AuthContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<ProtectedRoute />}>
                <Route path='/' element={<Dashboard />} />
            </Route>

            <Route path='/newShipment' element={<ProtectedRoute />}>
                <Route path='/newShipment' element={<AllowedForRoute role='customer' />}>
                    <Route element={<Dashboard />} />
                </Route>
            </Route>

            <Route path='/*' element={<ProtectedRoute />}>
                <Route path='/*' element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default AuthContainer