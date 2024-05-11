import React, {FC} from "react";
import {Department} from "entities/Department";
import {Card} from "react-bootstrap";
import "./DepartmentCard.scss";

interface DepartmentCardProps {
    department: Department;
}

const DepartmentCard: FC<DepartmentCardProps> = ({department}) => {
    return (
        <Card className="department">
            <Card.Body>
                <Card.Title className="department__name">
                    {department.department_code} {department.department_name}
                </Card.Title>
                <Card.Subtitle>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, veritatis.
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export {DepartmentCard};
