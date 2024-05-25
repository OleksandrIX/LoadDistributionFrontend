import {EducationDegree} from "types/enums";
import {ParsedEducationComponent} from "entities/discipline";

export interface CurriculumFile {
    etag: string;
    bucket_name: string;
    filename: string;
    content_type: string
    size: number;
}

export interface CurriculumSpreadsheetBlock {
    course_study: number;
    education_degree: EducationDegree;
    specialty: string;
    specialization: string;
    study_groups: string;
    education_components: ParsedEducationComponent[];
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
