import EducationComponentService from "./service/education.component.service";
import DisciplineService from "./service/discipline.service";
import {CalculationAcademicWorkloadService, AcademicWorkloadService} from "./service/workload.service";
import DistributionSessionService from "./service/distribution.session.service";


export type {
    ParsedEducationComponent,
    RequestEducationComponent,
    ResponseEducationComponent,
    ResponseEducationComponentWithRelationships,
    RequestDiscipline,
    ResponseDiscipline,
    DisciplineDistributionWorkload
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

export {defaultAcademicWorkload} from "./types/workload.type";
export type {
    RequestAcademicWorkload,
    ResponseAcademicWorkload,
    ResponseAcademicWorkloadTeacher,
    RequestAcademicWorkloadTeacher
} from "./types/workload.type";

export {
    EducationComponentService,
    DisciplineService,
    CalculationAcademicWorkloadService,
    DistributionSessionService,
    AcademicWorkloadService
};
