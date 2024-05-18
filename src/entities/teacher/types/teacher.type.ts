import {Position, MilitaryRank, AcademicRank, ScientificDegree} from "types/enums";

export interface BaseTeacher {
    first_name: string;
    last_name: string;
    middle_name: string;
    position: Position;
    military_rank: MilitaryRank | undefined;
    academic_rank: AcademicRank | undefined;
    scientific_degree: ScientificDegree | undefined;
    years_of_service: number | undefined;
    teacher_rate: number;
    is_civilian: boolean;
    department_id: string;
}

export interface Teacher extends BaseTeacher {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface RequestTeacher extends BaseTeacher {
}
