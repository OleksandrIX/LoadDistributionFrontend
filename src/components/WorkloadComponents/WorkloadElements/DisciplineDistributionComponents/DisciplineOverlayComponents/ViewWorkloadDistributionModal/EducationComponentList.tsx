import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {
    Box,
    ButtonGroup,
    Flex,
    Heading,
    IconButton,
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
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {
    AcademicWorkloadService,
    DisciplineDistributionWorkload,
    RequestAcademicWorkload,
    defaultAcademicWorkload
} from "entities/discipline";
import EducationComponentElement from "./EducationComponentElement";
import {TeacherDistributionWorkload} from "entities/teacher";
import {WorkloadDistributionSession} from "types/workload.distribution.session";

interface EducationComponentElementProps {
    discipline: DisciplineDistributionWorkload;
    teachers: TeacherDistributionWorkload[];
}

const EducationComponentList: FC<EducationComponentElementProps> = ({discipline, teachers}) => {
    const educationComponents = discipline.education_components;
    const idWorkloadToast = "workload-education-components-toast";

    const {refreshToken} = useAuth();
    const workloadToast = useToast({id: idWorkloadToast});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [courseStudyArray, setCourseStudyArray] = useState<number[]>([]);
    const [courseStudyIndex, setCourseStudyIndex] = useState<number>(0);

    const [lectureWorkload, setLectureWorkload] = useState<RequestAcademicWorkload>({...defaultAcademicWorkload});

    const [selectedLecture, setSelectedLecture] = useState<TeacherDistributionWorkload | null>(null);

    const getPossibleCourseStudy = useCallback(() => {
        const possibleCourseStudy: number[] = [];
        for (const educationComponent of educationComponents) {
            !possibleCourseStudy.includes(educationComponent.course_study)
            && possibleCourseStudy.push(educationComponent.course_study);
        }
        possibleCourseStudy.sort();
        setCourseStudyArray(possibleCourseStudy);
    }, [educationComponents]);

    const fetchAcademicWorkloadForEducationComponents = useCallback(async () => {
        const academicWorkloadService = new AcademicWorkloadService();
        try {
            const educationComponentIds = educationComponents.map((educationComponent) => educationComponent.id);
            const responseLectureWorkload = await academicWorkloadService
                .calculationAcademicWorkloadForEducationComponents("lecture-workload", educationComponentIds);
            setLectureWorkload(responseLectureWorkload);
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                console.log(err);
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
    }, [educationComponents, refreshToken, workloadToast]);

    const handleSelectLecture = (selectedTeacher: TeacherDistributionWorkload) => {
        const workloadDistributionSessionString = localStorage.getItem("distribution_session");
        if (workloadDistributionSessionString) {
            const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);

            for (const distributedDiscipline of workloadDistributionSession.distributed_disciplines) {
                if (distributedDiscipline.discipline_name === discipline.discipline_name) {
                    Object.keys(selectedTeacher.academic_workload).forEach((key) => {
                        selectedTeacher.academic_workload[key] = 0;
                    });

                    Object.keys(lectureWorkload).forEach((key) => {
                        selectedTeacher.academic_workload[key] += lectureWorkload[key];
                    });

                    distributedDiscipline.course_study[courseStudyArray[courseStudyIndex]].lecture = selectedTeacher;
                }
            }

            localStorage.setItem("distribution_session", JSON.stringify(workloadDistributionSession));
        }
        setSelectedLecture(selectedTeacher);
    };

    useEffect(() => {
        getPossibleCourseStudy();
        fetchAcademicWorkloadForEducationComponents().finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const workloadDistributionSessionString = localStorage.getItem("distribution_session");
            if (workloadDistributionSessionString) {
                const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);
                const distributedDiscipline = workloadDistributionSession.distributed_disciplines
                    .find((distributedDiscipline) => distributedDiscipline.discipline_name === discipline.discipline_name);
                setSelectedLecture(
                    distributedDiscipline
                        ? distributedDiscipline.course_study[courseStudyArray[courseStudyIndex]].lecture
                        : null
                );
            }
        }
    }, [isLoading, courseStudyIndex]);

    if (isLoading) return <Skeleton h={50}/>;

    return (
        <Stack>
            {courseStudyArray.length !== 1 && (
                <ButtonGroup px={10} justifyContent="space-between">
                    <IconButton
                        w="20%"
                        colorScheme="brand"
                        aria-label="Попередня сторінка"
                        icon={<ChevronLeftIcon h={6} w={6}/>}
                        isDisabled={courseStudyIndex === 0}
                        onClick={() => courseStudyIndex !== 0 && setCourseStudyIndex(courseStudyIndex - 1)}
                    />

                    <IconButton
                        w="20%"
                        colorScheme="brand"
                        aria-label="Наступна сторінка"
                        icon={<ChevronRightIcon h={6} w={6}/>}
                        isDisabled={courseStudyIndex === courseStudyArray.length - 1}
                        onClick={() => courseStudyIndex !== courseStudyArray.length - 1
                            && setCourseStudyIndex(courseStudyIndex + 1)}
                    />
                </ButtonGroup>
            )}

            <Heading size="lg" textAlign="center">
                <u><i>{courseStudyArray[courseStudyIndex]}</i></u> курс навчання
            </Heading>

            <Stack flex={1} p={2} spacing={4} divider={<StackDivider h="1px" bg="brand.300"/>}>
                <Box>
                    <Stack
                        p={5}
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="brand.300"
                        borderRadius="lg"
                        direction="row"
                        alignItems="start"
                        spacing={4}
                        divider={<StackDivider w="1px" bg="brand.300"/>}
                    >
                        <Stack>
                            <Flex gap={2}>
                                <Heading size="md">
                                    Лекційні потоки:
                                    <Text as="span" fontWeight="normal" fontStyle="italic"
                                    > {Math.ceil(educationComponents.reduce((acc, educationComponent) =>
                                        acc + educationComponent.study_groups.reduce((acc, group) =>
                                            acc + group.number_listeners, 0), 0) / 100)}
                                    </Text>,
                                </Heading>
                                <Heading size="md">
                                    Загальна кількість здобувачів освіти:
                                    <Text as="span" fontWeight="normal" fontStyle="italic"
                                    > {educationComponents.reduce((acc, educationComponent) =>
                                        acc + educationComponent.study_groups.reduce((acc, group) =>
                                            acc + group.number_listeners, 0), 0)}
                                    </Text>
                                </Heading>
                            </Flex>

                            <Heading size="md">
                                Лекційні години:
                                <Text as="span" fontWeight="normal" fontStyle="italic"
                                > {educationComponents[0].semesters[0].academic_hours.lecture_hours}</Text>
                            </Heading>

                            {lectureWorkload && (
                                <Box>
                                    <Heading size="md">
                                        Навчальне навантаження:
                                    </Heading>

                                    <UnorderedList pl={2} fontSize="larger">
                                        <ListItem>
                                            Лекційне навантаження:
                                            <Text as="span" fontWeight="normal" fontStyle="italic"
                                            > {lectureWorkload.lecture_hours} </Text>
                                            годин
                                        </ListItem>
                                        <ListItem>
                                            Проведення консультацій:
                                            <Text as="span" fontWeight="normal" fontStyle="italic"
                                            > {lectureWorkload.consultation_hours} </Text>
                                            годин
                                        </ListItem>
                                    </UnorderedList>

                                    <Heading size="md">
                                        Загальна кількість годин:
                                        <Text as="i"
                                        > {Object.values(lectureWorkload).reduce((acc, hours) => acc + hours, 0)
                                            .toFixed(2)}
                                        </Text>
                                    </Heading>
                                </Box>
                            )}
                        </Stack>

                        <Stack>
                            <Box>
                                <Heading size="md" textAlign="center">Виберіть лектора</Heading>
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
                                        {selectedLecture ? (
                                            <Text>
                                                <Text as="strong">{selectedLecture.last_name} </Text>
                                                <Text as="strong">{selectedLecture.first_name.at(0)}.</Text>
                                                <Text as="strong">{selectedLecture.middle_name.at(0)}.</Text>
                                            </Text>
                                        ) : (
                                            <Text as="strong">Вибрати викладача</Text>
                                        )}
                                    </MenuButton>
                                    <MenuList>
                                        {teachers
                                            .map((teacher) =>
                                                <MenuItem key={teacher.id}
                                                          onClick={() => handleSelectLecture(teacher)}>
                                                    {teacher.last_name} {teacher.first_name} {teacher.middle_name}
                                                </MenuItem>
                                            )}
                                    </MenuList>
                                </Menu>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>

                {educationComponents
                    .sort((a, b) => a.course_study - b.course_study)
                    .filter((educationComponent) => educationComponent.course_study === courseStudyArray[courseStudyIndex])
                    .map((educationComponent) =>
                        <EducationComponentElement
                            key={educationComponent.id}
                            educationComponent={educationComponent}
                            teachers={teachers}
                        />
                    )}
            </Stack>
        </Stack>
    );
};

export default EducationComponentList;
