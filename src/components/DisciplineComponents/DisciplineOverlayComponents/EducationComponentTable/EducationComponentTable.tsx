import {FC, Fragment, useCallback, useMemo} from "react";
import {Column, Row} from "react-table";
import {Box, Flex, Heading, List, ListItem, Stack, StackDivider, Td, Text, Tooltip, Tr} from "@chakra-ui/react";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/modal";

import {TableLayout} from "components/LayoutComponents";
import {ResponseDiscipline, ResponseEducationComponentWithRelationships} from "entities/discipline";
import {ResponseSpecialization} from "entities/specialization";
import {ResponseStudyGroup} from "entities/group";

interface EducationComponentTableProps {
    isOpen: boolean;
    onClose: () => void;
    discipline: ResponseDiscipline;
}

const EducationComponentTable: FC<EducationComponentTableProps> = ({isOpen, onClose, discipline}) => {
    const columns: Column<ResponseEducationComponentWithRelationships>[] = useMemo(() => [
        {
            Header: "Код ОК",
            accessor: "education_component_code",
            enableRowSpan: true,
            Cell: ({value}: { value: string }) => (
                <Td p={0} textAlign="center" verticalAlign="middle">
                    {value}
                </Td>
            )
        },
        {
            Header: "Спеціалізація",
            accessor: "specialization",
            enableRowSpan: true,
            Cell: ({value}: { value: ResponseSpecialization }) => (
                <Td
                    textAlign="center"
                    verticalAlign="middle"
                    fontSize="xs"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                >
                    <Tooltip label={value.specialization_name}>
                        <span>{value.specialization_name}</span>
                    </Tooltip>
                </Td>
            )
        },
        {
            Header: "Кількість груп",
            accessor: "study_groups",
            enableRowSpan: true,
            Cell: ({value}: { value: ResponseStudyGroup[] }) => (
                <Td
                    textAlign="center"
                    verticalAlign="middle"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                >
                    <Tooltip label={value.map((group) =>
                        <p key={group.id}>{group.group_code} група - {group.number_listeners} слухачів</p>
                    )}>
                        <p>
                            {value.length} групи,
                            <span> </span>
                            {value.reduce((acc, group) => acc + group.number_listeners, 0)} слухачів
                        </p>
                    </Tooltip>
                </Td>
            )
        }
    ], []);

    const renderRowSubComponent = useCallback(
        ({row}: { row: Row<ResponseEducationComponentWithRelationships> }) => (
            <Stack
                w="300%"
                spacing={8}
                px={4} my={2}
                borderWidth={1}
                borderStyle="solid"
                borderColor="brand.300"
                borderRadius="lg"
                divider={<StackDivider h="1px" bg="brand.200"/>}
            >
                {row.original.semesters.map((semester) => (
                    <Flex key={semester.id} p={3} alignItems="center" justifyContent="center">
                        <Box w="100%">
                            <Text><b>Номер семестру: </b> {semester.semester_number}</Text>
                            <Text><b>Загальна кількість годин: </b> {semester.total_amount_hours}</Text>
                            <Text><b>Тип
                                звітності: </b> {semester.reporting_type ? semester.reporting_type : "Немає"}
                            </Text>
                        </Box>
                        <Box w="100%">
                            <Heading size="sm">Академічні години</Heading>
                            <List>
                                <ListItem>Лекційні: {semester.academic_hours.lecture_hours} годин</ListItem>
                                <ListItem>Групові: {semester.academic_hours.group_hours} годин</ListItem>
                                <ListItem>Практичні: {semester.academic_hours.practical_hours} годин</ListItem>
                                <ListItem>Самостійні: {semester.academic_hours.self_study_hours} годин</ListItem>
                            </List>
                        </Box>
                        <Box w="100%">
                            <Heading size="sm">Академічні завдання</Heading>
                            <List>
                                <ListItem>Курсові роботи: {semester.academic_task.term_papers}</ListItem>
                                <ListItem>Рефератів: {semester.academic_task.essays}</ListItem>
                                <ListItem>МКР: {semester.academic_task.modular_control_works}</ListItem>
                                <ListItem>РГР: {semester.academic_task.calculation_graphic_works}</ListItem>
                            </List>
                        </Box>
                    </Flex>
                ))}
            </Stack>
        ), []
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Освітні компоненти &quot;{discipline.discipline_name}&quot;</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <TableLayout
                        data={discipline.education_components}
                        columns={columns}
                        RowComponent={({row}: { row: Row<ResponseEducationComponentWithRelationships> }) => (
                            <Fragment {...row.getRowProps()}>
                                <Tr {...row.getToggleRowExpandedProps()}>
                                    {row.cells.map((cell) =>
                                        <Fragment key={cell.getCellProps().key}>
                                            {cell.render("Cell")}
                                        </Fragment>
                                    )}
                                </Tr>

                                {row.isExpanded ? renderRowSubComponent({row}) : null}
                            </Fragment>
                        )}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EducationComponentTable;
