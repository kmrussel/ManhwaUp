import useAuth from './useAuth';

// Citation for the following function
// Date: 08.07.22
// Altered from:
// https://github.com/gitdagray/react_persist_login/blob/main/src/hooks/useRefreshToken.js
// Author: Dave Gray

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    // updates access token using refresh token
    const refresh = async () => {
        const response = await fetch('/refresh', {
            method: 'GET',
            credentials: 'same-origin'
        });
        const data = await response.json();
        const accessToken = data.accessToken;
        const email = data.email;
        setAuth(prev => {
            return { ...prev, email: email, accessToken: accessToken }
        });
        return accessToken;
    }
    return refresh;
}

export default useRefreshToken; 