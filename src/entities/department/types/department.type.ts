import {Teacher} from "entities/teacher";
import {ResponseDiscipline} from "entities/discipline";
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
    disciplines: ResponseDiscipline[];
}

export interface RequestDepartment extends DepartmentBase {

}
