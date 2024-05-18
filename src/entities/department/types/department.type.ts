export interface Department {
    id: string;
    department_name: string;
    department_code: string;
    created_at: string;
    updated_at: string;
}

export interface CreateDepartment {
    department_name: string;
    department_code: string;
}

export interface UpdateDepartment {
    department_name: string;
    department_code: string;
}
