import { Home, LoginBikerPage, LoginCustomerPage } from 'pages';
import { Route, Routes } from 'react-router-dom';

const AuthContainer = () => {
    return (
        <Routes>
            <Route path='/biker' element={<LoginBikerPage />}></Route>
            <Route path='/customer' element={<LoginCustomerPage />}></Route>
            <Route path='/*' element={<Home />}></Route>
        </Routes>
    );
};

export default AuthContainer