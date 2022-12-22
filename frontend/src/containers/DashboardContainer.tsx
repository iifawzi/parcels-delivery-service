import { Dashboard, Home } from 'pages';
import { ProtectedRoute } from 'protection';
import { Route, Routes } from 'react-router-dom';

const AuthContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<ProtectedRoute />}>
                <Route path='/' element={<Dashboard />} />
            </Route>
            <Route path='/*' element={<ProtectedRoute />}>
                <Route path='/*' element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default AuthContainer