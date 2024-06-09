import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Stack, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {DisciplineService, ResponseDiscipline} from "entities/discipline";
import {Loader} from "components/UI";
import {WorkloadDistributionSession} from "types/workload.distribution.session";
import DisciplineTable from "../../DisciplineComponents/DisciplineTable/DisciplineTable";

const DisciplineWrapper: FC = () => {
    const idDisciplineToast = "discipline-toast";
    const disciplineToast = useToast({id: idDisciplineToast});
    const {refreshToken} = useAuth();
    const [disciplines, setDisciplines] = useState<ResponseDiscipline[]>([]);
    const [studyYear, setStudyYear] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchDisciplines = useCallback(async () => {
        try {
            const disciplineService = new DisciplineService();
            const disciplines = await disciplineService.getAllDisciplines();
            setDisciplines(prevState => [...prevState, ...disciplines]);
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, disciplineToast, idDisciplineToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        }
    }, [disciplineToast, refreshToken]);

    useEffect(() => {
        fetchDisciplines().finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        const workloadDistributionSessionString = localStorage.getItem("distribution_session");
        if (workloadDistributionSessionString) {
            const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);
            setStudyYear(workloadDistributionSession && workloadDistributionSession.study_year);
            if (workloadDistributionSession.step <= 3) {
                workloadDistributionSession.step = 3;
            }
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

    return <DisciplineTable
        disciplines={disciplines.filter((discipline) => discipline.data_of_years === studyYear)}
    />;
};

export default DisciplineWrapper;
