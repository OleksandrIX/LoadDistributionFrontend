import {IdType, TimestampType} from "types/base.model.type";

interface SpecialtyBase {
    specialty_code: string
    specialty_name: string
}

export interface RequestSpecialty extends SpecialtyBase {
    department_id: string;
}

export interface ResponseSpecialty extends SpecialtyBase, IdType, TimestampType {
    department_id: string;
}
