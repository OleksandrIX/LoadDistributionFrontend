import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Box, Button, Heading, Stack, useDisclosure, useToast} from "@chakra-ui/react";

import {handleAxiosError} from "utils/error.handlers";
import {DepartmentService, DepartmentWithTeachers} from "entities/department";
import {TeacherService} from "entities/teacher";
import {useAuth} from "app/provider";
import {ResponseTeacher} from "entities/teacher/types/teacher.type";

import {Loader} from "components/UI";
import TeacherTable from "../TeacherTable/TeacherTable";
import CreateTeacher from "../TeacherOverlayComponents/CreateTeacher";

const TeacherWrapper: FC = () => {
    const idTeacherToast = "teacher-toast";
    const teacherToast = useToast({id: idTeacherToast});
    const {isAdmin, department, refreshToken} = useAuth();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [teachers, setTeachers] = useState<ResponseTeacher[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleCreateTeacher = (teacherId: string) => {
        const teacherService = new TeacherService();
        teacherService.getTeacherById(teacherId)
            .then((res) => {
                setTeachers([...teachers, res]);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleEditTeacher = (updatedTeacher: ResponseTeacher) => {
        setTeachers(prevTeachers =>
            prevTeachers.map(teacher => teacher.id === updatedTeacher.id ? updatedTeacher : teacher)
        );
    };

    const handleDeleteTeacher = (teacherId: string) => {
        const updatedTeachers = teachers.filter(teacher => teacher.id !== teacherId);
        setTeachers(updatedTeachers);
    };

    const fetchTeachers = useCallback(async () => {
        try {
            const departmentService = new DepartmentService();
            const teacherService = new TeacherService();

            if (!isAdmin) {
                if (department) {
                    const responseDepartment: DepartmentWithTeachers =
                        await departmentService.getDepartmentByIdWithTeachers(department.id);
                    setTeachers(responseDepartment.teachers);
                }
            } else {
                const responseTeachers = await teacherService.getAllTeachers();
                setTeachers(responseTeachers);
            }
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, teacherToast, idTeacherToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        } finally {
            setIsLoading(false);
        }
    }, [isAdmin, department, teacherToast, refreshToken]);

    useEffect(() => {
        fetchTeachers().then();
    }, []);

    if (isLoading) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    if (!department && !isAdmin) {
        return (
            <Box
                h="100%"
                mt="10%"
                display="flex"
                alignItems="start"
                justifyContent="center"
            >
                <Heading
                    px={5} py={1}
                    size="md"
                    textAlign="center"
                    borderWidth="1px"
                    borderColor="brand.200"
                    borderStyle="solid"
                    borderRadius="lg"
                    fontStyle="italic"
                >Вам ще не призначили кафедру</Heading>
            </Box>
        );
    }

    return (
        <Stack direction="column">
            <Button
                mb={5}
                top={2}
                position="sticky"
                colorScheme="brand"
                onClick={onOpen}
            >
                Додати
            </Button>

            {teachers.length > 0
                ? <TeacherTable
                    teachers={teachers}
                    onEdit={handleEditTeacher}
                    onDelete={handleDeleteTeacher}
                />
                : <Box
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
                    >Викладачів немає</Heading>
                </Box>}

            {department && <CreateTeacher
                departmentId={department.id}
                isOpen={isOpen}
                onClose={onClose}
                onCreate={handleCreateTeacher}
            />}
        </Stack>
    );
};

export default TeacherWrapper;
