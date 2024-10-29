import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import eventEmitter from "./utils/EventEmitter";

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const httpCommon = axios.create({
    baseURL: "http://10.0.2.2:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

httpCommon.interceptors.request.use(
    async (config) => {
        const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
        console.log('--- httpCommon.js --- Line: 17 --- accessToken:', accessToken);
        if (accessToken) {
            console.log('--- httpCommon.js --- Line: 19 --- Postoji accessToken. Saljem protected request sa access tokenom u header-u.');
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

httpCommon.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
            if (error.response.status === 400) {
                console.log("--- httpCommon.js --- Line: 34 --- Refresh token is missing or invalid. Logging out...");
                eventEmitter.emit('LOGOUT');
                return Promise.reject(error);
            }

            console.log("--- httpCommon.js --- Line: 40 --- Access token expired. Attempting to refresh...");
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
                    if (!refreshToken) {
                        console.log("--- httpCommon.js --- Line: 46 --- Refresh token is missing. Logging out...");
                        eventEmitter.emit('LOGOUT');
                        return Promise.reject(error);
                    }

                    const response = await httpCommon.post('/auth/refreshtoken', { refreshToken });
                    const newAccessToken = response.data.accessToken;
                    const newRefreshToken = response.data.refreshToken;
                    console.log("--- httpCommon.js --- Line: 54 --- New access token: ", newAccessToken);
                    console.log("--- httpCommon.js --- Line: 55 --- New refresh token: ", newRefreshToken);
                    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);
                    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken);
                    console.log("--- httpCommon.js --- Line: 58 --- Access token refreshed successfully");
                    return httpCommon(originalRequest);
                } catch (refreshError) {
                    console.log("--- httpCommon.js --- Line: 61 --- Error with refreshing access token");
                    if (refreshError.response && (refreshError.response.status === 401 || refreshError.response.status === 400)) {
                        eventEmitter.emit('LOGOUT');
                    }
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default httpCommon;