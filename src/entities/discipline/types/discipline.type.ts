import {IdType, TimestampType} from "types/base.model.type";
import {EducationDegree} from "types/enums";
import {ResponseStudyGroup} from "entities/group";
import {ResponseSpecialization} from "entities/specialization";
import {RequestSemester, ResponseSemester} from "./semester.type";
import {ResponseAcademicWorkload} from "./workload.type";


interface EducationComponentBase {
    education_component_code: string;
    education_component_name: string;
    credits: number;
    hours: number;
}

export interface ParsedEducationComponent extends EducationComponentBase {
    department: number;
    semesters: RequestSemester[];
}

export interface RequestEducationComponent extends EducationComponentBase {
    education_degree: EducationDegree;
    department_id: string;
    specialization_id: string;
}

export interface ResponseEducationComponent extends IdType, TimestampType, EducationComponentBase {
    education_degree: EducationDegree;
    department_id: string;
    specialization_id: string;
}

export interface ResponseEducationComponentWithRelationships extends IdType, TimestampType, EducationComponentBase {
    education_degree: EducationDegree;
    specialization: ResponseSpecialization;
    semesters: ResponseSemester[];
    academic_workloads: ResponseAcademicWorkload[];
    study_groups: ResponseStudyGroup[];
}
