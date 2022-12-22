import { useAuth } from 'contexts/Auth.context';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserInfoI } from 'types/auth/context.types';

const AllowedForRoute = ({role}: {role: string}) => {
    const { state } = useAuth()
    const [loading, setLoading] = useState(true);
    const [allowed, isAllowed] = useState(false);
    const userInfo = state.user as UserInfoI;
    useEffect(() => {
        if (role === userInfo.role) isAllowed(true)
        setLoading(false)
    }, [])

    return (
        <>
            {!loading ? (allowed ? <Outlet /> : <Navigate to="/dashboard" />) : ('')}
        </>
    )

};

export default AllowedForRoute;