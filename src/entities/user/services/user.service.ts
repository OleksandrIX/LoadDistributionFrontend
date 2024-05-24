import axios, {AxiosInstance, AxiosResponse} from "axios";
import {User} from "entities/user/types/user.type";

const host = process.env.REACT_APP_SERVER_ADDRESS;

class UserService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/users`,
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

    async getCurrentUser() {
        const response: AxiosResponse<User> = await this.axiosInstance.get("/current");
        return response.data;
    }
}


export default UserService;
