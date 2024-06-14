import axios, {AxiosInstance, AxiosResponse} from "axios";
import {ResponseDiscipline} from "../types/discipline.type";

const host = process.env.REACT_APP_SERVER_ADDRESS;


class DisciplineService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/disciplines`,
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

    async getAllDisciplines(): Promise<ResponseDiscipline[]> {
        const response: AxiosResponse<ResponseDiscipline[]> = await this.axiosInstance.get("");
        return response.data;
    }

    async getDiscipline(disciplineId: string): Promise<ResponseDiscipline> {
        const response: AxiosResponse<ResponseDiscipline> = await this.axiosInstance.get(`/${disciplineId}`);
        return response.data;
    }
}

export default DisciplineService;
