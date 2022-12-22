import { useAuth } from 'contexts/Auth.context';
import Cookies from 'js-cookie';
import { ChangeUserInfo, getInfoFromToken } from 'providers/auth/authReducer';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const GuestRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { state, dispatch } = useAuth()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('authorization');
        if (!state.isAuth && token) {
            const payload = getInfoFromToken(token);
            dispatch(ChangeUserInfo(payload));
        }
        setLoading(false);
    }, [loading]);

    return (
        !loading ? state.isAuth ? <Navigate to="/dashboard" /> : children : <></>
    )
};

export default GuestRoute;

