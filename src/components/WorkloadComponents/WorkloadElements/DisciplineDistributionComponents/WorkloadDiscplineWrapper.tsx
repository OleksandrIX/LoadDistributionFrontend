import axios from "axios";
import {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from "react";
import {Stack, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {TeacherDistributionWorkload} from "entities/teacher";
import {
    defaultAcademicWorkload,
    DisciplineDistributionWorkload,
    DisciplineService,
    RequestAcademicWorkload
} from "entities/discipline";
import {Loader} from "components/UI";
import {
    DistributedDisciplinePerCourse,
    DistributedEducationComponent,
    WorkloadDistributionSession
} from "types/workload.distribution.session";
import WorkloadDisciplineList from "./WorkloadDisciplineList";
import {getMaxAcademicWorkload, getTotalAcademicWorkload} from "utils/academic.workload";

interface WorkloadDiscplineWrapperProps {
    teachers: TeacherDistributionWorkload[];
    setTeachers: (teachers: TeacherDistributionWorkload[]) => void;
    setIsComplete: Dispatch<SetStateAction<boolean>>;
}

const WorkloadDiscplineWrapper: FC<WorkloadDiscplineWrapperProps> = ({teachers, setTeachers, setIsComplete}) => {
    const {refreshToken} = useAuth();
    const idWorkloadDisciplineToast = "workload-discipline-toast";
    const workloadDisciplineToast = useToast({id: idWorkloadDisciplineToast});
    const [disciplines, setDisciplines] = useState<DisciplineDistributionWorkload[]>([]);
    const [studyYear, setStudyYear] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingLocalStorage, setIsLoadingLocalStorage] = useState<boolean>(true);

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
                setIsLoadingLocalStorage(false);
            }
        }
    }, [isLoading]);

    useEffect(() => {
        const calculateDisciplineProgress = (workloadDistributionSession: WorkloadDistributionSession): number => {
            let totalCompleteDiscipline = 0;
            for (const distributedDiscipline of workloadDistributionSession.distributed_disciplines) {
                let totalTeacherOnDiscipline = 0;
                let completeTeacherDistribution = 0;

                for (const courseStudyKey in distributedDiscipline.course_study) {
                    const courseStudy = distributedDiscipline.course_study[courseStudyKey];
                    totalTeacherOnDiscipline += 1;
                    if (courseStudy.lecture) completeTeacherDistribution += 1;

                    for (const educationComponent of courseStudy.education_components) {
                        for (const teacherPerStudyGroupKey in educationComponent.teacher_per_study_group) {
                            const teacher = educationComponent.teacher_per_study_group[teacherPerStudyGroupKey];
                            totalTeacherOnDiscipline += 1;
                            if (teacher) completeTeacherDistribution += 1;
                        }
                    }
                }

                if (totalTeacherOnDiscipline === completeTeacherDistribution) {
                    totalCompleteDiscipline += 1;
                }

                setDisciplines((prevState) => {
                    return prevState.map((discipline) => {
                        if (discipline.id === distributedDiscipline.id) {
                            return {
                                ...discipline,
                                completionPercentage: (completeTeacherDistribution / totalTeacherOnDiscipline) * 100,
                                isDistributed: totalTeacherOnDiscipline === completeTeacherDistribution
                            };
                        }
                        return discipline;
                    });
                });
            }
            return totalCompleteDiscipline;
        };

        const checkErrors = (teacher: TeacherDistributionWorkload) => {
            const maxAcademicWorkload = getMaxAcademicWorkload(teacher);
            const totalAcademicWorkload = getTotalAcademicWorkload(teacher.academic_workload);

            if (maxAcademicWorkload.length === 1) {
                if (totalAcademicWorkload > maxAcademicWorkload[0]) {
                    console.log(`Навантаження викладача ${teacher.last_name} ${teacher.first_name} ${teacher.middle_name} перевищує максимальну норму.`);
                }
            } else if (maxAcademicWorkload.length === 2) {
                if (totalAcademicWorkload > maxAcademicWorkload[1]) {
                    console.log(`Навантаження викладача ${teacher.last_name} ${teacher.first_name} ${teacher.middle_name} перевищує максимальну норму.`);
                }
            }
        };

        const calculateWorkloadAndCheckErrors = (workloadDistributionSession: WorkloadDistributionSession) => {
            for (const teacher of teachers) {
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
                checkErrors(teacher);
            }
        };

        const processingWorkload = () => {
            const workloadDistributionSessionString = localStorage.getItem("distribution_session");
            if (workloadDistributionSessionString) {
                const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);
                if (workloadDistributionSession) {
                    const totalCompleteDiscipline = calculateDisciplineProgress(workloadDistributionSession);
                    calculateWorkloadAndCheckErrors(workloadDistributionSession);

                    if (disciplines.length === totalCompleteDiscipline) {
                        setIsComplete(true);
                    }
                }
            }
        };

        if (!isLoadingLocalStorage) {
            processingWorkload();
            const processingInterval = setInterval(processingWorkload, 2 * 1000);

            return () => {
                clearInterval(processingInterval);
            };
        }
    }, [isLoadingLocalStorage]);

    if (isLoading && isLoadingLocalStorage) {
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
