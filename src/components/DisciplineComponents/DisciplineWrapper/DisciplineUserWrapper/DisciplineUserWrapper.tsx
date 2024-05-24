import {FC} from "react";
import {Heading, Stack} from "@chakra-ui/react";

import {Department} from "entities/department";
import {EducationComponent} from "entities/discipline";
import DisciplineTable from "../../DisciplineTable/DisciplineTable";

interface DisciplineUserWrapperProps {
    department: Department;
    disciplines: EducationComponent[];
}

const DisciplineUserWrapper: FC<DisciplineUserWrapperProps> = ({department, disciplines}) => {
    return (
        <Stack spacing={4}>
            <Heading textAlign="center" size="sm">{department.department_code} {department.department_name}</Heading>
            <DisciplineTable disciplines={disciplines}/>
        </Stack>
    );
};

export default DisciplineUserWrapper;
