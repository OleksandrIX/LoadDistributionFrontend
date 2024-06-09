import {DisciplineDistributionWorkload} from "entities/discipline"
import {TeacherDistributionWorkload} from "entities/teacher";


export interface DistributedEducationComponent {
    id: string;
    education_component_code: string;
    teacher_per_study_group: Record<string, TeacherDistributionWorkload | null>;
}

export interface DistributedDisciplinePerCourse {
    lecture: TeacherDistributionWorkload | null;
    education_components: DistributedEducationComponent[]
}

export interface DistributedDiscipline {
    id: string;
    discipline_name: string;
    course_study: Record<number, DistributedDisciplinePerCourse>;
}

export interface WorkloadDistributionSession {
    study_year: string;
    distribution_name: string
    step: number;
    disciplines: DisciplineDistributionWorkload[];
    teachers: TeacherDistributionWorkload[];
    distributed_disciplines: DistributedDiscipline[];
}

export interface TeacherCorrectWorkload {
    isCorrect: boolean;
    message: string;
    teacher: TeacherDistributionWorkload;
}

