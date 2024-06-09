import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    Flex,
    IconButton,
    Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader,
    PopoverTrigger, Portal,
    Stack, Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle,
    useSteps
} from "@chakra-ui/stepper";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {displayToast} from "utils/toast";
import {DepartmentService} from "entities/department";
import {TeacherWrapper} from "components/TeacherComponents";
import {TeacherDistributionWorkload} from "entities/teacher";
import {defaultAcademicWorkload, DistributionSessionService} from "entities/discipline";
import {Loader} from "components/UI";
import {WorkloadStepperElement} from "./workload.stepper";
import {DisciplineWrapper, StartWrapper, ViewTeacherWorkload, WorkloadDiscplineWrapper} from "../WorkloadElements";
import {WorkloadDistributionSession, TeacherCorrectWorkload} from "types/workload.distribution.session";
import {getTotalAcademicWorkload} from "utils/academic.workload";

interface WorkloadStepperProps {
}

const WorkloadStepper: FC<WorkloadStepperProps> = () => {
    const idWorkloadTeacherToast = "workload-teacher-toast";
    const idWorkloadDistributionToast = "workload-distribution-toast";
    const workloadTeacherToast = useToast({id: idWorkloadTeacherToast});
    const workloadDistributionToast = useToast({id: idWorkloadDistributionToast});

    const {department, refreshToken} = useAuth();
    const [teachers, setTeachers] = useState<TeacherDistributionWorkload[]>([]);
    const [correctTeachers, setCorrectTeachers] = useState<TeacherCorrectWorkload[]>([]);
    const [steps, setSteps] = useState<WorkloadStepperElement[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isComplete, setIsComplete] = useState<boolean>(false);

    const {isOpen: isOpenTeacherModal, onOpen: onOpenTeacherModal, onClose: onCloseTeacherModal} = useDisclosure();
    const {activeStep, setActiveStep, goToNext, goToPrevious} = useSteps({
        index: 0,
        count: steps.length
    });

    const fetchTeachers = useCallback(async () => {
        const departmentService = new DepartmentService();
        try {
            if (department) {
                const {teachers: responseTeachers} = await departmentService.getDepartmentByIdWithTeachers(department.id);
                setTeachers(responseTeachers.map((teacher) => ({
                    ...teacher,
                    academic_workload: {...defaultAcademicWorkload}
                })));
            }
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, workloadTeacherToast, idWorkloadTeacherToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        }
    }, [department, workloadTeacherToast, refreshToken]);

    const saveDistributionSession = async () => {
        const distributionSessionService = new DistributionSessionService();
        try {
            const workloadDistributionSessionString = localStorage.getItem("distribution_session");
            if (workloadDistributionSessionString) {
                const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);
                await distributionSessionService.saveDistributionSession(workloadDistributionSession);
                displayToast(workloadDistributionToast, idWorkloadDistributionToast, {
                    status: "success",
                    title: "Дані про сесію збережено"
                });
            } else {
                displayToast(workloadDistributionToast, idWorkloadDistributionToast, {
                    status: "error",
                    title: "Даних про сесію не знайдено"
                });
            }
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, workloadDistributionToast, idWorkloadDistributionToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        }
    };

    const leavDistributionSession = async () => {
        const workloadDistributionSessionString = localStorage.getItem("distribution_session");
        if (workloadDistributionSessionString) {
            const isConfirmed = confirm("Ви покидаєте сесію розподілу. \nБажаєте зберегти дані про сесію?");
            if (isConfirmed) await saveDistributionSession();
            localStorage.removeItem("distribution_session");
            setActiveStep(0);
            setCorrectTeachers([]);
        }
    };

    useEffect(() => {
        fetchTeachers().finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setSteps([
                {
                    title: "Створення",
                    description: "Створення розподіу",
                    element: <StartWrapper setActiveStep={setActiveStep}/>
                },
                {
                    title: "Викладачі",
                    description: "Перегляд викладів кафедри",
                    element: <TeacherWrapper/>
                },
                {
                    title: "Дисципліни",
                    description: "Перегляд дисциплін кафедри",
                    element: <DisciplineWrapper/>
                },
                {
                    title: "Розподіл навантаження",
                    description: "Розподіл навчального навантаження",
                    element: <WorkloadDiscplineWrapper
                        teachers={teachers}
                        setTeachers={setTeachers}
                        setCorrectTeachers={setCorrectTeachers}
                        setIsComplete={setIsComplete}
                    />
                },
                {
                    title: "Збереження",
                    description: "Збереження",
                    element: <>Збереження</>
                }
            ]);
        }
    }, [isLoading]);

    useEffect(() => {
        const workloadDistributionSessionString = localStorage.getItem("distribution_session");
        if (workloadDistributionSessionString) {
            const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);
            if (workloadDistributionSession) {
                setActiveStep(workloadDistributionSession.step - 1);
            }
        }
    }, []);

    if (!steps.length) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    return (
        <Flex alignItems="start" gap={4}>
            <Stack position="sticky" top={10} mt={10} spacing={30}>
                <Stack>
                    <Stepper index={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={`step_${step.title}_${index}`}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon/>}
                                        incomplete={<StepNumber/>}
                                        active={<StepNumber/>}
                                    />
                                </StepIndicator>

                                <Box flexShrink="0">
                                    <StepTitle>{step.title}</StepTitle>
                                </Box>

                                <StepSeparator/>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep !== 0 && (
                        <ButtonGroup colorScheme="brand" px={2} justifyContent="space-between">
                            <IconButton
                                w="100%"
                                isDisabled={activeStep === 0}
                                onClick={goToPrevious}
                                aria-label="Попередній крок"
                                icon={<ChevronLeftIcon h={6} w={6}/>}
                            />

                            <IconButton
                                w="100%"
                                isDisabled={activeStep === 3 && !isComplete}
                                onClick={() => steps.length - 1 === activeStep
                                    ? alert("FINISHED")
                                    : goToNext()}
                                aria-label={steps.length - 1 === activeStep
                                    ? "Завершити"
                                    : "Наступний крок"}
                                icon={steps.length - 1 === activeStep
                                    ? <CheckCircleIcon h={6} w={6}/>
                                    : <ChevronRightIcon h={6} w={6}/>}
                            />
                        </ButtonGroup>
                    )}

                    {activeStep !== 0 &&
                        <Button colorScheme="brand" onClick={leavDistributionSession}>Покинути сесію</Button>}

                    {activeStep >= 3 &&
                        <Button colorScheme="brand" onClick={saveDistributionSession}>Зберегти сесію</Button>}

                    {activeStep >= 3 && <Button colorScheme="brand" onClick={onOpenTeacherModal}>Викладачі</Button>}
                </Stack>

                {correctTeachers.length !== 0 && (
                    <Popover placement="right">
                        <PopoverTrigger>
                            <Button
                                colorScheme="brand"
                                position="relative"
                                rightIcon={
                                    <Badge
                                        w={5} h={5}
                                        borderRadius="full"
                                        variant="solid"
                                        colorScheme="red"
                                        position="absolute"
                                        top={-2} right={-2}
                                    >
                                        <Text
                                            as="span"
                                            w="100%" h="100%"
                                            fontSize="medium"
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            {correctTeachers.filter((teacher) => !teacher.isCorrect).length}
                                        </Text>
                                    </Badge>
                                }>
                                Помилки
                            </Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent w="fit-content" pr={10}>
                                <PopoverArrow/>
                                <PopoverHeader></PopoverHeader>
                                <PopoverCloseButton/>
                                <PopoverBody w="fit-content">
                                    <Stack spacing={2}>
                                        {correctTeachers
                                            .filter((teacher) => !teacher.isCorrect)
                                            .sort((a, b) =>
                                                getTotalAcademicWorkload(b.teacher.academic_workload)
                                                - getTotalAcademicWorkload(a.teacher.academic_workload)
                                            )
                                            .map(({message, teacher}) => (
                                                <Box key={teacher.id}>
                                                    <Text as="span" fontStyle="italic" fontSize="larger">
                                                        <Text as="strong">{teacher.last_name}</Text>
                                                        <Text as="strong"> {teacher.first_name.at(0)}.</Text>
                                                        <Text as="strong">{teacher.middle_name.at(0)}.</Text>
                                                        <Text as="span"> </Text>
                                                        <Text as="strong">
                                                            ({getTotalAcademicWorkload(teacher.academic_workload)
                                                            .toFixed(2)} годин)
                                                        </Text>
                                                        <Text as="span"> - </Text>
                                                        <Text
                                                            as="strong"
                                                            fontStyle="normal"
                                                            color={
                                                                message === "Навантаження не призначено"
                                                                    ? "#BD5B00"
                                                                    : message === "Навантаження перевищує норму"
                                                                        ? "#BD0303"
                                                                        : message === "Навантаження менше норми"
                                                                            ? "#A59606"
                                                                            : "black"
                                                            }
                                                        >
                                                            {message}
                                                        </Text>
                                                    </Text>
                                                </Box>
                                            ))
                                        }
                                    </Stack>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                )}

                <ViewTeacherWorkload
                    isOpen={isOpenTeacherModal}
                    onClose={onCloseTeacherModal}
                    teachers={teachers}
                />
            </Stack>

            <Box flex={1}>
                {steps[activeStep].element}
            </Box>
        </Flex>
    );
};

export default WorkloadStepper;
