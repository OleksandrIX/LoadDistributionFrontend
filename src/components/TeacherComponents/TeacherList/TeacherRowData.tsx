import {FC} from "react";
import {Box, useToast} from "@chakra-ui/react";
import {Td, Tr} from "@chakra-ui/table";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";
import {useDisclosure} from "@chakra-ui/hooks";

import {Teacher, TeacherService} from "entities/teacher";
import ViewTeacher from "../OverlayComponents/ViewTeacher";
import EditTeacher from "../OverlayComponents/EditTeacher";
import DeleteTeacher from "../OverlayComponents/DeleteTeacher";
import TeacherRowContextMenu from "../ContextMenu/TeacherRowContextMenu";

interface TeacherRowDataProps {
    teacher: Teacher;
    onEdit: (teacher: Teacher) => void;
    onDelete: (teacherId: string) => void;
}

const TeacherRowData: FC<TeacherRowDataProps> = ({teacher, onEdit, onDelete}) => {
    const idEditTeacher = "edit-teacher-toast";
    const idDeleteTeacher = "delete-teacher-toast";
    const editToast = useToast({id: idEditTeacher});
    const deleteToast = useToast({id: idDeleteTeacher});

    const {isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView} = useDisclosure();
    const {isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit} = useDisclosure();
    const {isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete} = useDisclosure();

    const handelEditTeacher = (teacherData: Teacher) => {
        const teacherService = new TeacherService();
        teacherService.editTeacher(teacherData.id, teacherData)
            .then((updatedTeacher) => {
                onEdit(updatedTeacher);
                onCloseEdit();
                editToast.isActive(idEditTeacher)
                    ? editToast.update(idEditTeacher, {
                        title: "Дані викладача оновлено",
                        description: `Дані '${teacherData.first_name} ${teacherData.last_name}' усіпшо оновлено`,
                        status: "success"
                    })
                    : editToast({
                        title: "Дані викладача оновлено",
                        description: `Дані '${teacherData.first_name} ${teacherData.last_name}' усіпшо оновлено`,
                        status: "success"
                    });
            })
            .catch((err) => {
                console.log(err);
                const status = err.message === "Network Error" ? 503 : err.response.status;
                const errorMessages: Record<number, string> = {
                    404: "Такої кафедри не існує",
                    409: "Викладач з такими даними вже існує",
                    422: "Не валідні дані",
                    503: "503 - Сервер недоступний"
                };

                const errorMessage = errorMessages[status] || "Невідома помилка";
                editToast.isActive(idEditTeacher)
                    ? editToast.update(idEditTeacher, {title: errorMessage, status: "error"})
                    : editToast({title: errorMessage, status: "error"});
            });
    };

    const handelDeleteTeacher = () => {
        const teacherService = new TeacherService();
        teacherService.deleteTeacher(teacher.id)
            .then(() => {
                onDelete(teacher.id);
                onCloseDelete();
                deleteToast.isActive(idDeleteTeacher)
                    ? deleteToast.update(idDeleteTeacher, {
                        title: "Викладач видален",
                        description: `Викладач '${teacher.first_name} ${teacher.last_name}' успішно видалено`,
                        status: "success"
                    })
                    : deleteToast({
                        title: "Викладач видален",
                        description: `Викладач '${teacher.first_name} ${teacher.last_name}' успішно видалено`,
                        status: "success"
                    });

            })
            .catch((err) => {
                const status = err.message === "Network Error" ? 503 : err.response.status;
                const errorMessages: Record<number, string> = {
                    404: "Викладача не знайдено"
                };

                const errorMessage = errorMessages[status] || "Невідома помилка";
                console.log(errorMessage);
                deleteToast.isActive(idDeleteTeacher)
                    ? deleteToast.update(idDeleteTeacher, {title: errorMessage, status: "error"})
                    : deleteToast({title: errorMessage, status: "error"});
            });
    };

    return (
        <TeacherRowContextMenu
            onView={onOpenView}
            onEdit={onOpenEdit}
            onDelete={onOpenDelete}
        >
            {(ref) => (
                <Tr ref={ref}>
                    <Td>{teacher.last_name} {teacher.first_name} {teacher.middle_name}</Td>
                    <Td isNumeric>{teacher.teacher_rate}</Td>
                    <Td>{teacher.position}</Td>
                    <Td align="center" textAlign="revert-layer">
                        {teacher.is_civilian
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

                    <ViewTeacher
                        teacher={teacher}
                        isOpen={isOpenView}
                        onClose={onCloseView}
                    />
                    <EditTeacher
                        teacher={teacher}
                        isOpen={isOpenEdit}
                        onClose={onCloseEdit}
                        onEdit={handelEditTeacher}
                    />
                    <DeleteTeacher
                        isOpen={isOpenDelete}
                        onClose={onCloseDelete}
                        onDelete={handelDeleteTeacher}
                    />
                </Tr>
            )}
        </TeacherRowContextMenu>
    );
};

export default TeacherRowData;
