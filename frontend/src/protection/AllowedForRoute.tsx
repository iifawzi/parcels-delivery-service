import { useAuth } from 'contexts/Auth.context';
import Cookies from 'js-cookie';
import { ChangeUserInfo, getInfoFromToken } from 'providers/auth/authReducer';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserInfoI } from 'types/auth/context.types';

export const AllowedForRoute: React.FC<{ children: JSX.Element, role: string }> = ({ children, role }) => {
    const { state, dispatch } = useAuth()
    const userInfo = state.user as UserInfoI;
    useEffect(() => {
        const token = Cookies.get('authorization');
        if (!state.isAuth && token) {
            const payload = getInfoFromToken(token);
            dispatch(ChangeUserInfo(payload));
        }
    }, [])
    if (userInfo.role !== role) {
        console.log(userInfo.role);
        setTimeout(() => {
            return <Navigate to="/dashboard" />;
        }, 5000);
    }

    return children;
};

export default AllowedForRoute;

