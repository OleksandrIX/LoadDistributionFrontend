import EducationComponentService from "./service/educationComponent.service";

export type {
    ParsedEducationComponent,
    RequestEducationComponent,
    ResponseEducationComponent
} from "./types/discipline.type";

export type {
    RequestAcademicHours,
    RequestAcademicTask,
    ResponseAcademicHours,
    ResponseAcademicTask
} from "./types/academic.type";

export type {
    RequestSemester,
    ResponseSemester
} from "./types/semester.type";

export type {
    RequestAcademicWorkload,
    ResponseAcademicWorkload
} from "./types/workload.type";

export {EducationComponentService};
