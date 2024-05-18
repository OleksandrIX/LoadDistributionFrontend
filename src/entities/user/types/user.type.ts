import {UserRole} from "types/enums";

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    department_id: string;
    created_at: Date;
    updated_at: Date;
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
