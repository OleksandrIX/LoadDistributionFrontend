import {IdType, TimestampType} from "types/base.model.type";

interface AcademicHoursBase {
    amount_classroom_hours: number;
    lecture_hours: number;
    group_hours: number;
    practical_hours: number;
    self_study_hours: number;
}

interface AcademicTaskBase {
    term_papers: number;
    modular_control_works: number;
    calculation_graphic_works: number;
    essays: number;
}

export interface RequestAcademicHours extends AcademicHoursBase {

}

export interface ResponseAcademicHours extends IdType, TimestampType, AcademicHoursBase {

}

export interface RequestAcademicTask extends AcademicTaskBase {

}


export interface ResponseAcademicTask extends IdType, TimestampType, AcademicTaskBase {

}
