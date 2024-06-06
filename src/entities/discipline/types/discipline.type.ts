import {IdType, TimestampType} from "types/base.model.type";
import {EducationDegree} from "types/enums";
import {ResponseStudyGroup} from "entities/group";
import {ResponseSpecialization} from "entities/specialization";
import {RequestSemester, ResponseSemester} from "./semester.type";
import {ResponseAcademicWorkload} from "./workload.type";


interface DisciplineBase {
    discipline_name: string;
    credits: number;
    hours: number;
}

interface EducationComponentBase {
    education_component_code: string;
    course_study: number;
    numbers_of_flows: number;
}


export interface ParsedEducationComponent extends EducationComponentBase {
    department: number;
    semesters: RequestSemester[];
}

export interface RequestEducationComponent extends EducationComponentBase {
    education_degree: EducationDegree;
    discipline_id: string;
    specialization_id: string;
}

export interface ResponseEducationComponent extends IdType, TimestampType, EducationComponentBase {
    education_degree: EducationDegree;
    discipline_id: string;
    specialization_id: string;
}

export interface ResponseEducationComponentWithRelationships extends IdType, TimestampType, EducationComponentBase {
    education_degree: EducationDegree;
    specialization: ResponseSpecialization;
    semesters: ResponseSemester[];
    study_groups: ResponseStudyGroup[];
}


export interface RequestDiscipline extends DisciplineBase {
}

export interface ResponseDiscipline extends IdType, TimestampType, DisciplineBase {
    academic_workload: ResponseAcademicWorkload;
    education_components: ResponseEducationComponentWithRelationships[];
}
