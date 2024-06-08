import {FC} from "react";
import {Flex, Stack, Tag, Text, useDisclosure} from "@chakra-ui/react";

import {DisciplineDistributionWorkload} from "entities/discipline";
import {TeacherDistributionWorkload} from "entities/teacher";
import {ViewWorkloadDistributionModal} from "./DisciplineOverlayComponents";

interface DisciplineListItemProps {
    discipline: DisciplineDistributionWorkload;
    teachers: TeacherDistributionWorkload[];
}

const WorkloadDisciplineListItem: FC<DisciplineListItemProps> = ({discipline, teachers}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Stack
            p={4}
            bg={discipline.isDistributed ? "#C6F6D5" : "#EBECEA"}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="brand.300"
            borderRadius="lg"
            direction="row" gap={4} cursor="pointer"
            onClick={() => !discipline.isDistributed && onOpen()}
        >
            <Flex w="100%" alignItems="center" gap={4}>
                <Text w="65%">
                    <Text as="span" fontWeight="600">Назва дисципліни: </Text>
                    <Text as="span" fontStyle="italic">{discipline.discipline_name}</Text>
                </Text>

                <Flex w="35%" alignItems="center" gap={1}>
                    <Flex alignItems="center" gap={1}>
                        <Text>Відсоток завершення: </Text>
                        <Tag
                            colorScheme={discipline.completionPercentage > 33 ? discipline.completionPercentage < 100 ? "yellow" : "green" : "red"}
                            fontSize="medium"
                        >
                            {discipline.completionPercentage} %
                        </Tag>
                    </Flex>

                    <Text fontSize="larger">
                        <Text as="span" fontStyle="italic">
                            {(Object.values(discipline.academic_workload).reduce((acc, hours) =>
                                typeof hours === "number" ? acc + hours : acc, 0
                            )).toFixed(2)}
                        </Text> годин
                    </Text>
                </Flex>
            </Flex>

            <ViewWorkloadDistributionModal
                isOpen={isOpen}
                onClose={onClose}
                discipline={discipline}
                teachers={teachers}
            />
        </Stack>
    );
};

export default WorkloadDisciplineListItem;
