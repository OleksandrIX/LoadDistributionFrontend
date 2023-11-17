import {FC} from "react";
import {useParams} from "react-router-dom";

const DepartmentSingle: FC = () => {
    const {departmentId} = useParams();

    return (
        <div>
            DepartmentSingle with id {departmentId}
        </div>
    );
};

export {DepartmentSingle};
