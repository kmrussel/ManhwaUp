import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

// Citation for the following function
// Date: 08.07.22
// Altered from:
// https://github.com/gitdagray/react_persist_login/blob/main/src/components/PersistLogin.js
// Author: Dave Gray

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    }, []);

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />
            }

        </>
    )
}

export default PersistLogin