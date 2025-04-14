import * as SecureStore from 'expo-secure-store';
import { httpPublic } from "../apis/http";
import useAuth from "./useAuth";

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

const useLogout = () => {
    const { setAuthState } = useAuth();

    const logout = async () => {
        try {
            const token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            // console.log("refresh token: ", token);
            if (token) {
                await httpPublic.post('/logout', { refreshToken: token });
                await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
                await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
                await SecureStore.deleteItemAsync(USER_KEY);
            }
            setAuthState({
                isAuthenticated: false
            });
        } catch (error) {
            console.error('--- AuthContext.js --- Line: 56 --- Logout user failed:', error);
        }
    }

    return logout;
}

export default useLogout;