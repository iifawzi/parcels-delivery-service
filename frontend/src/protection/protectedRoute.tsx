import { useAuth } from 'contexts/Auth.context';
import Cookies from 'js-cookie';
import { ChangeUserInfo, getInfoFromToken } from 'providers/auth/authReducer';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { state, dispatch } = useAuth()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('authorization');
        if (!state.isAuth && token) {
            const payload = getInfoFromToken(token);
            dispatch(ChangeUserInfo(payload));
        }
        setLoading(false)
    }, [])

    return (
        <>
            {!loading ? (state.isAuth ? <Outlet /> : <Navigate to="/auth/biker" />) : ('')}
        </>
    )

};

export default ProtectedRoute;