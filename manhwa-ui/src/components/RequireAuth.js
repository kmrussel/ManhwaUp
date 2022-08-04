import { useLocation, Navigate , Outlet } from 'react';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
    const { auth } = useAuth(); 
    const location = useLocation();

    return(
        // indicates whether user is logged in or not
        auth?.user
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth; 