import { Home, LoginBikerPage, LoginCustomerPage } from 'pages';
import { Route, Routes } from 'react-router-dom';

const AuthContainer = () => {
    return (
        <Routes>
            <Route path='biker' element={<LoginBikerPage />} />
            <Route path='customer' element={<LoginCustomerPage />} />
            <Route path='*' element={<Home />} />
        </Routes>
    );
};

export default AuthContainer