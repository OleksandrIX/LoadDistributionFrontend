import axios, {AxiosInstance, AxiosResponse} from "axios";
import {ResponseStudyGroup} from "../types/group.type";

const host = process.env.REACT_APP_SERVER_ADDRESS;

class StudyGroupService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/study-groups`,
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

    async getAllStudyGroups(): Promise<ResponseStudyGroup[]> {
        const response: AxiosResponse<ResponseStudyGroup[]> = await this.axiosInstance.get("");
        return response.data;
    }
}

export default StudyGroupService;
