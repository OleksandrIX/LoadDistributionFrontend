import {FC} from "react";
import {Stack} from "@chakra-ui/react";
import {DisciplineDistributionWorkload} from "entities/discipline";
import WorkloadDisciplineListItem from "./WorkloadDisciplineListItem";
import {TeacherDistributionWorkload} from "entities/teacher";

interface DisciplinesListProps {
    disciplines: DisciplineDistributionWorkload[];
    teachers: TeacherDistributionWorkload[];
}

const WorkloadDisciplineList: FC<DisciplinesListProps> = ({disciplines, teachers}) => {
    return (
        <Stack spacing={4}>
            {disciplines.map((discipline) =>
                <WorkloadDisciplineListItem
                    key={discipline.id}
                    discipline={discipline}
                    teachers={teachers}
                />
            )}
        </Stack>
    );
};

export default WorkloadDisciplineList;
