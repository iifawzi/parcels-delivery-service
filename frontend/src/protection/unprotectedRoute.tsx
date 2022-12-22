import { Outlet } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { getInfoFromToken } from 'providers/auth/authReducer';
import { ChangeUserInfo } from "providers/auth/authReducer";
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from 'contexts/Auth.context';

const UNProtectedRoute = () => {
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
            {!loading ? (state.isAuth ? <Navigate to="/dashboard" /> : <Outlet />) : ('')}
        </>
    )

};

export default UNProtectedRoute;