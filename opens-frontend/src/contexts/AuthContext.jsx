import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import httpCommon from "../http-common";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  // useEffect(() => {
  //   // Check cookies on initial load to set current user if already authenticated
  //   const checkCookies = async () => {
  //     console.log("Ulazim ovde u COOKIES CHECK");
  //     try {
  //       const response = await httpCommon.get("/auth/zaposleni");
  //       console.log(
  //         "--- AuthContext.js --- Line: 20 --- Check auth success:",
  //         response.data
  //       );
  //       if (response.data) {
  //         setCurrentUser(response.data);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "--- AuthContext.js --- Line: 20 --- Check auth failed:",
  //         error
  //       );
  //     }
  //   };

  //   checkCookies();

  //   const accessToken = Cookies.get("accessToken");
  //   const refreshToken = Cookies.get("refreshToken");
  //   setAccessToken(accessToken || "");
  //   setRefreshToken(refreshToken || "");

  //   console.log("Auth context - access token: ", accessToken);
  //   console.log("Auth context - refresh token: ", refreshToken);
  // }, []);

  useEffect(() => {
    const checkCookies = async () => {
      console.log("Ulazim ovde u COOKIES CHECK");
      try {
        // Get cookies
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");
        console.log("AccessToken u Auth context: " + accessToken)
        console.log("RefreshToken u Auth context: " + refreshToken)
        if (accessToken && refreshToken) {
          const response = await httpCommon.get("/auth/zaposleni");
          console.log("--- AuthContext.js --- Check auth success:", response.data);
          if (response.data) {
            setCurrentUser(response.data);
          }
        }
      } catch (error) {
        console.error('--- AuthContext.js --- Check auth failed:', error);
      }
    };

    checkCookies();
  }, []);

  const login = async (userData) => {
    return httpCommon.post("/auth/login", userData).then((response) => {
      setCurrentUser(response.data);
    });
  };

  const logout = async () => {
    return httpCommon.post("/auth/logoutZaposleniNovi", {}).then((response) => {
      console.log("Log out - ovanje: ", response.data);
      setCurrentUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
