interface Department {
    id: string;
    department_name: string;
    department_code: string;
    created_at: string;
    updated_at: string;
}

interface CreateDepartment {
    department_name: string;
    department_code: string;
}

interface UpdateDepartment {
    department_name: string;
    department_code: string;
}

export type {Department, CreateDepartment, UpdateDepartment};
