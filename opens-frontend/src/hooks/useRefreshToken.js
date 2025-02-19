import { jwtDecode } from "jwt-decode";
import { httpProtected } from "../apis/http";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await httpProtected.post('/auth/refreshtokenZaposleni');
            const decoded = response.data?.accessToken
                ? jwtDecode(response.data.accessToken)
                : undefined;

            const roles = decoded?.roles || [];
            const email = decoded?.sub || "";

            setAuth(prev => {
                return {
                    ...prev,
                    email: email,
                    roles: roles,
                    accessToken: response.data.accessToken
                }
            });
            return response.data.accessToken;
        } catch (error) {
            setAuth({
                email: "",
                roles: [],
                accessToken: ""
            });
        }
    }
    return refresh;
}

export default useRefreshToken;
