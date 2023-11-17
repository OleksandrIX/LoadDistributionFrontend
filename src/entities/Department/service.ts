import Axios, { AxiosResponse } from "axios";
import { Department } from "./model";

const host = process.env.REACT_APP_SERVER_ADDRESS;

Axios.defaults.baseURL = host;
Axios.defaults.headers.post["Content-Type"] = "application/json";

const getAllDepartments = async (): Promise<Department[]> => {
    const response: AxiosResponse<Department[]> = await Axios.get("/api/v1/departments");
    return response.data;
};

const getDepartmentById = async (id: number): Promise<Department> => {
    const response: AxiosResponse<Department> = await Axios.get(`/api/v1/departments/${id}`);
    return response.data;
};

const createDepartment = async (departmentData: Department): Promise<Department> => {
    const response: AxiosResponse<Department> = await Axios.post("/api/v1/departments", departmentData);
    return response.data;
};

const updateDepartment = async (id: number, departmentData: Department): Promise<Department> => {
    const response: AxiosResponse<Department> = await Axios.put(`/api/v1/departments/${id}`, departmentData);
    return response.data;
};

const deleteDepartment = async (id: number): Promise<void> => {
    await Axios.delete(`/api/v1/departments/${id}`);
};

export { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment };
