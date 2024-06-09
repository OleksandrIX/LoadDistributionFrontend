import {FC, useEffect, useState} from "react";
import {Flex, Heading, Skeleton, Stack, Text} from "@chakra-ui/react";

import {TeacherDistributionWorkload} from "entities/teacher";
import {
    getAcademicWorkloadHours,
    getMaxAcademicWorkload,
    getTotalAcademicWorkload,
    getWorkingHoursPerYear
} from "utils/academic.workload";
import {WorkloadDistributionSession} from "types/workload.distribution.session";
import {defaultAcademicWorkload, RequestAcademicWorkload} from "entities/discipline";

interface TeacherElementProps {
    teacher: TeacherDistributionWorkload;
}

const TeacherElement: FC<TeacherElementProps> = ({teacher}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
                <Text as="span" fontWeight="normal" fontStyle="italic"> {getWorkingHoursPerYear(teacher)}</Text>
            </Heading>

            <Heading size="sm">
                Можливе навчальне навантаження на рік:
                <Text as="span" fontWeight="normal" fontStyle="italic"> {getAcademicWorkloadHours(teacher)}</Text>
            </Heading>

            <Heading size="sm">
                Поточне навчальне навантаження: <span> </span>
                <Text
                    as="span"
                    fontWeight="normal"
                    fontStyle="italic"
                    color="white"
                    borderRadius="lg"
                    px="5px"
                    backgroundColor={
                        getTotalAcademicWorkload(teacher.academic_workload) >= getMaxAcademicWorkload(teacher)[1] ? "red" :
                            getMaxAcademicWorkload(teacher).length === 1 && getTotalAcademicWorkload(teacher.academic_workload) >= getMaxAcademicWorkload(teacher)[0] ? "green" :
                                getMaxAcademicWorkload(teacher).length === 2 && getTotalAcademicWorkload(teacher.academic_workload) >= getMaxAcademicWorkload(teacher)[1] - 100 ? "green" :
                                    getMaxAcademicWorkload(teacher).length === 2 && getTotalAcademicWorkload(teacher.academic_workload) >= getMaxAcademicWorkload(teacher)[0] ? "orange" :
                                        "red"
                    }
                >
                    {getTotalAcademicWorkload(teacher.academic_workload).toFixed(2)}
                </Text>

            </Heading>
        </Stack>
    );
};

export default TeacherElement;
