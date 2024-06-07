import axios from "axios";
import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {Box, Flex, Heading, Select, Stack, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {Loader} from "components/UI";
import {ResponseTeacher} from "entities/teacher";
import {DepartmentService} from "entities/department";
import {DisciplineService, ResponseDiscipline} from "entities/discipline";
import DisciplinesList from "../WorkloadDisciplineComponent/DisciplinesList";

const WorkloadWrapper: FC = () => {
    const idWorkloadToast = "workload-toast";
    const workloadToast = useToast({id: idWorkloadToast});
    const {department, refreshToken} = useAuth();

    const [teachers, setTeachers] = useState<ResponseTeacher[]>([]);
    const [disciplines, setDisciplines] = useState<ResponseDiscipline[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [dataOfYearsArray, setDataOfYearsArray] = useState<string[]>([]);
    const [selectedDataOfYears, setSelectedDataOfYears] = useState<string>("");

    const fetchData = useCallback(async () => {
        const departmentService = new DepartmentService();
        const disciplineService = new DisciplineService();
        try {
            if (department) {
                const responseDepartment = await departmentService.getDepartmentByIdWithTeachers(department.id);
                const responseDiscipline = await disciplineService.getAllDisciplines();

                const possibleDataOfYears: string[] = [];
                for (const discipline of responseDiscipline) {
                    !possibleDataOfYears.includes(discipline.data_of_years)
                    && possibleDataOfYears.push(discipline.data_of_years);
                }

                possibleDataOfYears.sort((a, b) => {
                    const startYear = parseInt(a.split("-")[0]);
                    const endYear = parseInt(b.split("-")[1]);
                    return startYear - endYear;
                });

                setDataOfYearsArray(possibleDataOfYears);
                setSelectedDataOfYears(possibleDataOfYears[0]);
                setTeachers(responseDepartment.teachers);
                setDisciplines(responseDiscipline);
            }
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
    }, [department, refreshToken, workloadToast]);

    const handleSelectDataOfYears = (event: ChangeEvent<HTMLSelectElement>) =>
        setSelectedDataOfYears(event.target.value);

    useEffect(() => {
        fetchData().finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
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

    console.log(teachers);
    return (
        <Stack spacing={4}>
            <Flex my={2} align="center">
                <Select w="fit-content" defaultValue={selectedDataOfYears} onChange={handleSelectDataOfYears}>
                    {dataOfYearsArray.map((dataOfYear) =>
                        <option key={dataOfYear} value={dataOfYear}>{dataOfYear}</option>
                    )}
                </Select>

                <Heading size="md" textAlign="center" flex={1}>
                    Розподіл навчального навантаження
                </Heading>
            </Flex>

            <DisciplinesList
                disciplines={disciplines.filter((discipline) =>
                    discipline.data_of_years === selectedDataOfYears && discipline
                )}
            />
        </Stack>
    );
};


export default WorkloadWrapper;
