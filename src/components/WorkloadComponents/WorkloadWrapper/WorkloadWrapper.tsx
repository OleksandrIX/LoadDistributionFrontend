import axios from "axios";
import {FC, useEffect} from "react";
import {Box, Heading, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {displayToast} from "utils/toast";
import {DistributionSessionService} from "entities/discipline";
import {WorkloadDistributionSession} from "types/workload.distribution.session";
import WorkloadStepper from "./WorkloadStepper";

const WorkloadWrapper: FC = () => {
    const idWorkloadDistributionToast = "workload-distribution-toast";
    const workloadDistributionToast = useToast({id: idWorkloadDistributionToast});
    const {department, refreshToken} = useAuth();

    const saveDistributionSession = async () => {
        const distributionSessionService = new DistributionSessionService();
        try {
            const workloadDistributionSessionString = localStorage.getItem("distribution_session");
            if (workloadDistributionSessionString) {
                const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);
                await distributionSessionService.saveDistributionSession(workloadDistributionSession);
                displayToast(workloadDistributionToast, idWorkloadDistributionToast, {
                    status: "success",
                    title: "Дані про сесію збережено"
                });
            } else {
                displayToast(workloadDistributionToast, idWorkloadDistributionToast, {
                    status: "error",
                    title: "Даних про сесію не знайдено"
                });
            }
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, workloadDistributionToast, idWorkloadDistributionToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        return () => {
            const workloadDistributionSessionString = localStorage.getItem("distribution_session");
            if (workloadDistributionSessionString) {
                const isConfirmed = confirm("Ви покидаєте сесію розподілу. \nБажаєте зберегти дані про сесію?");
                if (isConfirmed) saveDistributionSession().then();
            }
        };
    }, []);

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
                    px={5}
                    py={1}
                    size="md"
                    textAlign="center"
                    borderWidth="1px"
                    borderColor="brand.200"
                    borderStyle="solid"
                    borderRadius="lg"
                    fontStyle="italic"
                >
                    Вам ще не призначили кафедру
                </Heading>
            </Box>
        );
    }

    return <WorkloadStepper/>;
};

export default WorkloadWrapper;
