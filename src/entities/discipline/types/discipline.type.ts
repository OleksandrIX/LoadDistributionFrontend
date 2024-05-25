import {IdType, TimestampType} from "types/base.model.type";
import {RequestSemester} from "./semester.type";
import {EducationDegree} from "types/enums";


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
