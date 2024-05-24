import {Teacher} from "entities/teacher";
import {EducationComponent} from "entities/discipline";

interface DepartmentBase {
    department_name: string;
    department_code: string;
}

export interface Department extends DepartmentBase {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface DepartmentWithTeachers extends Department {
    teachers: Teacher[];
}

export interface DepartmentWithEducationComponents extends Department {
    education_components: EducationComponent[];
}

export interface RequestDepartment extends DepartmentBase {

}
