import { httpPublic } from "../apis/http";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        try {
            await httpPublic.post('/logoutZaposleni', {}, {
                withCredentials: true,
            });
            setAuth({});
        } catch (error) {
            console.error(error);
        }
    }
    return logout;
}

export default useLogout;
