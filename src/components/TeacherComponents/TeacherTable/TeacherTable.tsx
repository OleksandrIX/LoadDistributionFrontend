import {FC, useMemo} from "react";
import {Column, Row} from "react-table";
import {Box, Heading, Td, Tooltip} from "@chakra-ui/react";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";

import {Position} from "types/enums";
import {Teacher} from "entities/teacher/types/teacher.type";
import {TableLayout} from "components/LayoutComponents";
import TeacherTableRow from "./TeacherTableRow";

interface TeacherTableProps {
    teachers: Teacher[];
    onEdit: (teacher: Teacher) => void;
    onDelete: (teacherId: string) => void;
}

const TeacherTable: FC<TeacherTableProps> = ({teachers, onEdit, onDelete}) => {
    const columns: Column<Teacher>[] = useMemo(() => [
        {
            Header: "ПІБ",
            accessor: (row) => `${row.last_name} ${row.first_name} ${row.middle_name}`,
            width: "45%",
            Cell: ({value}: { value: string }) => (
                <Td overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap">
                    <Tooltip label={value}>
                        {value}
                    </Tooltip>
                </Td>
            )
        },
        {
            Header: "Ставка",
            accessor: "teacher_rate",
            width: "15%",
            Cell: ({value}: { value: number }) => <Td textAlign="center">{value}</Td>
        },
        {
            Header: "Посада",
            accessor: "position",
            width: "20%",
            Cell: ({value}: { value: Position }) => (
                <Td textAlign="center"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap">
                    <Tooltip label={value}>
                        {value}
                    </Tooltip>
                </Td>
            )
        },
        {
            Header: "Цивільний",
            accessor: "is_civilian",
            width: "20%",
            Cell: ({value}: { value: boolean }) => (
                <Td align="center" textAlign="revert-layer">
                    {value
                        ? <Box w="fit-content"
                               p={1}
                               borderRadius="lg"
                               borderWidth={1}
                               borderStyle="solid"
                               borderColor="green.500">
                            <CheckIcon color="green.500"/>
                        </Box>
                        : <Box w="fit-content"
                               p={1}
                               borderRadius="lg"
                               borderWidth={1}
                               borderStyle="solid"
                               borderColor="red.500">
                            <CloseIcon color="red.500"/>
                        </Box>}
                </Td>
            )
        }
    ], []);

    if (teachers.length > 0) {
        return (
            <TableLayout
                data={teachers}
                columns={columns}
                RowComponent={({row}: { row: Row<Teacher> }) => (
                    <TeacherTableRow
                        row={row}
                        teacher={row.original}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                )}
            />
        );
    } else {
        return (
            <Box
                h="100%"
                mt="10%"
                display="flex"
                alignItems="start"
                justifyContent="center"
            >
                <Heading
                    px={10} py={1}
                    size="md"
                    textAlign="center"
                    borderWidth="1px"
                    borderColor="brand.200"
                    borderStyle="solid"
                    borderRadius="lg"
                    fontStyle="italic"
                >Немає жодного викладача</Heading>
            </Box>
        );
    }
};

export default TeacherTable;
