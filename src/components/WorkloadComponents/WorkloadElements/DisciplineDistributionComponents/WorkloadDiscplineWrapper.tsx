import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Stack, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {TeacherDistributionWorkload} from "entities/teacher";
import {DisciplineDistributionWorkload, DisciplineService} from "entities/discipline";
import {Loader} from "components/UI";
import {
    DistributedDisciplinePerCourse,
    DistributedEducationComponent,
    WorkloadDistributionSession
} from "types/workload.distribution.session";
import WorkloadDisciplineList from "./WorkloadDisciplineList";

interface WorkloadDiscplineWrapperProps {
    teachers: TeacherDistributionWorkload[];
    setTeachers: (teachers: TeacherDistributionWorkload[]) => void;
}

const WorkloadDiscplineWrapper: FC<WorkloadDiscplineWrapperProps> = ({teachers, setTeachers}) => {
    const {refreshToken} = useAuth();
    const idWorkloadDisciplineToast = "workload-discipline-toast";
    const workloadDisciplineToast = useToast({id: idWorkloadDisciplineToast});
    const [disciplines, setDisciplines] = useState<DisciplineDistributionWorkload[]>([]);
    const [studyYear, setStudyYear] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchDisciplines = useCallback(async () => {
        const disciplineService = new DisciplineService();
        try {
            const responseDiscipline = await disciplineService.getAllDisciplines();
            setDisciplines(responseDiscipline.map((discipline) => ({
                ...discipline,
                isDistributed: false,
                completionPercentage: 0
            })));
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

    useEffect(() => {
        const workloadDistributionSessionString = localStorage.getItem("distribution_session");
        if (workloadDistributionSessionString) {
            const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);
            setStudyYear(workloadDistributionSession && workloadDistributionSession.study_year);
            if (workloadDistributionSession.step <= 4) {
                workloadDistributionSession.step = 4;
            }
            localStorage.setItem("distribution_session", JSON.stringify(workloadDistributionSession));
        }
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const workloadDistributionSessionString = localStorage.getItem("distribution_session");
            if (workloadDistributionSessionString) {
                const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);

                if (workloadDistributionSession.teachers.length === 0) {
                    workloadDistributionSession.teachers = teachers;
                } else {
                    setTeachers(workloadDistributionSession.teachers);
                }

                if (workloadDistributionSession.disciplines.length === 0) {
                    workloadDistributionSession.disciplines = disciplines;
                } else {
                    setDisciplines(workloadDistributionSession.disciplines);
                }

                if (workloadDistributionSession.distributed_disciplines.length === 0) {
                    workloadDistributionSession.distributed_disciplines = disciplines.map((discipline) => {
                        const disciplinePerCourse: Record<number, DistributedDisciplinePerCourse> = {};

                        for (const education_component of discipline.education_components) {
                            if (!disciplinePerCourse[education_component.course_study]) {
                                disciplinePerCourse[education_component.course_study] = {
                                    lecture: null,
                                    education_components: []
                                };
                            }

                            const distributedEducationComponent: DistributedEducationComponent = {
                                id: education_component.id,
                                education_component_code: education_component.education_component_code,
                                teacher_per_study_group: {}
                            };

                            for (const study_group of education_component.study_groups) {
                                distributedEducationComponent.teacher_per_study_group[study_group.group_code] = null;
                            }

                            disciplinePerCourse[education_component.course_study].education_components.push(distributedEducationComponent);
                        }

                        return {
                            id: discipline.id,
                            discipline_name: discipline.discipline_name,
                            course_study: disciplinePerCourse
                        };
                    });
                }

                localStorage.setItem("distribution_session", JSON.stringify(workloadDistributionSession));
            }
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    return (
        <Stack spacing={4}>
            <WorkloadDisciplineList
                disciplines={disciplines.filter((discipline) =>
                    discipline.data_of_years === studyYear && discipline
                )}
                teachers={teachers}
            />
        </Stack>
    );
};

export default WorkloadDiscplineWrapper;
