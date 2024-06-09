import {FC} from "react";
import {Heading, Stack, Text} from "@chakra-ui/react";
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

            <Heading size="lg">
                Загальна кількість годин:
                <Text as="span" fontStyle="italic"
                > {
                    disciplines.reduce((acc, discipline) =>
                            acc + Object.values(discipline.academic_workload).reduce((acc, hours) =>
                                typeof hours === "number" ? acc + hours : acc, 0
                            ), 0
                    ).toFixed(2)
                } годин</Text>
            </Heading>
        </Stack>
    );
};

export default WorkloadDisciplineList;
