import {FC, useCallback, useEffect, useState} from "react";
import {Box, Button, Heading, Stack, useDisclosure} from "@chakra-ui/react";

import departmentService from "entities/department/services/department.service";
import {TeacherService} from "entities/teacher";
import {useAuth} from "app/provider";
import {Teacher} from "entities/teacher/types/teacher.type";

import {Loader} from "components/UI";
import TeacherList from "../TeacherList/TeacherList";
import CreateTeacher from "../OverlayComponents/CreateTeacher";

const TeacherWrapper: FC = () => {
    const {department} = useAuth();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isTeacherLoading, setIsTeacherLoading] = useState<boolean>(true);

    const fetchTeachersByDepartmentId = useCallback(async (departmentId: string) => {
        const teachersData: Teacher[] = await departmentService.getTeachersByDepartmentId(departmentId);
        setTeachers(teachersData);
    }, []);

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

    const handleEditTeacher = (updatedTeacher: Teacher) => {
        setTeachers(prevTeachers =>
            prevTeachers.map(teacher => teacher.id === updatedTeacher.id ? updatedTeacher : teacher)
        );
    };

    const handleDeleteTeacher = (teacherId: string) => {
        const updatedTeachers = teachers.filter(teacher => teacher.id !== teacherId);
        setTeachers(updatedTeachers);
    };

    useEffect(() => {
        if (department) {
            fetchTeachersByDepartmentId(department.id).then()
                .finally(() => setIsTeacherLoading(false));
        } else {
            setIsTeacherLoading(false);
        }
    }, [department, fetchTeachersByDepartmentId]);

    if (isTeacherLoading) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    if (!department) {
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
            <TeacherList teachers={teachers} onEdit={handleEditTeacher} onDelete={handleDeleteTeacher}/>
            <Button
                mt={5}
                bottom={2}
                bg="brand.800"
                position="sticky"
                colorScheme="brand"
                onClick={onOpen}
            >
                Додати
            </Button>
            <CreateTeacher
                departmentId={department.id}
                isOpen={isOpen}
                onClose={onClose}
                onCreate={handleCreateTeacher}
            />
        </Stack>
    );
};

export default TeacherWrapper;
