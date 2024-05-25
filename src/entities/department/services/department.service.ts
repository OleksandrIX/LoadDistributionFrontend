import axios, {AxiosInstance, AxiosResponse} from "axios";
import {
    Department,
    DepartmentWithTeachers,
    DepartmentWithRelationships,
    RequestDepartment
} from "entities/department";

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

    async getAllDepartmentsWithTeachers(): Promise<DepartmentWithTeachers[]> {
        const response: AxiosResponse<DepartmentWithTeachers[]> = await this.axiosInstance.get("/teachers");
        return response.data;
    }

    async getDepartmentByIdWithTeachers(id: string): Promise<DepartmentWithTeachers> {
        const response: AxiosResponse<DepartmentWithTeachers> = await this.axiosInstance.get(`/${id}/teachers`);
        return response.data;
    }

    async getAllDepartmentsWithEducationComponents(): Promise<DepartmentWithRelationships[]> {
        const response: AxiosResponse<DepartmentWithRelationships[]> = await this.axiosInstance.get(
            "/education-components"
        );
        return response.data;
    }

    async getDepartmentByIdWithEducationComponents(id: string): Promise<DepartmentWithRelationships> {
        const response: AxiosResponse<DepartmentWithRelationships> = await this.axiosInstance.get(
            `/${id}/education-components`
        );
        return response.data;
    }

    async createDepartment(departmentData: RequestDepartment): Promise<string> {
        const response: AxiosResponse<string> = await this.axiosInstance.post("", departmentData);
        return response.data;
    }

    async editDepartment(id: string, departmentData: RequestDepartment): Promise<Department> {
        const response: AxiosResponse<Department> = await this.axiosInstance.put(`/${id}`, departmentData);
        return response.data;
    }

    async deleteDepartment(id: string): Promise<AxiosResponse> {
        return this.axiosInstance.delete(`/${id}`);
    }
}

export default DepartmentService;
