import {IdType, TimestampType} from "types/base.model.type";

interface AcademicWorkloadBase {
    lecture_hours: number;
    group_hours: number;
    practical_hours: number;
    laboratory_reports_checking_hours: number;
    special_exercises_conducting_hours: number;
    consultation_hours: number;
    term_papers_conducting_hours: number;
    control_works_checking_hours: number;
    graded_tests_conducting_hours: number;
    exams_conducting_hours: number;
    military_internship_conducting_hours: number;
    supervision_qualification_works_hours: number;
    qualification_works_defense_conducting_hours: number;
    complex_exams_conducting_hours: number;
    other_types_conducting_hours: number;
}

export const defaultAcademicWorkload: AcademicWorkloadBase = {
    lecture_hours: 0,
    group_hours: 0,
    practical_hours: 0,
    laboratory_reports_checking_hours: 0,
    special_exercises_conducting_hours: 0,
    consultation_hours: 0,
    term_papers_conducting_hours: 0,
    control_works_checking_hours: 0,
    graded_tests_conducting_hours: 0,
    exams_conducting_hours: 0,
    military_internship_conducting_hours: 0,
    supervision_qualification_works_hours: 0,
    qualification_works_defense_conducting_hours: 0,
    complex_exams_conducting_hours: 0,
    other_types_conducting_hours: 0
};

export interface RequestAcademicWorkload extends AcademicWorkloadBase {
    [key: string]: number;
}

export interface ResponseAcademicWorkload extends IdType, TimestampType, AcademicWorkloadBase {

}
