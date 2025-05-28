import * as SecureStore from "expo-secure-store";
import useAuth from "./useAuth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

const useSessionExpired = () => {
  const { setAuthState } = useAuth();

  const handleSessionExpired = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
    setAuthState({
      isAuthenticated: false,
    });
  };

  return handleSessionExpired;
};

export default useSessionExpired;
