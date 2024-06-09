import {IdType, TimestampType} from "types/base.model.type";

interface SpecializationBase {
    specialization_code: string
    specialization_name: string
}

export interface RequestSpecialization extends SpecializationBase {
    specialty_id: string;
}

export interface ResponseSpecialization extends SpecializationBase, IdType, TimestampType {
    specialty_id: string;
}
