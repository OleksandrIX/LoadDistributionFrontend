import {FC} from "react";
import {Outlet} from "react-router-dom";

import departmentService from "entities/department/services/department.service";

import "./DepartmentsPage.scss";

const DepartmentsPage: FC = () => {
    return (
        <div className="departments-page">
            <h1 className="departments-page__title">Кафедри</h1>
            <Outlet/>
        </div>
    );
};

export const departmentsLoader = async () => {
    const accessToken = localStorage.getItem("access_token");
    departmentService.setAuthorizationToken(accessToken || "");
    return departmentService.getAllDepartments();
};

export default DepartmentsPage;
