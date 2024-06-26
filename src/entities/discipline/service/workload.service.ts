import axios, {AxiosInstance, AxiosResponse} from "axios";
import {RequestAcademicWorkload} from "entities/discipline";
import {RequestAcademicWorkloadTeacher} from "../types/workload.type";

const host = process.env.REACT_APP_SERVER_ADDRESS;

class CalculationAcademicWorkloadService {
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
        workloadType: string,
        educationComponentId: string,
        studyGroupId?: string
    ): Promise<RequestAcademicWorkload> {
        let url = `/education-components/${educationComponentId}?workload_type=${workloadType}`;
        if (studyGroupId) {
            url += `&study_group_id=${studyGroupId}`;
        }
        const response: AxiosResponse<RequestAcademicWorkload> =
            await this.axiosInstance.get(url);
        return response.data;
    }

    async calculationAcademicWorkloadForEducationComponents(
        workloadType: string,
        educationComponentIds: string[]
    ): Promise<RequestAcademicWorkload> {
        const queryString = educationComponentIds.map((id) => `education_component_ids=${id}`).join("&");
        const response: AxiosResponse<RequestAcademicWorkload> =
            await this.axiosInstance.get(
                `/education-components?workload_type=${workloadType}&${queryString}`
            );
        return response.data;
    }
}

class AcademicWorkloadService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/academic-workloads`,
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

    async saveWorkloadForTeacher(
        request: RequestAcademicWorkloadTeacher
    ): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosInstance.post(
            `/${request.discipline_id}/teachers/${request.teacher_id}?semester_number=${request.semester_number}`,
            request.academic_workload
        );
        return response.data;
    }
}

export {CalculationAcademicWorkloadService, AcademicWorkloadService};
