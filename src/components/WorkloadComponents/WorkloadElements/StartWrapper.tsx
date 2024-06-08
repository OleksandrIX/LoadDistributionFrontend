import axios from "axios";
import {ChangeEvent, FC, FormEvent, useCallback, useEffect, useState} from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
    StackDivider,
    useToast
} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {DisciplineService} from "entities/discipline";
import {Loader} from "components/UI";
import {WorkloadDistributionSession} from "types/workload.distribution.session";

interface StartWrapperProps {
    onStart: () => void;
}

const StartWrapper: FC<StartWrapperProps> = ({onStart}) => {
    const {refreshToken} = useAuth();
    const idStartDistributionToast = "start-distribution-toast";
    const startDistributionToast = useToast({id: idStartDistributionToast});
    const [studyYears, setStudyYears] = useState<string[]>([]);
    const [selectedStudyYear, setSelectedStudyYear] = useState<string>("");
    const [distributionName, setDistributionName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchStudyCourse = useCallback(async () => {
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

            setStudyYears(possibleDataOfYears);
            setSelectedStudyYear(possibleDataOfYears[0]);
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, startDistributionToast, idStartDistributionToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        }
    }, [refreshToken, startDistributionToast]);

    useEffect(() => {
        fetchStudyCourse().finally(() => setIsLoading(false));
    }, []);

    const handleSelectStudyCourse = (event: ChangeEvent<HTMLSelectElement>) => setSelectedStudyYear(event.target.value);
    const handleChangeDistributionName = (event: ChangeEvent<HTMLInputElement>) => setDistributionName(event.target.value);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const workloadDistributionSession: WorkloadDistributionSession = {
            study_year: selectedStudyYear,
            distribution_name: distributionName,
            step: 2,
            disciplines: [],
            teachers: [],
            distributed_disciplines: []
        };
        localStorage.setItem("distribution_session", JSON.stringify(workloadDistributionSession));
        onStart();
    };

    if (isLoading) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    return (
        <Stack spacing={10} divider={<StackDivider h="1px" bg="brand.300"/>}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <Flex my={2} align="center">
                        <FormControl display="flex" alignItems="center" isRequired>
                            <FormLabel fontSize="larger" w="fit-content">
                                <b>Виберіть навчальний рік</b>
                            </FormLabel>
                            <Select
                                w="fit-content"
                                defaultValue={selectedStudyYear}
                                onChange={handleSelectStudyCourse}
                            >
                                {studyYears.map((studyCourse) =>
                                    <option key={studyCourse} value={studyCourse}>{studyCourse}</option>
                                )}
                            </Select>
                        </FormControl>
                    </Flex>

                    <Flex>
                        <FormControl display="flex" alignItems="center" isRequired>
                            <FormLabel fontSize="larger" w="fit-content">
                                <b>Введіть назву розподілу</b>
                            </FormLabel>
                            <Input
                                w="50%"
                                type="text"
                                placeholder="Веддіть назву розподілу..."
                                value={distributionName}
                                onChange={handleChangeDistributionName}
                                minLength={3} maxLength={30}
                            />
                        </FormControl>
                    </Flex>

                    <Button colorScheme="brand" type="submit">
                        Створити
                    </Button>
                </Stack>
            </form>

            <Stack>
                <Heading size="md">
                    Збереженні розподіли
                </Heading>
            </Stack>
        </Stack>
    );
};

export default StartWrapper;
