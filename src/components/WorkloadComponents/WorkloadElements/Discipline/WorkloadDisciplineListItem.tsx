import {FC} from "react";
import {ResponseDiscipline} from "entities/discipline";
import {Flex, List, ListItem, Stack, Tag, Tooltip, useDisclosure} from "@chakra-ui/react";
import ViewWorkloadDistributionModal from "./DisciplineOverlayComponents/ViewWorkloadDistributionModal/ViewWorkloadDistributionModal";

interface DisciplineListItemProps {
    discipline: ResponseDiscipline;
}

const WorkloadDisciplineListItem: FC<DisciplineListItemProps> = ({discipline}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Stack
            p={4}
            bg="#EBECEA"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="brand.300"
            borderRadius="lg"
            gap={4}
            direction="row"
            onClick={onOpen}
            cursor="pointer"
        >
            <Flex w="100%" alignItems="center" justify="space-between">
                <Tooltip label={
                    <List>
                        <ListItem>
                            Лекційні години: {discipline.academic_workload.lecture_hours}
                        </ListItem>
                        <ListItem>
                            Групові/семінарські години: {discipline.academic_workload.group_hours}
                        </ListItem>
                        <ListItem>
                            Практичні/лабораторні години: {discipline.academic_workload.practical_hours}
                        </ListItem>
                        <ListItem>
                            Години на консультації: {discipline.academic_workload.consultation_hours}
                        </ListItem>
                        <ListItem>
                            Години на перевірку МКР та РГР: {discipline.academic_workload.control_works_checking_hours}
                        </ListItem>
                    </List>
                }>
                    <span><b>Назва дисципліни:</b> {discipline.discipline_name}</span>
                </Tooltip>

                <Flex gap={2} alignItems="center">
                    <Tag colorScheme="green" size="lg">
                        {(Object.values(discipline.academic_workload).reduce((acc, hours) =>
                            typeof hours === "number" ? acc + hours : acc, 0
                        )).toFixed(2)}
                    </Tag>
                    <b>годин</b>
                </Flex>
            </Flex>

            <ViewWorkloadDistributionModal
                isOpen={isOpen}
                onClose={onClose}
                discipline={discipline}
            />
        </Stack>
    );
};

export default WorkloadDisciplineListItem;
