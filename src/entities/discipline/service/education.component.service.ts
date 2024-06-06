import axios, {AxiosInstance, AxiosResponse} from "axios";
import {ResponseEducationComponent} from "entities/discipline";

const host = process.env.REACT_APP_SERVER_ADDRESS;

class EducationComponentService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/education-components`,
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

    async getAllEducationComponents(): Promise<ResponseEducationComponent[]> {
        const response: AxiosResponse<ResponseEducationComponent[]> = await this.axiosInstance.get("");
        return response.data;
    }

    async getEducationComponentById(id: string): Promise<ResponseEducationComponent> {
        const response: AxiosResponse<ResponseEducationComponent> = await this.axiosInstance.get(`/${id}`);
        return response.data;
    }
}

export default EducationComponentService;
