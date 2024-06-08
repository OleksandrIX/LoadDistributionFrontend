import {FC} from "react";
import {Stack} from "@chakra-ui/react";
import {ResponseDiscipline} from "entities/discipline";
import WorkloadDisciplineListItem from "./WorkloadDisciplineListItem";

interface DisciplinesListProps {
    disciplines: ResponseDiscipline[]
}

const WorkloadDisciplineList: FC<DisciplinesListProps> = ({disciplines}) => {
    return (
        <Stack spacing={4}>
            {disciplines.map((discipline) => <WorkloadDisciplineListItem key={discipline.id} discipline={discipline}/>)}
        </Stack>
    );
};

export default WorkloadDisciplineList;
