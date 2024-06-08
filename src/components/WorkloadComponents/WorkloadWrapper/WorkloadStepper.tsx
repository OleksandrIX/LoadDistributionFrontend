import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Box, Button, ButtonGroup, Flex, IconButton, Stack, useDisclosure, useToast} from "@chakra-ui/react";
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
import {DepartmentService} from "entities/department";
import {TeacherWrapper} from "components/TeacherComponents";
import {TeacherDistributionWorkload} from "entities/teacher";
import {defaultAcademicWorkload} from "entities/discipline";
import {Loader} from "components/UI";
import {WorkloadStepperElement} from "./workload.stepper";
import {DisciplineWrapper, StartWrapper, WorkloadDiscplineWrapper, ViewTeacherWorkload} from "../WorkloadElements";
import {WorkloadDistributionSession} from "types/workload.distribution.session";

interface WorkloadStepperProps {
}


const WorkloadStepper: FC<WorkloadStepperProps> = () => {
    const {department, refreshToken} = useAuth();
    const [teachers, setTeachers] = useState<TeacherDistributionWorkload[]>([]);
    const idWorkloadTeacherToast = "workload-teacher-toast";
    const workloadTeacherToast = useToast({id: idWorkloadTeacherToast});
    const [steps, setSteps] = useState<WorkloadStepperElement[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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

    useEffect(() => {
        fetchTeachers().finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setSteps([
                {
                    title: "Створення",
                    description: "Створення розподіу",
                    element: <StartWrapper onStart={() => setActiveStep(prevState => prevState + 1)}/>
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
            <Stack position="sticky" top={10} mt={10}>
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

                {activeStep >= 3 && <Button colorScheme="brand" onClick={onOpenTeacherModal}>Викладачі</Button>}
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
