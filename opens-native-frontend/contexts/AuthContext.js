import * as SecureStore from 'expo-secure-store';
import { createContext, useEffect, useState } from 'react';
import httpCommon from '../http-common';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false
    });

    const { t } = useTranslation();

    useEffect(() => {
        const checkAuth = async () => {
            const storedAccessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            const storedRefreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            const storedUser = await SecureStore.getItemAsync(USER_KEY);

            if (storedAccessToken && storedRefreshToken && storedUser) {
                setAuthState({
                    isAuthenticated: true
                });
            }
        }
        checkAuth();
    }, []);

    const register = async (credentials) => {
        try {
            const { data } = await httpCommon.post('/auth/signupPosetilac', credentials);
            Toast.show({
                type: 'success',
                text1: t("alertRegistrationSuccessHeader"),
                text2: t("alertRegistrationSuccess"),
                duration: 7000
            });
            return data;
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: t( "alertRegistrationFailedHeader"),
                text2: t("alertRegistrationFailed"),
                duration: 7000
            });
        }
    };

    const login = async (credentials) => {
        try {
            const { data } = await httpCommon.post('/auth/loginPosetilac', credentials);

            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refreshToken);
            await SecureStore.setItemAsync(USER_KEY, JSON.stringify(data));

            setAuthState({
                isAuthenticated: true
            });
        } catch (error) {
            console.error('--- AuthContext.js --- Line: 60 --- Login failed:', error);
        }
    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_KEY);

            setAuthState({
                isAuthenticated: false
            });
        } catch (error) {
            console.error('--- AuthContext.js --- Line: 41 --- Logout failed:', error);
        }
    }

    const logOutUser = async (credentials) => {
        try {
            await httpCommon.post('/auth/logout', { refreshToken: credentials });

            await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_KEY);

            setAuthState({
                isAuthenticated: false
            });
        } catch (error) {
            console.error('--- AuthContext.js --- Line: 56 --- Logout user failed:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ ...authState, register, login, logout, logOutUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;