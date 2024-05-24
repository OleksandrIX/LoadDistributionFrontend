import {Teacher} from "entities/teacher";

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

export interface RequestDepartment extends DepartmentBase {

}
