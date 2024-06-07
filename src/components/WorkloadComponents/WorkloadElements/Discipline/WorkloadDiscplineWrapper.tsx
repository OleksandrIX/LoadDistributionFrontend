import axios from "axios";
import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {Flex, Heading, Select, Stack, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {DisciplineService, ResponseDiscipline} from "entities/discipline";
import WorkloadDisciplineList from "./WorkloadDisciplineList";
import {Loader} from "../../../UI";


const WorkloadDiscplineWrapper: FC = () => {
    const {refreshToken} = useAuth();
    const idWorkloadDisciplineToast = "workload-discipline-toast";
    const workloadDisciplineToast = useToast({id: idWorkloadDisciplineToast});
    const [disciplines, setDisciplines] = useState<ResponseDiscipline[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dataOfYearsArray, setDataOfYearsArray] = useState<string[]>([]);
    const [selectedDataOfYears, setSelectedDataOfYears] = useState<string>("");

    const handleSelectDataOfYears = (event: ChangeEvent<HTMLSelectElement>) =>
        setSelectedDataOfYears(event.target.value);

    const fetchDisciplines = useCallback(async () => {
        const disciplineService = new DisciplineService();
        try {
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
            setDisciplines(responseDiscipline);
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, workloadDisciplineToast, idWorkloadDisciplineToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        }
    }, [refreshToken, workloadDisciplineToast]);

    useEffect(() => {
        fetchDisciplines().finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

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

            <WorkloadDisciplineList
                disciplines={disciplines.filter((discipline) =>
                    discipline.data_of_years === selectedDataOfYears && discipline
                )}
            />
        </Stack>
    );
};

export default WorkloadDiscplineWrapper;
