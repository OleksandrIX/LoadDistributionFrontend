import React, {FC} from "react";
import {Card, CardBody, Text} from "@chakra-ui/react";

import {Department} from "types/department.type";

import "./DepartmentCard.scss";

interface DepartmentCardProps {
    department: Department;
}

const DepartmentCard: FC<DepartmentCardProps> = ({department}) => {
    return (
        <Card className="department">
            <CardBody>
                <Text className="department__name">
                    {department.department_code} {department.department_name}
                </Text>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, veritatis.
                </Text>
            </CardBody>
        </Card>
    );
};

export {DepartmentCard};
