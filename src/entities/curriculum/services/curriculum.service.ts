import axios, {AxiosInstance, AxiosResponse} from "axios";
import {CurriculumFile} from "entities/curriculum";

const host = process.env.REACT_APP_SERVER_ADDRESS;

class CurriculumService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/curriculums`,
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

    async getAllCurriculums(): Promise<CurriculumFile[]> {
        const response: AxiosResponse<CurriculumFile[]> = await this.axiosInstance.get("");
        return response.data;
    }

    async uploadCurriculum(formData: FormData): Promise<CurriculumFile> {
        const response: AxiosResponse<CurriculumFile> = await this.axiosInstance.post(
            "/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return response.data;
    }

    async downloadCurriculum(filename: string): Promise<Blob> {
        const response: AxiosResponse<Blob> = await this.axiosInstance.get(
            `/download?curriculum_filename=${filename}`,
            {
                responseType: "blob"
            }
        );
        return response.data;
    }

    async deleteCurriculum(filename: string): Promise<AxiosResponse> {
        return this.axiosInstance.delete(`?curriculum_filename=${filename}`);
    }
}

export default CurriculumService;
