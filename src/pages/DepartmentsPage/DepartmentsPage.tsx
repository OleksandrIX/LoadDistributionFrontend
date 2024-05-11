import {FC} from "react";
import {Outlet} from "react-router-dom";
import {getAllDepartments} from "entities/Department";
import "./DepartmentsPage.scss";

const DepartmentsPage: FC = () => {
    return (
        <div className="departments-page">
            <h1 className="departments-page__title">Кафедри</h1>
            <Outlet/>
        </div>
    );
};

const departmentsLoader = async () => {
    return getAllDepartments();
};

export {DepartmentsPage, departmentsLoader};
