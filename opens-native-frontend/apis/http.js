import axios from "axios";

const httpPublic = axios.create({
    baseURL: "http://10.0.2.2:8080/api/auth",
    headers: {
        "Content-Type": "application/json"
    }
});

const httpProtected = axios.create({
    baseURL: "http://10.0.2.2:8080/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export { httpPublic, httpProtected };