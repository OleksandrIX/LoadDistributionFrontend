import {Position, MilitaryRank, AcademicRank, ScientificDegree} from "types/enums";
import {IdType, TimestampType} from "types/base.model.type";
import {RequestAcademicWorkload} from "../../discipline";


export interface BaseTeacher {
    first_name: string;
    last_name: string;
    middle_name: string;
    position: Position;
    military_rank: MilitaryRank | null;
    academic_rank: AcademicRank | null;
    scientific_degree: ScientificDegree | null;
    years_of_service: number | null;
    teacher_rate: number;
    is_civilian: boolean;
    department_id: string;
}

export interface ResponseTeacher extends BaseTeacher, IdType, TimestampType {

}

export interface RequestTeacher extends BaseTeacher {

}

export interface TeacherDistributionWorkload extends ResponseTeacher {
    academic_workload: RequestAcademicWorkload;
}
