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
    education_component_id: string;
    teacher_id: string;
}

export interface RequestAcademicWorkload extends AcademicWorkloadBase {

}

export interface ResponseAcademicWorkload extends IdType, TimestampType, AcademicWorkloadBase {

}
