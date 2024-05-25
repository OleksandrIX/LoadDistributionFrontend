import DisciplineService from "./service/discipline.service";

export type {
    ParsedEducationComponent,
    RequestEducationComponent,
    ResponseEducationComponent,
    ResponseEducationComponentWithRelationships
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

export {DisciplineService};
