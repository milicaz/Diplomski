import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { httpProtected } from '../apis/http';
import useRefreshToken from './useRefreshToken';

const ACCESS_TOKEN_KEY = 'accessToken';

const useHttpProtected = () => {
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = httpProtected.interceptors.request.use(
            async (config) => {
                const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
                // console.log('--- useHttpProtected.js --- accessToken:', accessToken);
                if (accessToken) {
                    // console.log('--- useHttpProtected.js --- Postoji accessToken. Saljem protected request sa access tokenom u header-u.');
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseInterceptor = httpProtected.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 401 || error?.response?.status === 400) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return httpProtected(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            httpProtected.interceptors.request.eject(requestInterceptor);
            httpProtected.interceptors.response.eject(responseInterceptor);
        }

    }, [refresh]);

    return httpProtected;

}

export default useHttpProtected;