import * as SecureStore from 'expo-secure-store';
import { httpPublic } from '../apis/http';
import eventEmitter from "../utils/EventEmitter";

const REFRESH_TOKEN_KEY = 'refreshToken';

const useRefreshToken = () => {
    const refresh = async () => {
        try {
            const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            if (!refreshToken) {
                eventEmitter.emit('LOGOUT');
                return Promise.reject('Refresh token is missing');
            }

            const response = await httpPublic.post('/refreshtoken', { refreshToken });
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;
            // console.log("--- useRefreshToken.js --- Line: 54 --- New access token: ", newAccessToken);
            // console.log("--- useRefreshToken.js --- Line: 55 --- New refresh token: ", newRefreshToken);
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken);
            // console.log("--- useRefreshToken.js --- Line: 58 --- Access token refreshed successfully");
            return newAccessToken;
        } catch (error) {
            eventEmitter.emit('LOGOUT');
            return Promise.reject(error);
        }
    };
    return refresh;
}

export default useRefreshToken;