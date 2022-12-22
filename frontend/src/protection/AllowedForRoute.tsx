import { useAuth } from 'contexts/Auth.context';
import { Navigate } from 'react-router-dom';
import { UserInfoI } from 'types/auth/context.types';

export const GuestRoute: React.FC<{ children: JSX.Element, role: string }> = ({ children, role }) => {
    const { state } = useAuth()
    const userInfo = state.user as UserInfoI;
    return userInfo.role === role ? children : <Navigate to="/dashboard" />
};

export default GuestRoute;

