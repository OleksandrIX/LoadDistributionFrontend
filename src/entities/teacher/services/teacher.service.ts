import axios, {AxiosInstance, AxiosResponse} from "axios";

import {RequestTeacher, ResponseTeacher} from "entities/teacher/types/teacher.type";

const host = process.env.REACT_APP_SERVER_ADDRESS;

class TeacherService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/teachers`,
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

    async getAllTeachers(): Promise<ResponseTeacher[]> {
        const response: AxiosResponse<ResponseTeacher[]> = await this.axiosInstance.get("");
        return response.data;
    }

    async getTeacherById(id: string): Promise<ResponseTeacher> {
        const response: AxiosResponse<ResponseTeacher> = await this.axiosInstance.get(`/${id}`);
        return response.data;
    }

    async createTeacher(teacherData: RequestTeacher): Promise<string> {
        const response: AxiosResponse<string> = await this.axiosInstance.post("", teacherData);
        return response.data;
    }

    async editTeacher(id: string, teacherData: RequestTeacher): Promise<ResponseTeacher> {
        const response: AxiosResponse<ResponseTeacher> = await this.axiosInstance.put(`/${id}`, teacherData);
        return response.data;
    }

    async deleteTeacher(id: string): Promise<AxiosResponse> {
        return this.axiosInstance.delete(`/${id}`);
    }
}

export default TeacherService;
