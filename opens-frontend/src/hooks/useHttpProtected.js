import { useEffect } from "react";
import { httpProtected } from "../apis/http";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useHttpProtected = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = httpProtected.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseInterceptor = httpProtected.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
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

    }, [auth, refresh]);

    return httpProtected;
}

export default useHttpProtected;