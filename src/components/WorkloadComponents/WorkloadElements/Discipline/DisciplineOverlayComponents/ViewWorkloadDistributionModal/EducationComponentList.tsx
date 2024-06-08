import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Box, ButtonGroup, Heading, IconButton, Skeleton, Stack, StackDivider, useToast} from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {
    AcademicWorkloadService,
    RequestAcademicWorkload,
    ResponseEducationComponentWithRelationships
} from "entities/discipline";
import EducationComponentElement from "./EducationComponentElement";

interface EducationComponentElementProps {
    educationComponents: ResponseEducationComponentWithRelationships[];
}

const EducationComponentList: FC<EducationComponentElementProps> = ({educationComponents}) => {
    const {refreshToken} = useAuth();
    const idWorkloadToast = "workload-education-components-toast";
    const workloadToast = useToast({id: idWorkloadToast});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [courseStudyArray, setCourseStudyArray] = useState<number[]>([]);
    const [courseStudyIndex, setCourseStudyIndex] = useState<number>(0);
    const [academicWorkload, setAcademicWorkload] = useState<RequestAcademicWorkload>();

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
            const workload = await academicWorkloadService
                .calculationAcademicWorkloadForEducationComponents(educationComponents.map((educationComponent) =>
                    educationComponent.id
                ));
            setAcademicWorkload(workload);
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, workloadToast, idWorkloadToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        }
    }, [educationComponents, refreshToken, workloadToast]);

    useEffect(() => {
        getPossibleCourseStudy();
        fetchAcademicWorkloadForEducationComponents().finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <Skeleton h={50}/>;
    console.log(academicWorkload);
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

            <Stack flex={1} p={2} spacing={4} divider={<StackDivider h="1px" bg="brand.300"/>}>
                <Box>
                    <Heading size="lg" textAlign="center">
                        <u><i>{courseStudyArray[courseStudyIndex]}</i></u> курс навчання
                    </Heading>

                    <Stack
                        p={5}
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="brand.300"
                        borderRadius="lg"
                        divider={<StackDivider h="1px" bg="brand.200"/>}
                    >
                        {educationComponents[0].semesters.map((semester) => (
                            <Stack key={semester.id}>
                                <Heading size="md">
                                    Семестр: <span style={{fontWeight: "normal", fontStyle: "italic"}}>
                                {semester.semester_number}
                            </span>
                                </Heading>
                                <Heading size="md">
                                    Загальна кількість годин: <span style={{fontWeight: "normal", fontStyle: "italic"}}>
                                {semester.total_amount_hours}
                            </span>,
                                    Тип звітності: <span style={{fontWeight: "normal", fontStyle: "italic"}}>
                                {semester.reporting_type}
                            </span>
                                </Heading>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
                {educationComponents
                    .sort((a, b) => a.course_study - b.course_study)
                    .filter((educationComponent) => educationComponent.course_study === courseStudyArray[courseStudyIndex])
                    .map((educationComponent) =>
                        <EducationComponentElement
                            key={educationComponent.id}
                            educationComponent={educationComponent}
                        />
                    )}
            </Stack>
        </Stack>
    );
};

export default EducationComponentList;
