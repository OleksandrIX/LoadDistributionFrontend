import {Teacher} from "entities/teacher";
import {ResponseEducationComponentWithRelationships} from "entities/discipline";
import {IdType, TimestampType} from "types/base.model.type";

interface DepartmentBase {
    department_name: string;
    department_code: string;
}

export interface Department extends DepartmentBase, IdType, TimestampType {

}

export interface DepartmentWithTeachers extends Department {
    teachers: Teacher[];
}

export interface DepartmentWithRelationships extends Department {
    education_components: ResponseEducationComponentWithRelationships[];
}

export interface RequestDepartment extends DepartmentBase {

}
