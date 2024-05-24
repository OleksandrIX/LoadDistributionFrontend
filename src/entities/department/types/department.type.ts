export interface Department {
    id: string;
    department_name: string;
    department_code: string;
    created_at: string;
    updated_at: string;
}

export interface RequestDepartment {
    department_name: string;
    department_code: string;
}
