import axios, {AxiosInstance, AxiosResponse} from "axios";
import {Department, CreateDepartment, UpdateDepartment} from "types/department.type";
import {Pagination, PaginationQuery} from "types/pagination.type";

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

    async getAllDepartments({page, size}: PaginationQuery = {page: 1, size: 10}): Promise<Pagination<Department>> {
        const response: AxiosResponse<Pagination<Department>> =
            await this.axiosInstance.get(`?page=${page}&size=${size}`);
        return response.data;
    }

    async getDepartmentById(id: string): Promise<Department> {
        const response: AxiosResponse<Department> = await this.axiosInstance.get(`/${id}`);
        return response.data;
    }

    async createDepartment(departmentData: CreateDepartment): Promise<Department> {
        const response: AxiosResponse<Department> = await this.axiosInstance.post("", departmentData);
        return response.data;
    }

    async updateDepartment(id: string, departmentData: UpdateDepartment): Promise<Department> {
        const response: AxiosResponse<Department> = await this.axiosInstance.put(`/${id}`, departmentData);
        return response.data;
    }

    async deleteDepartment(id: string): Promise<AxiosResponse> {
        return this.axiosInstance.delete(`/${id}`);
    }
}

export default new DepartmentService();
