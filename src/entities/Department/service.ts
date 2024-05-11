import Axios, {AxiosResponse} from "axios";
import {Department} from "./model";
import {Pagination} from "../Pagination";


const host = process.env.REACT_APP_SERVER_ADDRESS;

Axios.defaults.baseURL = host;
Axios.defaults.headers.post["Content-Type"] = "application/json";

const getAllDepartments = async (page: number = 1, size: number = 10): Promise<Pagination<Department>> => {
    const response: AxiosResponse<Pagination<Department>> = await Axios.get(`/api/v1/departments?page=${page}&size=${size}`);
    return response.data;
};

const getDepartmentById = async (id: string): Promise<Department> => {
    const response: AxiosResponse<Department> = await Axios.get(`/api/v1/departments/${id}`);
    return response.data;
};

const createDepartment = async (departmentData: Department): Promise<Department> => {
    const response: AxiosResponse<Department> = await Axios.post("/api/v1/departments", departmentData);
    return response.data;
};

const updateDepartment = async (id: string, departmentData: Department): Promise<Department> => {
    const response: AxiosResponse<Department> = await Axios.put(`/api/v1/departments/${id}`, departmentData);
    return response.data;
};

const deleteDepartment = async (id: string): Promise<void> => {
    await Axios.delete(`/api/v1/departments/${id}`);
};

export {getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment};
