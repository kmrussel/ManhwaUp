import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';
import { axiosPrivate } from '../api/axios';

// Citation for the following function
// Date: 08.07.22
// Altered from:
// https://github.com/gitdagray/react_persist_login/blob/main/src/hooks/useAxiosPrivate.js
// Author: Dave Gray

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }

                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorizaiton'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        // clear intercepts
        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;