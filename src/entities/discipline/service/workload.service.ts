import axios, {AxiosInstance, AxiosResponse} from "axios";
import {RequestAcademicWorkload} from "entities/discipline";

const host = process.env.REACT_APP_SERVER_ADDRESS;

class AcademicWorkloadService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/calculation-academic-workload`,
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

    async calculationAcademicWorkloadForEducationComponent(
        educationComponentId: string
    ): Promise<RequestAcademicWorkload> {
        const response: AxiosResponse<RequestAcademicWorkload> =
            await this.axiosInstance.get(`/education-components/${educationComponentId}`);
        return response.data;
    }

    async calculationAcademicWorkloadForEducationComponents(
        educationComponentIds: string[]
    ): Promise<RequestAcademicWorkload> {
        const queryString = educationComponentIds.map((id) => `education_component_ids=${id}`).join("&");
        const response: AxiosResponse<RequestAcademicWorkload> =
            await this.axiosInstance.get(`/education-components?${queryString}`);
        return response.data;
    }

}

export default AcademicWorkloadService;
