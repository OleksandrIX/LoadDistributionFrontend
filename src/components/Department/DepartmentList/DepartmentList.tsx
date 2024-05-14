import React, {FC} from "react";
import {useLoaderData} from "react-router-dom";

import {Department} from "types/department.type";
import {Pagination} from "types/pagination.type";
import {DepartmentCard} from "../DepartmentCard/DepartmentCard";

import "./DepartmentList.scss";


const DepartmentList: FC = () => {
    const departments: Pagination<Department> = useLoaderData() as Pagination<Department>;

    return (
        <div className="departments__list">
            <h3>Page: {departments.page}</h3>
            {departments.items.map(department => (
                <DepartmentCard key={department.id} department={department}/>
            ))}
        </div>
    );
};

export {DepartmentList};
