import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Box, Flex, Heading, ListItem, Skeleton, Stack, StackDivider, UnorderedList, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {
    AcademicWorkloadService,
    RequestAcademicWorkload,
    ResponseEducationComponentWithRelationships
} from "entities/discipline";

interface EducationComponentElementProps {
    educationComponent: ResponseEducationComponentWithRelationships;
}

const EducationComponentElement: FC<EducationComponentElementProps> = ({educationComponent}) => {
    const {refreshToken} = useAuth();
    const idWorkloadToast = "workload-education-component-toast";
    const workloadToast = useToast({id: idWorkloadToast});
    const [academicWorkload, setAcademicWorkload] = useState<RequestAcademicWorkload>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchAcademicWorkload = useCallback(async () => {
        const academicWorkloadService = new AcademicWorkloadService();
        try {
            const workload = await academicWorkloadService
                .calculationAcademicWorkloadForEducationComponent(educationComponent.id);
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
    }, [refreshToken, workloadToast, educationComponent.id]);

    useEffect(() => {
        fetchAcademicWorkload().finally(() => setIsLoading(false));
    }, []);

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
                Освітня компонента: <span style={{fontWeight: "normal", fontStyle: "italic"}}>
                    {educationComponent.education_component_code}
                </span>,
                рівень освіти: <span style={{fontWeight: "normal", fontStyle: "italic"}}>
                {educationComponent.education_degree}
                </span>
            </Heading>

            <Heading size="md">
                Спеціалізація: <span style={{fontWeight: "normal", fontStyle: "italic"}}>
                    {educationComponent.specialization.specialization_code} - {educationComponent.specialization.specialization_name}
                </span>
            </Heading>

            <Heading size="md">
                Лекційних потоків: <span style={{fontWeight: "normal", fontStyle: "italic"}}>
                        {educationComponent.numbers_of_flows === 0
                            ? Math.ceil(educationComponent.study_groups.reduce((acc, group) =>
                                acc + group.number_listeners, 0) / 100)
                            : educationComponent.numbers_of_flows}
                    </span>,
                Навчальні групи: <span style={{fontWeight: "normal", fontStyle: "italic"}}>
                        {educationComponent.study_groups.length}
                    </span>,
                Загальна кількість здобувачів освіти: <span style={{fontWeight: "normal", fontStyle: "italic"}}>
                        {educationComponent.study_groups.reduce((acc, group) => acc + group.number_listeners, 0)}
                    </span>
            </Heading>

            <Box>
                <UnorderedList pl={2}>
                    {educationComponent.study_groups.map((group) =>
                        <ListItem key={`group_${group.group_code}`} fontSize="larger">
                            Група: <span style={{fontStyle: "italic"}}>
                                {group.group_code}
                            </span>,
                            кількість здобувачів: <span style={{fontStyle: "italic"}}>
                                {group.number_listeners}
                            </span>
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

                        <Flex align="start" gap={5}>
                            <Stack>
                                <Heading size="md">Навчальні години</Heading>
                                <UnorderedList pl={2} fontSize="larger">
                                    <ListItem>
                                        Лекційні години: {semester.academic_hours.lecture_hours}
                                    </ListItem>
                                    <ListItem>
                                        Групові/семінарські години: {semester.academic_hours.group_hours}
                                    </ListItem>
                                    <ListItem>
                                        Практичні/лабараторні години: {semester.academic_hours.practical_hours}
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
                                        Модульні контрольні роботи: {semester.academic_task.modular_control_works}
                                    </ListItem>
                                    <ListItem>
                                        Розрахунково-графічні роботи: {semester.academic_task.calculation_graphic_works}
                                    </ListItem>
                                </UnorderedList>
                            </Stack>

                            {academicWorkload && (
                                <Stack>
                                    <Heading size="md">Навчальне навантаження</Heading>
                                    <UnorderedList pl={2} fontSize="larger">
                                        <ListItem>
                                            Лекційне навантаження: {academicWorkload.lecture_hours} годин
                                        </ListItem>
                                        <ListItem>
                                            Групове/семінарське навантаження: {academicWorkload.group_hours} годин
                                        </ListItem>
                                        <ListItem>
                                            Практичне/лабараторне навантаження: {academicWorkload.practical_hours} годин
                                        </ListItem>
                                        <ListItem>
                                            Проведення
                                            консультацій: {academicWorkload.consultation_hours.toFixed(2)} годин
                                        </ListItem>
                                        <ListItem>
                                            Керівництво і проведення захисту курсових робіт
                                            : {academicWorkload.term_papers_conducting_hours.toFixed(2)} годин
                                        </ListItem>
                                        <ListItem>
                                            Перевірка МКР та
                                            РГР: {academicWorkload.control_works_checking_hours.toFixed(2)} годин
                                        </ListItem>
                                        <ListItem>
                                            Проведення диференційованих
                                            заліків: {academicWorkload.graded_tests_conducting_hours.toFixed(2)} годин
                                        </ListItem>
                                        <ListItem>
                                            Проведення семестрових
                                            іспитів: {academicWorkload.exams_conducting_hours.toFixed(2)} годин
                                        </ListItem>
                                    </UnorderedList>
                                    <Heading size="md">Загальна кількість годин: <span style={{fontStyle: "italic"}}>
                                        {Object.values(academicWorkload).reduce((acc, hours) =>
                                            typeof hours === "number" ? acc + hours : acc, 0
                                        ).toFixed(2)}
                                        </span>
                                    </Heading>
                                </Stack>
                            )}
                        </Flex>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
};

export default EducationComponentElement;
