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
        console.log(auth.email)
        setAuth(prev => {
            return { ...prev, accessToken: accessToken}
        });
        return accessToken
    }
    return refresh;
}

export default useRefreshToken; 