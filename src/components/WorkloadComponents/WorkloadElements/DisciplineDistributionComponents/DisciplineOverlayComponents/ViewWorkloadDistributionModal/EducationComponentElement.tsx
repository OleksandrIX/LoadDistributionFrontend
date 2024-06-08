import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {
    Box,
    Flex,
    Heading,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Skeleton,
    Stack,
    StackDivider,
    Text,
    UnorderedList,
    useToast
} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {displayToast} from "utils/toast";
import {
    AcademicWorkloadService,
    RequestAcademicWorkload,
    ResponseEducationComponentWithRelationships
} from "entities/discipline";
import {TeacherDistributionWorkload} from "entities/teacher";
import {WorkloadDistributionSession} from "types/workload.distribution.session";

interface EducationComponentElementProps {
    educationComponent: ResponseEducationComponentWithRelationships;
    teachers: TeacherDistributionWorkload[];
}

interface TeacherMap {
    [key: string]: TeacherDistributionWorkload | null;
}

const EducationComponentElement: FC<EducationComponentElementProps> = ({educationComponent, teachers}) => {
    const {refreshToken} = useAuth();

    const idWorkloadToast = "workload-education-component-toast";
    const workloadToast = useToast({id: idWorkloadToast});

    const [totalAcademicWorkload, setTotalAcademicWorkload] = useState<RequestAcademicWorkload>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [selectedTeacherForGroup, setSelectedTeacherForGroup] = useState<TeacherMap>(
        educationComponent.study_groups.reduce<TeacherMap>((acc, group) => {
            acc[group.group_code] = null;
            return acc;
        }, {})
    );

    const fetchTotalAcademicWorkload = useCallback(async () => {
        const academicWorkloadService = new AcademicWorkloadService();
        try {
            const responseTotalAcademicWorkload = await academicWorkloadService
                .calculationAcademicWorkloadForEducationComponent(
                    "without-lecture-workload",
                    educationComponent.id
                );
            setTotalAcademicWorkload(responseTotalAcademicWorkload);
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, workloadToast, idWorkloadToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі",
                        409: "Невідомий тип навантаження"
                    });
                }
            } else {
                console.error(err);
            }
        }
    }, [refreshToken, workloadToast, educationComponent.id]);

    const handleSelectTeacherForGroup = async (group: string, selectedTeacher: TeacherDistributionWorkload) => {
        const academicWorkloadService = new AcademicWorkloadService();
        const studyGroup = educationComponent.study_groups.find(studyGroup => studyGroup.group_code === group);
        try {
            if (studyGroup) {
                const responseAcademicWorkload = await academicWorkloadService
                    .calculationAcademicWorkloadForEducationComponent(
                        "study-group-workload",
                        educationComponent.id,
                        studyGroup.id
                    );

                const workloadDistributionSessionString = localStorage.getItem("distribution_session");
                if (workloadDistributionSessionString) {
                    const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);

                    for (const distributedDiscipline of workloadDistributionSession.distributed_disciplines) {
                        for (const courseStudyKey in distributedDiscipline.course_study) {
                            const courseStudy = distributedDiscipline.course_study[courseStudyKey];
                            const distributedEducationComponent = courseStudy.education_components
                                .find((distributedEducationComponent) =>
                                    educationComponent.id === distributedEducationComponent.id
                                );

                            if (distributedEducationComponent) {
                                Object.keys(selectedTeacher.academic_workload).forEach((key) => {
                                    selectedTeacher.academic_workload[key] = 0;
                                });

                                Object.keys(responseAcademicWorkload).forEach((key) => {
                                    selectedTeacher.academic_workload[key] += responseAcademicWorkload[key];
                                });

                                distributedEducationComponent.teacher_per_study_group[group] = selectedTeacher;
                            }
                        }
                    }

                    localStorage.setItem("distribution_session", JSON.stringify(workloadDistributionSession));
                }

                setSelectedTeacherForGroup(prevState => ({
                    ...prevState,
                    [group]: selectedTeacher
                }));
            } else {
                displayToast(workloadToast, idWorkloadToast, {
                    status: "error",
                    title: "Групи не знайдено"
                });
            }
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, workloadToast, idWorkloadToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі",
                        409: "Невідомий тип навантаження"
                    });
                }
            } else {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchTotalAcademicWorkload().finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const workloadDistributionSessionString = localStorage.getItem("distribution_session");
            if (workloadDistributionSessionString) {
                const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);

                for (const distributedDiscipline of workloadDistributionSession.distributed_disciplines) {
                    for (const courseStudyKey in distributedDiscipline.course_study) {
                        const courseStudy = distributedDiscipline.course_study[courseStudyKey];
                        const distributedEducationComponent = courseStudy.education_components
                            .find((distributedEducationComponent) =>
                                educationComponent.id === distributedEducationComponent.id
                            );

                        if (distributedEducationComponent) {
                            for (const teacherPerStudyGroupKey in distributedEducationComponent.teacher_per_study_group) {
                                const teacherForGroup = distributedEducationComponent.teacher_per_study_group[teacherPerStudyGroupKey];
                                setSelectedTeacherForGroup(prevState => ({
                                    ...prevState,
                                    [teacherPerStudyGroupKey]: teacherForGroup
                                }));
                            }
                        }
                    }
                }
            }
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <Stack spacing={2}>
                <Skeleton h={15}/>
                <Skeleton h={15}/>
                <Skeleton h={15}/>
                <Skeleton h={15}/>
            </Stack>
        );
    }

    return (
        <Stack spacing={2}>
            <Heading size="md">
                Освітня компонента:
                <Text as="span" fontStyle="italic"
                      fontWeight="normal"> {educationComponent.education_component_code}</Text>,
                рівень освіти:
                <Text as="span" fontStyle="italic"
                      fontWeight="normal"> {educationComponent.education_degree}</Text>
            </Heading>

            <Heading size="md">
                Спеціалізація:
                <Text as="span" fontStyle="italic" fontWeight="normal"
                > {educationComponent.specialization.specialization_code} - {educationComponent.specialization.specialization_name}</Text>
            </Heading>

            <Heading size="md">
                Навчальні групи:
                <Text as="span" fontStyle="italic"
                      fontWeight="normal"> {educationComponent.study_groups.length}</Text>,
                Загальна кількість здобувачів освіти:
                <Text as="span" fontStyle="italic" fontWeight="normal"
                > {educationComponent.study_groups.reduce((acc, group) => acc + group.number_listeners, 0)}</Text>
            </Heading>

            <Box>
                <UnorderedList pl={2}>
                    {educationComponent.study_groups.map((group) =>
                        <ListItem key={`group_${group.group_code}`} fontSize="larger">
                            Група:
                            <Text as="span" fontStyle="italic"> {group.group_code}</Text>,
                            кількість здобувачів:
                            <Text as="span" fontStyle="italic"> {group.number_listeners}</Text>
                        </ListItem>
                    )}
                </UnorderedList>
            </Box>

            <Stack
                p={5}
                borderWidth="1px"
                borderStyle="solid"
                borderColor="brand.300"
                borderRadius="lg"
                divider={<StackDivider h="1px" bg="brand.200"/>}
            >
                {educationComponent.semesters.map((semester) => (
                    <Stack
                        key={semester.id}
                        direction="row"
                        alignItems="start"
                        spacing={4}
                        divider={<StackDivider w="1px" bg="brand.200"/>}
                    >
                        <Stack spacing={2}>
                            <Heading size="md">
                                Семестр:
                                <Text as="span" fontWeight="normal"
                                      fontStyle="italic"> {semester.semester_number}</Text>
                            </Heading>
                            <Heading size="md">
                                Загальна кількість годин:
                                <Text as="span" fontWeight="normal"
                                      fontStyle="italic"> {semester.total_amount_hours}</Text>,
                                Тип звітності:
                                <Text as="span" fontWeight="normal"
                                      fontStyle="italic"> {semester.reporting_type}</Text>
                            </Heading>

                            <Flex align="start" gap={5}>
                                <Stack>
                                    <Heading size="md">Навчальні години</Heading>
                                    <UnorderedList pl={2} fontSize="larger">
                                        <ListItem>
                                            Групові/семінарські години: {semester.academic_hours.group_hours}
                                        </ListItem>
                                        <ListItem>
                                            Практичні/лабараторні
                                            години: {semester.academic_hours.practical_hours}
                                        </ListItem>
                                    </UnorderedList>
                                </Stack>

                                <Stack>
                                    <Heading size="md">Навчальні завдання</Heading>
                                    <UnorderedList pl={2} fontSize="larger">
                                        <ListItem>
                                            Рефератів: {semester.academic_task.essays}
                                        </ListItem>
                                        <ListItem>
                                            Курсових робіт: {semester.academic_task.term_papers}
                                        </ListItem>
                                        <ListItem>
                                            Модульні контрольні
                                            роботи: {semester.academic_task.modular_control_works}
                                        </ListItem>
                                        <ListItem>
                                            Розрахунково-графічні
                                            роботи: {semester.academic_task.calculation_graphic_works}
                                        </ListItem>
                                    </UnorderedList>
                                </Stack>
                            </Flex>

                            {totalAcademicWorkload && (
                                <Stack>
                                    <Heading size="md">Навчальне навантаження</Heading>
                                    <UnorderedList pl={2} fontSize="larger">
                                        <ListItem>
                                            Групове/семінарське
                                            навантаження: {totalAcademicWorkload.group_hours} годин
                                        </ListItem>
                                        <ListItem>
                                            Практичне/лабараторне
                                            навантаження: {totalAcademicWorkload.practical_hours} годин
                                        </ListItem>
                                        <ListItem>
                                            Проведення
                                            консультацій: {totalAcademicWorkload.consultation_hours.toFixed(2)} годин
                                        </ListItem>
                                        <ListItem>
                                            Керівництво і проведення захисту курсових робіт
                                            : {totalAcademicWorkload.term_papers_conducting_hours.toFixed(2)} годин
                                        </ListItem>
                                        <ListItem>
                                            Перевірка МКР та
                                            РГР: {totalAcademicWorkload.control_works_checking_hours.toFixed(2)} годин
                                        </ListItem>
                                        <ListItem>
                                            Проведення диференційованих
                                            заліків: {totalAcademicWorkload.graded_tests_conducting_hours.toFixed(2)} годин
                                        </ListItem>
                                        <ListItem>
                                            Проведення семестрових
                                            іспитів: {totalAcademicWorkload.exams_conducting_hours.toFixed(2)} годин
                                        </ListItem>
                                    </UnorderedList>
                                    <Heading size="md">Загальна кількість годин: <span
                                        style={{fontStyle: "italic"}}>
                                        {Object.values(totalAcademicWorkload)
                                            .reduce((acc, hours) => acc + hours, 0)
                                            .toFixed(2)}
                                        </span>
                                    </Heading>
                                </Stack>
                            )}
                        </Stack>
                        <Stack>
                            {educationComponent.study_groups.map((group) =>
                                <Flex key={group.id} alignItems="center" gap={4}>
                                    <Heading size="sm">Виберіть викладача для {group.group_code} навчальної
                                        групи:</Heading>
                                    <Menu>
                                        <MenuButton
                                            p={2}
                                            borderWidth="1px"
                                            borderStyle="solid"
                                            borderColor="brand.300"
                                            borderRadius="lg"
                                            w="250px" h="50px"
                                            cursor="pointer"
                                            textAlign="center"
                                            lineHeight="1.5rem"
                                        >
                                            {selectedTeacherForGroup[group.group_code] ? (
                                                <Text>
                                                    <Text as="strong"
                                                    >{selectedTeacherForGroup[group.group_code]!.last_name} </Text>
                                                    <Text as="strong">
                                                        {selectedTeacherForGroup[group.group_code]!.first_name.at(0)}.
                                                    </Text>
                                                    <Text as="strong">
                                                        {selectedTeacherForGroup[group.group_code]!.middle_name.at(0)}.
                                                    </Text>
                                                </Text>
                                            ) : (
                                                <Text as="strong">Вибрати викладача</Text>
                                            )}
                                        </MenuButton>
                                        <MenuList>
                                            {teachers.map((teacher) =>
                                                <MenuItem
                                                    key={teacher.id}
                                                    onClick={() => handleSelectTeacherForGroup(group.group_code, teacher)}
                                                >
                                                    {teacher.last_name} {teacher.first_name} {teacher.middle_name}
                                                </MenuItem>
                                            )}
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            )}
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
};

export default EducationComponentElement;
