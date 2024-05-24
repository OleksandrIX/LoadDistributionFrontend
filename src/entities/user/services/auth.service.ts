import axios, {AxiosInstance} from "axios";
import {UserLogin, UserRegistration} from "entities/user/types/user.type";

const host = process.env.REACT_APP_SERVER_ADDRESS;


class AuthService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/auth/`,
            withCredentials: true,
            headers: {
                ...defaultHeaders,
                "Content-Type": "application/json"
            }
        });
    }

    setAuthorizationToken(token: string) {
        this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    async registration(user: UserRegistration) {
        return this.axiosInstance.post("registration", user);
    }

    async login(user: UserLogin) {
        return this.axiosInstance.post("login", user);
    }

    async refreshToken() {
        return this.axiosInstance.post("refresh");
    }

    async logout() {
        return this.axiosInstance.delete("logout");
    }
}

export default AuthService;
