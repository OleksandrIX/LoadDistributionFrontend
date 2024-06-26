import axios from "axios";
import {ChangeEvent, FC, FormEvent, useCallback, useEffect, useState} from "react";
import {
    Button, ButtonGroup,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Select,
    Stack,
    StackDivider,
    Text,
    useToast
} from "@chakra-ui/react";
import {DeleteIcon, DownloadIcon} from "@chakra-ui/icons";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {displayToast} from "utils/toast";
import {DisciplineService, DistributionSessionService} from "entities/discipline";
import {Loader} from "components/UI";
import {WorkloadDistributionSession} from "types/workload.distribution.session";

interface StartWrapperProps {
    setActiveStep: (value: number) => void;
}

const StartWrapper: FC<StartWrapperProps> = ({setActiveStep}) => {
    const {refreshToken} = useAuth();
    const idStartDistributionToast = "start-distribution-toast";
    const startDistributionToast = useToast({id: idStartDistributionToast});
    const [studyYears, setStudyYears] = useState<string[]>([]);
    const [selectedStudyYear, setSelectedStudyYear] = useState<string>("");
    const [distributionName, setDistributionName] = useState<string>("");
    const [distributionSessions, setDistributionSessions] = useState<string[]>([]);
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

    const fetchDistributionSessions = useCallback(async () => {
        const distributionSessionService = new DistributionSessionService();
        try {
            const responseDistributionSessions = await distributionSessionService.getAllDistributionSessions();
            setDistributionSessions(responseDistributionSessions);
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
        fetchStudyCourse().then();
        fetchDistributionSessions().finally(() => setIsLoading(false));
    }, []);

    const handleSelectStudyCourse = (event: ChangeEvent<HTMLSelectElement>) => setSelectedStudyYear(event.target.value);
    const handleChangeDistributionName = (event: ChangeEvent<HTMLInputElement>) => setDistributionName(event.target.value);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const distributionSessionService = new DistributionSessionService();
        const workloadDistributionSession: WorkloadDistributionSession = {
            study_year: selectedStudyYear,
            distribution_name: distributionName,
            step: 2,
            disciplines: [],
            teachers: [],
            distributed_disciplines: []
        };

        try {
            await distributionSessionService.saveDistributionSession(workloadDistributionSession);
            localStorage.setItem("distribution_session", JSON.stringify(workloadDistributionSession));
            setActiveStep(2);
            displayToast(startDistributionToast, idStartDistributionToast, {
                status: "success",
                title: `Сесію '${workloadDistributionSession.distribution_name}' успішно створено`
            });
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
    };

    const loadWorkloadDistributionSession = async (distributionSessionName: string) => {
        const distributionSessionService = new DistributionSessionService();
        try {
            const workloadDistributionSession =
                await distributionSessionService.loadDistributionSessionByName(distributionSessionName);
            localStorage.setItem("distribution_session", JSON.stringify(workloadDistributionSession));
            setActiveStep(workloadDistributionSession.step - 1);
            displayToast(startDistributionToast, idStartDistributionToast, {
                status: "success",
                title: `Сесію '${distributionSessionName}' успішно завантажено`
            });
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
    };

    const deleteWorkloadDistributionSession = async (distributionSessionName: string) => {
        const distributionSessionService = new DistributionSessionService();
        try {
            await distributionSessionService.deleteDistributionSessionByName(distributionSessionName);
            displayToast(startDistributionToast, idStartDistributionToast, {
                status: "success",
                title: `Сесію '${distributionSessionName}' успішно видалено`
            });
            setDistributionSessions(prevSessions =>
                prevSessions.filter(session => session !== distributionSessionName)
            );
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
                <Heading size="lg" mb={5}>
                    Збереженні розподіли
                </Heading>

                <Stack
                    p={4} spacing={5}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="brand.300"
                    borderRadius="lg"
                    divider={<StackDivider h="1px" bg="brand.300"/>}
                >
                    {distributionSessions.length > 0 ? (
                        distributionSessions.map((session) =>
                            <Flex key={session} justify="space-between" align="center" px={5}>
                                <Heading fontSize="2xl" fontStyle="italic">
                                    {session}
                                </Heading>

                                <ButtonGroup colorScheme="brand">
                                    <IconButton
                                        py={6}
                                        px={3}
                                        aria-label="Завантажити"
                                        icon={<DownloadIcon h={6} w={6}/>}
                                        onClick={async () => await loadWorkloadDistributionSession(session)}
                                    />

                                    <IconButton
                                        py={6}
                                        px={3}
                                        aria-label="Видалити"
                                        icon={<DeleteIcon h={6} w={6}/>}
                                        onClick={async () => await deleteWorkloadDistributionSession(session)}
                                    />
                                </ButtonGroup>
                            </Flex>
                        )
                    ) : (
                        <Text fontStyle="italic" fontWeight="bold" fontSize="larger">Немає сесій</Text>
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default StartWrapper;
