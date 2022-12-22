import { LoginBikerPage } from 'pages';
import { Route, Routes } from 'react-router-dom';

const AuthContainer = () => {
    return (
        <Routes>
            <Route path='biker' element={<LoginBikerPage />} />
        </Routes>
    );
};

export default AuthContainer