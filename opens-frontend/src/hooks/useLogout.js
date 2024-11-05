import { httpPublic } from "../apis/http";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            await httpPublic.post('/logoutZaposleni', {}, {
                withCredentials: true,
            });
        } catch (error) {
            console.error(error);
        }
    }
    return logout;
}

export default useLogout;
