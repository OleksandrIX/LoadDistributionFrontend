import {FC, useEffect, useState} from "react";
import {Card, CardBody, Heading, ListItem, SimpleGrid, Stack, Text, UnorderedList} from "@chakra-ui/react";

import {DistributedDiscipline, WorkloadDistributionSession} from "types/workload.distribution.session";
import {DisciplineDistributionWorkload} from "entities/discipline";
import {TeacherDistributionWorkload} from "entities/teacher";
import {Loader} from "components/UI";
import {CardHeader} from "@chakra-ui/card";

interface FinishWrapperProps {

}

const FinishWrapper: FC<FinishWrapperProps> = () => {
    const [distributedDiscipline, setDistributedDiscipline] = useState<DistributedDiscipline[]>([]);
    const [disciplines, setDisciplines] = useState<DisciplineDistributionWorkload[]>([]);
    const [teachers, setTeachers] = useState<TeacherDistributionWorkload[]>([]);
    const [studyYear, setStudyYear] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getDisciplinesForTeacher = (teacher: TeacherDistributionWorkload) => {
        const responseDiscipline: DisciplineDistributionWorkload[] = [];
        for (const distributedDisciplineElement of distributedDiscipline) {
            for (const courseStudyKey in distributedDisciplineElement.course_study) {
                const courseStudy = distributedDisciplineElement.course_study[courseStudyKey];
                if (courseStudy.lecture && courseStudy.lecture.id === teacher.id) {
                    const existingDiscipline = responseDiscipline.find((rd) => rd.id === distributedDisciplineElement.id);
                    if (!existingDiscipline) {
                        const discipline = disciplines.find((d) => d.id === distributedDisciplineElement.id);
                        discipline && responseDiscipline.push(discipline);
                    }
                }

                for (const educationComponent of courseStudy.education_components) {
                    for (const teacherPerStudyGroupKey in educationComponent.teacher_per_study_group) {
                        const studyGroupTeacher = educationComponent.teacher_per_study_group[teacherPerStudyGroupKey];
                        if (studyGroupTeacher && studyGroupTeacher.id === teacher.id) {
                            const existingDiscipline = responseDiscipline.find((rd) => rd.id === distributedDisciplineElement.id);
                            if (!existingDiscipline) {
                                const discipline = disciplines.find((d) => d.id === distributedDisciplineElement.id);
                                discipline && responseDiscipline.push(discipline);
                            }
                        }
                    }
                }
            }
        }
        return responseDiscipline;
    };

    useEffect(() => {
        const workloadDistributionSessionString = localStorage.getItem("distribution_session");
        if (workloadDistributionSessionString) {
            const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);
            setStudyYear(workloadDistributionSession && workloadDistributionSession.study_year);
            if (workloadDistributionSession.step <= 5) workloadDistributionSession.step = 5;
            setDistributedDiscipline(workloadDistributionSession.distributed_disciplines);
            setDisciplines(workloadDistributionSession.disciplines);
            setTeachers(workloadDistributionSession.teachers);
            setIsLoading(false);
            localStorage.setItem("distribution_session", JSON.stringify(workloadDistributionSession));
        }
    }, []);

    if (isLoading) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    console.log(distributedDiscipline);
    console.log(disciplines);
    console.log(teachers);
    console.log(studyYear);


    return (
        <Stack mt={5}>
            <SimpleGrid columns={{base: 1, custom1: 2, custom2: 2}} spacing={4} my={5}>
                {teachers.map((teacher) =>
                    <Card
                        key={teacher.id}
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="brand.200"
                    >
                        <CardHeader fontSize="larger" textAlign="center" fontWeight="bold">
                            <Text as="span">{teacher.last_name} </Text>
                            <Text as="span">{teacher.first_name.at(0)}.</Text>
                            <Text as="span">{teacher.middle_name.at(0)}.</Text>
                        </CardHeader>

                        <CardBody>
                            <Heading size="md">
                                Дисципліни, які викладає:
                            </Heading>

                            <UnorderedList>
                                {getDisciplinesForTeacher(teacher).map((discipline) =>
                                    <ListItem key={discipline.id}>
                                        {discipline.discipline_name}
                                    </ListItem>
                                )}
                            </UnorderedList>
                        </CardBody>
                    </Card>
                )}
            </SimpleGrid>
        </Stack>
    );
};

export default FinishWrapper;
