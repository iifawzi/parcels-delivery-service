import { Home, LoginBikerPage, LoginCustomerPage } from 'pages';
import { UNProtectedRoute } from 'protection';
import { Route, Routes } from 'react-router-dom';

const AuthContainer = () => {
    return (
        <Routes>
            <Route path='/biker' element={<UNProtectedRoute />}>
                <Route path='/biker' element={<LoginBikerPage />} />
            </Route>
            <Route path='/customer' element={<UNProtectedRoute />}>
                <Route path='/customer' element={<LoginCustomerPage />} />
            </Route>
            <Route path='*' element={<Home />} />
        </Routes>
    );
};

export default AuthContainer