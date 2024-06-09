import {IdType, TimestampType} from "types/base.model.type";
import {ReportingType} from "types/enums";
import {RequestAcademicHours, RequestAcademicTask, ResponseAcademicHours, ResponseAcademicTask} from "./academic.type";


interface SemesterBase {
    semester_number: number;
    total_amount_hours: number;
    reporting_type: ReportingType | null;
}

export interface RequestSemester extends SemesterBase {
    academic_hours: RequestAcademicHours;
    academic_task: RequestAcademicTask;
}

export interface ResponseSemester extends IdType, TimestampType, SemesterBase {
    academic_hours: ResponseAcademicHours;
    academic_task: ResponseAcademicTask;
}
