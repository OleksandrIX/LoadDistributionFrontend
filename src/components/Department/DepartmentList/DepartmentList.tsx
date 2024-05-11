import React, {FC} from "react";
import {useLoaderData} from "react-router-dom";
import {Pagination} from "entities/Pagination";
import {Department} from "entities/Department";
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
