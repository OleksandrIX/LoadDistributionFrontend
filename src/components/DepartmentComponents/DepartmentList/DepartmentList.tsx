import React, {FC} from "react";
import {useLoaderData} from "react-router-dom";

import {Department} from "entities/department/types/department.type";
import {Pagination} from "types/pagination.type";
import {DepartmentCard} from "../DepartmentCard/DepartmentCard";

import "./DepartmentList.scss";


const DepartmentList: FC = () => {
    const departments: Pagination<Department> = useLoaderData() as Pagination<Department>;
    console.log(departments);
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
