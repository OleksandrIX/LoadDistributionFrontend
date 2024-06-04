import {FC} from "react";
import {Heading, Stack} from "@chakra-ui/react";
import {AcademicRank, EducationDegree, MilitaryRank, Position, ScientificDegree} from "types/enums";
import {Teacher} from "entities/teacher";
import DisciplineComponent from "../Components/DisciplineComponent";

type Specialty = {
    specialty_code: string;
    specialty_name: string;
    specialization_code: string,
    specialization_name: string,
};

type AcademicWorkload = {
    lecture_hours: number;
    group_hours: number;
    practical_hours: number;
    total: number;
}

type EducationComponent = {
    education_component_code: string;
    credits: number;
    hours: number;
    education_degree: EducationDegree;
    specialty: Specialty;
};

type StudyGroups = {
    group_code: string;
    number_listeners: number;
};

type Discipline = {
    id: string;
    discipline_name: string;
    lecture_flow: number;
    course_study: number;
    semester_number: number;
    education_components: EducationComponent[];
    workload: AcademicWorkload;
    study_groups: StudyGroups[]
};

const initialTeachers: Teacher[] = [
    {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        first_name: "Едуард",
        last_name: "Бовда",
        middle_name: "Миколайович",
        position: Position.HEAD_OF_THE_DEPARTMENT,
        military_rank: MilitaryRank.COLONEL,
        academic_rank: AcademicRank.ASSOCIATE_PROFESSOR,
        scientific_degree: ScientificDegree.CANDIDATE_OF_SCIENCE,
        years_of_service: 20,
        teacher_rate: 1,
        is_civilian: false,
        department_id: "d8f98f8d-a99f-4d8c-8ca4-87177928cb05",
        created_at: "2024-05-25T07:53:11.583419",
        updated_at: "2024-05-25T07:53:11.583419"
    },
    {
        id: "83341943-1661-419d-aeb3-22cffaa56b65",
        first_name: "Володимир",
        last_name: "Горбенко",
        middle_name: "Іванович",
        position: Position.PROFESSOR,
        military_rank: null,
        academic_rank: AcademicRank.ASSOCIATE_PROFESSOR,
        scientific_degree: ScientificDegree.CANDIDATE_OF_SCIENCE,
        years_of_service: null,
        teacher_rate: 0.75,
        is_civilian: true,
        department_id: "d8f98f8d-a99f-4d8c-8ca4-87177928cb05",
        created_at: "2024-05-25T07:53:11.583419",
        updated_at: "2024-05-25T07:53:11.583419"
    },
    {
        id: "b18b8e34-4d7a-4d51-be83-c888d87e9286",
        first_name: "Володимир",
        last_name: "Гріньков",
        middle_name: "Олександрович",
        position: Position.ASSISTANT,
        military_rank: null,
        academic_rank: null,
        scientific_degree: null,
        years_of_service: null,
        teacher_rate: 1,
        is_civilian: true,
        department_id: "d8f98f8d-a99f-4d8c-8ca4-87177928cb05",
        created_at: "2024-05-25T07:53:11.583419",
        updated_at: "2024-05-25T07:53:11.583419"
    },
    {
        id: "302da96e-3b17-4d15-817e-6134b5dafc83",
        first_name: "Андрій",
        last_name: "Задворний",
        middle_name: "Васильович",
        position: Position.LECTURER,
        military_rank: null,
        academic_rank: null,
        scientific_degree: null,
        years_of_service: null,
        teacher_rate: 0.5,
        is_civilian: true,
        department_id: "d8f98f8d-a99f-4d8c-8ca4-87177928cb05",
        created_at: "2024-05-25T07:53:11.583419",
        updated_at: "2024-05-25T07:53:11.583419"
    },
    {
        id: "3dd7f83b-2b39-42c9-a441-c18f915409ff",
        first_name: "Віктор",
        last_name: "Клименко",
        middle_name: "Михайлович",
        position: Position.SENIOR_LECTURER,
        military_rank: null,
        academic_rank: null,
        scientific_degree: null,
        years_of_service: null,
        teacher_rate: 1,
        is_civilian: true,
        department_id: "d8f98f8d-a99f-4d8c-8ca4-87177928cb05",
        created_at: "2024-05-25T07:53:11.583419",
        updated_at: "2024-05-25T07:53:11.583419"
    },
    {
        id: "9489a0f9-248b-4d02-8874-c3b3ac61d32b",
        first_name: "Володимир",
        last_name: "Легкобит",
        middle_name: "Сергійович",
        position: Position.SENIOR_LECTURER,
        military_rank: MilitaryRank.LIEUTENANT_COLONEL,
        academic_rank: null,
        scientific_degree: null,
        years_of_service: 15,
        teacher_rate: 1,
        is_civilian: false,
        department_id: "d8f98f8d-a99f-4d8c-8ca4-87177928cb05",
        created_at: "2024-05-25T07:53:11.583419",
        updated_at: "2024-05-25T07:53:11.583419"
    }
];
const initialDisciplines: Discipline[] = [
    {
        id: "96708139-f21c-4b95-94b4-4e5caf10e22d",
        discipline_name: "Операційні системи",
        lecture_flow: 2,
        course_study: 3,
        semester_number: 1,
        workload: {
            lecture_hours: 16,
            group_hours: 44,
            practical_hours: 36,
            total: 512
        },
        education_components: [
            {
                education_component_code: "ЗО.14",
                credits: 5,
                hours: 150,
                education_degree: EducationDegree.BACHELOR,
                specialty: {
                    specialty_code: "122",
                    specialty_name: "Комп'ютерні науки",
                    specialization_code: "530200",
                    specialization_name: "Математичне, інформаційне і програмне забезпечення військових інформаційних систем"
                }
            },
            {
                education_component_code: "ЗО.12",
                credits: 5,
                hours: 150,
                education_degree: EducationDegree.BACHELOR,
                specialty: {
                    specialty_code: "125",
                    specialty_name: "Кібербезпека та захист інформації",
                    specialization_code: "121501",
                    specialization_name: "Захист інформації та кібернетична безпека в інформаційно-телекомунікаційних системах"
                }
            }
        ],
        study_groups: [
            {
                group_code: "211",
                number_listeners: 24
            },
            {
                group_code: "212",
                number_listeners: 26
            },
            {
                group_code: "213",
                number_listeners: 14
            },
            {
                group_code: "214",
                number_listeners: 30
            },
            {
                group_code: "314",
                number_listeners: 25
            },
            {
                group_code: "315",
                number_listeners: 20
            }
        ]
    },
    {
        id: "96708139-f21c-4b95-94b4-4e5caf10e03d",
        discipline_name: "Організація баз даних та знань",
        lecture_flow: 1,
        course_study: 3,
        semester_number: 2,
        workload: {
            lecture_hours: 20,
            group_hours: 30,
            practical_hours: 40,
            total: 300
        },
        education_components: [
            {
                education_component_code: "ЗО.15",
                credits: 5,
                hours: 150,
                education_degree: EducationDegree.BACHELOR,
                specialty: {
                    specialty_code: "122",
                    specialty_name: "Комп'ютерні науки",
                    specialization_code: "530200",
                    specialization_name: "Математичне, інформаційне і програмне забезпечення військових інформаційних систем"
                }
            },
            {
                education_component_code: "ЗО.13",
                credits: 5,
                hours: 150,
                education_degree: EducationDegree.BACHELOR,
                specialty: {
                    specialty_code: "126",
                    specialty_name: "Інформаційні системи та технології",
                    specialization_code: "531100",
                    specialization_name: "Автоматизовані системи управління військами та озброєнням"
                }
            }
        ],
        study_groups: [
            {
                group_code: "211",
                number_listeners: 24
            },
            {
                group_code: "212",
                number_listeners: 26
            },
            {
                group_code: "213",
                number_listeners: 14
            },
            {
                group_code: "214",
                number_listeners: 30
            }
        ]
    }
];

const WorkloadWrapper: FC = () => {
    return (
        <Stack>
            <Heading mb={5} size="md" textAlign="center">Розподіл навчального навантаження</Heading>

            <Stack spacing={4}>
                {initialDisciplines.map((discipline) =>
                    <DisciplineComponent key={discipline.id} discipline={discipline} teachers={initialTeachers}/>
                )}
            </Stack>
        </Stack>
    );
};


export default WorkloadWrapper;
