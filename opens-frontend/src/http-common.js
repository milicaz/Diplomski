import axios from "axios";
import eventBus from "./utils/eventBus";
import Cookies from "js-cookie";

const httpCommon =  axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// httpCommon.interceptors.request.use(
//     async (request) => {
//         return request;
//     },
//     (error) => Promise.reject(error)
// );

httpCommon.interceptors.request.use(
    async (request) => {
        // Get the access token from cookies
        const accessToken = Cookies.get("accessToken");
        //const accessToken = getCookie('accessToken');
        console.log("----- Auth Context ---- access token: ", accessToken);
        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }
        return request;
    },
    (error) => Promise.reject(error)
);

// httpCommon.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response && (error.response.status === 401 || error.response.status === 400)) {
//             if (error.response.status === 400) {
//                 console.log("Refresh token is missing or invalid. Logging out...");
//                 eventBus.dispatch("logout");
//                 return Promise.reject(error);
//             }

//             console.log("Access token expired. Attempting to refresh...");

//             originalRequest._retry = true;

//             try {
//                 // Make a request to refresh the token. Ensure your backend is set up to handle this.
//                 const response = await httpCommon.post('/auth/refreshtoken'); // You may not need to send the refresh token as a body if it's in cookies
//                 console.log("Access token refreshed successfully");
//                 return httpCommon(originalRequest); // Retry original request
//             } catch (refreshError) {
//                 console.log("Error with refreshing access token");
//                 if (refreshError.response && (refreshError.response.status === 401 || refreshError.response.status === 400)) {
//                     eventBus.dispatch("logout");
//                 }
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

httpCommon.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
            if (error.response.status === 400) {
                console.log("Refresh token is missing or invalid. Logging out...");
                eventBus.dispatch("logout");
                return Promise.reject(error);
            }

            console.log("Access token expired. Attempting to refresh...");

            originalRequest._retry = true;

            try {
                // Attempt to refresh the access token
                const response = await httpCommon.post('/auth/refreshtoken');
                const newAccessToken = response.data.accessToken;

                // Update the access token in cookies
                Cookies.set("accessToken", newAccessToken);

                // Retry the original request with the new access token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return httpCommon(originalRequest);
            } catch (refreshError) {
                console.log("Error with refreshing access token");
                if (refreshError.response && (refreshError.response.status === 401 || refreshError.response.status === 400)) {
                    eventBus.dispatch("logout");
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null; // If cookie not found
  };
  

export default httpCommon;