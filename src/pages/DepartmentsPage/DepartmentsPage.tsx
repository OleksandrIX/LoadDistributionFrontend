import {FC} from "react";
import {Outlet} from "react-router-dom";

import {useAuth} from "app/provider/AuthProvider";
import departmentService from "services/department.service";

import "./DepartmentsPage.scss";

const DepartmentsPage: FC = () => {
    const {user} = useAuth();

    if (!user) {
        return <div>Forbidden</div>;
    }

    return (
        <div className="departments-page">
            <h1 className="departments-page__title">Кафедри</h1>
            <Outlet/>
        </div>
    );
};

export const departmentsLoader = async () => {
    return departmentService.getAllDepartments();
};

export default DepartmentsPage;
