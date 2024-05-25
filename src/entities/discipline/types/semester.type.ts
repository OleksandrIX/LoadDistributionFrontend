import {IdType, TimestampType} from "types/base.model.type";
import {ReportingType} from "types/enums";
import {RequestAcademicHours, RequestAcademicTask} from "./academic.type";


interface SemesterBase {
    semester_number: number;
    total_amount_hours: number;
    reporting_type: ReportingType | null;
    academic_hours: RequestAcademicHours;
    academic_task: RequestAcademicTask;
}

export interface RequestSemester extends SemesterBase {

}

export interface ResponseSemester extends IdType, TimestampType, SemesterBase {

}
