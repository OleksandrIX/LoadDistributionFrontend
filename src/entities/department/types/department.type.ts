export interface Department {
    id: string;
    department_name: string;
    department_code: string;
    created_at: string;
    updated_at: string;
}

export interface DepartmentTableData {
    department_code: string;
    department_name: string;
    total_teachers: number;
    academic_workload: number;
}


export interface RequestDepartment {
    department_name: string;
    department_code: string;
}
