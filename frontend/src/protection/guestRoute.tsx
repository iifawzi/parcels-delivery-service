import { useAuth } from 'contexts/Auth.context';
import Cookies from 'js-cookie';
import { ChangeUserInfo, getInfoFromToken } from 'providers/auth/authReducer';
import { Navigate } from 'react-router-dom';

export const GuestRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { state, dispatch } = useAuth()
    const token = Cookies.get('authorization');
    if (!state.isAuth && token) {
        const payload = getInfoFromToken(token);
        dispatch(ChangeUserInfo(payload));
    }
    if (state.isAuth) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default GuestRoute;

