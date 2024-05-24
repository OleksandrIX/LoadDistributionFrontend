import {EducationDegree, ReportingType} from "types/enums";

export interface CurriculumFile {
    etag: string;
    bucket_name: string;
    filename: string;
    content_type: string
    size: number;
}

export interface ParsedCurriculum {
    curriculum_file: CurriculumFile;
    curriculum_spreadsheet_blocks: CurriculumSpreadsheetBlock[];
    curriculum_errors: string[][];
}

export interface SaveCurriculumRequest {
    curriculum_spreadsheet_blocks: CurriculumSpreadsheetBlock[];
}

export interface SaveCurriculumResponse {
    education_components: string[];
}


export interface CurriculumSpreadsheetBlock {
    course_study: number;
    education_degree: EducationDegree;
    specialty: string;
    specialization: string;
    study_groups: string;
    education_components: EducationComponent[];
}

export interface EducationComponent {
    education_component_code: string;
    education_component_name: string;
    department: number;
    credits: number;
    hours: number;
    semesters: Semester[];
}

export interface Semester {
    semester_number: number;
    total_amount_hours: number;
    reporting_type: ReportingType | null;
    academic_hours: AcademicHours;
    academic_task: AcademicTask;
}

export interface AcademicHours {
    amount_classroom_hours: number;
    lecture_hours: number;
    group_hours: number;
    practical_hours: number;
    self_study_hours: number;
}

export interface AcademicTask {
    term_papers: number;
    modular_control_works: number;
    calculation_graphic_works: number;
    essays: number;
}
