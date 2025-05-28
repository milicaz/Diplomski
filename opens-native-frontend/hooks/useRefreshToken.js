import * as SecureStore from 'expo-secure-store';
import { httpPublic } from '../apis/http';
import eventEmitter from "../utils/EventEmitter";

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const useRefreshToken = () => {
    const refresh = async () => {
        try {
            const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            if (!refreshToken) {
                eventEmitter.emit('SESSION_EXPIRED'); // Emitovanje događaja za istečenu sesiju
                return Promise.reject('Refresh token is missing');
            }

            const response = await httpPublic.post('/refreshtoken', { refreshToken });
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;
            console.log("---------------------------------------------------------------------");
            console.log("--- useRefreshToken.js --- Line: 21 --- NOVI ACCESS token: ", newAccessToken);
            console.log("--- useRefreshToken.js --- Line: 22 --- NOVI REFRESH token: ", newRefreshToken);
            console.log("---------------------------------------------------------------------");
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken);
            return newAccessToken;
        } catch (error) {
            if(error.response?.status === 401) {
                await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
                await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
                eventEmitter.emit('SESSION_EXPIRED'); // Emitovanje događaja za istečenu sesiju
            }
            // eventEmitter.emit('LOGOUT');
            return Promise.reject(error);
        }
    };
    return refresh;
}

export default useRefreshToken;