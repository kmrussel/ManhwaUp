import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});

        try {
            const response = await fetch('/logout', {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error(error)
        }

    }

    return logout;
}

export default useLogout; 