import axios, {AxiosInstance, AxiosResponse} from "axios";
import {WorkloadDistributionSession} from "types/workload.distribution.session";

const host = process.env.REACT_APP_SERVER_ADDRESS;

class DistributionSessionService {
    private axiosInstance: AxiosInstance;

    constructor() {
        const defaultHeaders = axios.defaults.headers;
        this.axiosInstance = axios.create({
            baseURL: `${host}/api/v1/academic-distribution-sessions`,
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

    async getAllDistributionSessions(): Promise<string[]> {
        const response: AxiosResponse<string[]> = await this.axiosInstance.get("");
        return response.data;
    }

    async loadDistributionSessionByName(distirbutionSessionName: string): Promise<WorkloadDistributionSession> {
        const response: AxiosResponse<WorkloadDistributionSession> = await this.axiosInstance.get(`/${distirbutionSessionName}`);
        return response.data;
    }

    async saveDistributionSession(distributionSession: WorkloadDistributionSession): Promise<AxiosResponse> {
        return await this.axiosInstance.post("", distributionSession);
    }

    async deleteDistributionSessionByName(distirbutionSessionName: string): Promise<AxiosResponse> {
        return await this.axiosInstance.delete(`/${distirbutionSessionName}`);
    }
}

export default DistributionSessionService;
