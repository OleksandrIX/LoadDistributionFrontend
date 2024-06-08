import {FC, useEffect, useState} from "react";
import {Flex, Heading, Skeleton, Stack, Text, useToast} from "@chakra-ui/react";

import {TeacherDistributionWorkload} from "entities/teacher";
import {Position} from "types/enums";
import {WorkloadDistributionSession} from "types/workload.distribution.session";
import {defaultAcademicWorkload, RequestAcademicWorkload} from "../../../../entities/discipline";

interface TeacherElementProps {
    teacher: TeacherDistributionWorkload;
}

const TeacherElement: FC<TeacherElementProps> = ({teacher}) => {
    const idTeacherWorkloadToast = "teacher-workload-toast";
    const teacherWorkloadToast = useToast({id: idTeacherWorkloadToast, position: "bottom-left"});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    console.log(teacherWorkloadToast);

    const getWorkingHoursPerYear = (): number => {
        if (teacher.is_civilian) return 1548;
        if (!teacher.years_of_service) return 1548;

        const yearsOfService = teacher.years_of_service;
        if (yearsOfService < 10) {
            return 1820;
        } else if (yearsOfService >= 10 && yearsOfService < 15) {
            return 1800;
        } else if (yearsOfService >= 15 && yearsOfService < 20) {
            return 1760;
        } else {
            return 1720;
        }
    };

    const getAcademicWorkloadRate = (): [number, number] => {
        switch (teacher.position) {
            case Position.HEAD_OF_THE_DEPARTMENT:
                return [25, 35];
            case Position.DEPUTY_HEAD_OF_THE_DEPARTMENT:
                return [30, 35];
            case Position.PROFESSOR:
                return [25, 30];
            case Position.ASSOCIATE_PROFESSOR:
                return [30, 35];
            case Position.SENIOR_LECTURER:
                return [35, 45];
            case Position.LECTURER:
                return [40, 45];
            case Position.ASSISTANT:
                return [45, 50];
            case Position.SERGEANT_INSTRUCTOR:
                return [50, 55];
        }
    };

    const getAcademicWorkloadHours = (): string => {
        const academicWorkloadRate = getAcademicWorkloadRate();
        const workingHoursPerYear = getWorkingHoursPerYear();
        const minHours = ((workingHoursPerYear * academicWorkloadRate[0]) / 100) * teacher.teacher_rate;
        let maxHours = ((workingHoursPerYear * academicWorkloadRate[1]) / 100) * teacher.teacher_rate;

        if (minHours >= 600) {
            return "600.00";
        }

        if (maxHours > 600) {
            maxHours = 600;
        }

        return `${minHours.toFixed(2)}-${maxHours.toFixed(2)}`;
    };

    const getTotalAcademicWorkload = (): string => {
        return Object.values(teacher.academic_workload).reduce((acc, hours) => acc + hours, 0).toFixed(2);
    };

    useEffect(() => {
        const workloadDistributionSessionString = localStorage.getItem("distribution_session");
        if (workloadDistributionSessionString) {
            const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);
            const academicWorkload: RequestAcademicWorkload = {...defaultAcademicWorkload};

            for (const distributedDiscipline of workloadDistributionSession.distributed_disciplines) {
                for (const courseStudyKey in distributedDiscipline.course_study) {
                    const courseStudy = distributedDiscipline.course_study[courseStudyKey];

                    if (courseStudy.lecture && courseStudy.lecture.id === teacher.id) {
                        for (const key in academicWorkload) {
                            academicWorkload[key] += courseStudy.lecture.academic_workload[key];
                        }
                    }

                    for (const educationComponent of courseStudy.education_components) {
                        for (const studyGroupKey in educationComponent.teacher_per_study_group) {
                            const teacherPerStudyGroup = educationComponent.teacher_per_study_group[studyGroupKey];
                            if (teacherPerStudyGroup && teacherPerStudyGroup.id === teacher.id) {
                                for (const key in academicWorkload) {
                                    academicWorkload[key] += teacherPerStudyGroup.academic_workload[key];
                                }
                            }
                        }
                    }
                }
            }

            teacher.academic_workload = {...academicWorkload};
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <Skeleton h={50}/>;
    }

    return (
        <Stack
            px={8} py={4}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="brand.300"
            borderRadius="lg"
        >
            <Heading size="md">
                {teacher.last_name} {teacher.first_name} {teacher.middle_name}
            </Heading>

            <Flex gap={3}>
                <Heading size="sm">
                    Посада:
                    <Text as="span" fontWeight="normal" fontStyle="italic"> {teacher.position}</Text>
                </Heading>

                <Heading size="sm">
                    Ставка викладача:
                    <Text as="span" fontWeight="normal" fontStyle="italic"> {teacher.teacher_rate}</Text>
                </Heading>
            </Flex>

            <Heading size="sm">
                Службовий час на рік:
                <Text as="span" fontWeight="normal" fontStyle="italic"> {getWorkingHoursPerYear()}</Text>
            </Heading>

            <Heading size="sm">
                Можливе навчальне навантаження на рік:
                <Text as="span" fontWeight="normal" fontStyle="italic"> {getAcademicWorkloadHours()}</Text>
            </Heading>

            <Heading size="sm">
                Поточне навчальне навантаження:
                <Text as="span" fontWeight="normal" fontStyle="italic"> {getTotalAcademicWorkload()}</Text>
            </Heading>
        </Stack>
    );
};

export default TeacherElement;
