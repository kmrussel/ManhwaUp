import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();

    const refresh = async () => {
        const response = await fetch('/refresh', {
            method: 'GET',
            credentials: 'same-origin'
        });
        const data = await response.json()
        const accessToken = data.accessToken;
        const email = data.email;
        setAuth(prev => {
            return { ...prev, email: email, accessToken: accessToken}
        });
        return accessToken
    }
    return refresh;
}

export default useRefreshToken; 