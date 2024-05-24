import {UserRole} from "types/enums";
import {IdType, TimestampType} from "types/base.model.type";

export interface User extends IdType, TimestampType {
    username: string;
    email: string;
    role: UserRole;
    department_id: string;
}

export interface UserLogin {
    username: string;
    password: string;
}


export interface UserRegistration {
    username: string;
    email: string;
    password: string;
}
