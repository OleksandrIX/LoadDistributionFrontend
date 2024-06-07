import {FC} from "react";
import {Stack} from "@chakra-ui/react";
import {ResponseAcademicWorkload, ResponseDiscipline} from "entities/discipline";
import DisciplineListItem from "./DisciplineListItem";

interface DisciplinesListProps {
    disciplines: ResponseDiscipline[]
}

const getTotalWorkloadHours = (workload: ResponseAcademicWorkload) =>
    Object.values(workload).reduce((acc, hours) => typeof hours === "number" ? acc + hours : acc, 0);

const DisciplinesList: FC<DisciplinesListProps> = ({disciplines}) => {
    return (
        <Stack spacing={4}>
            {
                disciplines
                    .sort((a, b) =>
                        getTotalWorkloadHours(b.academic_workload) - getTotalWorkloadHours(a.academic_workload)
                    )
                    .map((discipline) =>
                        <DisciplineListItem key={discipline.id} discipline={discipline}/>
                    )
            }
        </Stack>
    );
};

export default DisciplinesList;
