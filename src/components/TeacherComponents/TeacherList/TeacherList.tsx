import {FC} from "react";
import {Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/table";

import {Teacher} from "entities/teacher/types/teacher.type";
import TeacherRowData from "./TeacherRowData";

interface TeacherListProps {
    teachers: Teacher[];
    onEdit: (teacher: Teacher) => void;
    onDelete: (teacherId: string) => void;
}

const TeacherList: FC<TeacherListProps> = ({teachers, onEdit, onDelete}) => {
    return (
        <TableContainer>
            <Table size="sm" mt={2} colorScheme="brand">
                <Thead>
                    <Tr>
                        <Th fontSize="0.9rem">ПІБ</Th>
                        <Th fontSize="0.9rem">Ставка</Th>
                        <Th fontSize="0.9rem">Посада</Th>
                        <Th fontSize="0.9rem" textAlign="center">Цивільний</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {teachers.map((teacher) =>
                        <TeacherRowData key={teacher.id} teacher={teacher} onEdit={onEdit} onDelete={onDelete}/>)}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default TeacherList;
