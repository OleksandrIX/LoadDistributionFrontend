import axios, {AxiosInstance, AxiosResponse} from "axios";
import {CreateDepartment, Department, UpdateDepartment} from "entities/department/types/department.type";
import {Teacher} from "entities/teacher/types/teacher.type";

const host = process.env.REACT_APP_SERVER_ADDRESS;

class DepartmentService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/departments`,
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

    async getAllDepartments(): Promise<Department[]> {
        const response: AxiosResponse<Department[]> = await this.axiosInstance.get("");
        return response.data;
    }

    async getDepartmentById(id: string): Promise<Department> {
        const response: AxiosResponse<Department> = await this.axiosInstance.get(`/${id}`);
        return response.data;
    }

    async getTeachersByDepartmentId(id: string): Promise<Teacher[]> {
        const response: AxiosResponse<Teacher[]> = await this.axiosInstance.get(`/${id}/teachers`);
        return response.data;
    }

    async createDepartment(departmentData: CreateDepartment): Promise<string> {
        const response: AxiosResponse<string> = await this.axiosInstance.post("", departmentData);
        return response.data;
    }

    async editDepartment(id: string, departmentData: UpdateDepartment): Promise<Department> {
        const response: AxiosResponse<Department> = await this.axiosInstance.put(`/${id}`, departmentData);
        return response.data;
    }

    async deleteDepartment(id: string): Promise<AxiosResponse> {
        return this.axiosInstance.delete(`/${id}`);
    }
}

export default DepartmentService;
