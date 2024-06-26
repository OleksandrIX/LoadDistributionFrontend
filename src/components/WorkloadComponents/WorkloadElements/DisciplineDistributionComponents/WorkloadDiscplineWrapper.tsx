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
    WorkloadDistributionSession,
    TeacherCorrectWorkload
} from "types/workload.distribution.session";
import WorkloadDisciplineList from "./WorkloadDisciplineList";
import {getMaxAcademicWorkload, getTotalAcademicWorkload} from "utils/academic.workload";

interface WorkloadDiscplineWrapperProps {
    teachers: TeacherDistributionWorkload[];
    setTeachers: (teachers: TeacherDistributionWorkload[]) => void;
    setCorrectTeachers: (teachers: TeacherCorrectWorkload[]) => void;
    setIsComplete: Dispatch<SetStateAction<boolean>>;
}

const WorkloadDiscplineWrapper: FC<WorkloadDiscplineWrapperProps> = (
    {
        teachers,
        setTeachers,
        setIsComplete,
        setCorrectTeachers
    }
) => {
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

                const updatedTeachers = [...workloadDistributionSession.teachers];
                teachers.forEach((teacher) => {
                    if (!updatedTeachers.some(t => t.id === teacher.id)) {
                        updatedTeachers.push(teacher);
                    }
                });
                setTeachers(updatedTeachers);
                workloadDistributionSession.teachers = updatedTeachers;

                const updatedDisciplines = [...workloadDistributionSession.disciplines];
                disciplines.forEach((discipline) => {
                    if (!updatedDisciplines.some(d => d.id === discipline.id)) {
                        updatedDisciplines.push(discipline);
                    }
                });
                setDisciplines(updatedDisciplines);
                workloadDistributionSession.disciplines = updatedDisciplines;

                const updatedDistributedDisciplines = [...workloadDistributionSession.distributed_disciplines];
                updatedDisciplines.forEach((discipline) => {
                    const existingDistributedDiscipline = updatedDistributedDisciplines.find(dd => dd.id === discipline.id);
                    if (!existingDistributedDiscipline) {
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

                        updatedDistributedDisciplines.push({
                            id: discipline.id,
                            discipline_name: discipline.discipline_name,
                            course_study: disciplinePerCourse
                        });
                    } else {
                        discipline.education_components.forEach((education_component) => {
                            if (!existingDistributedDiscipline.course_study[education_component.course_study]) {
                                existingDistributedDiscipline.course_study[education_component.course_study] = {
                                    lecture: null,
                                    education_components: []
                                };
                            }

                            const existingCourseStudy = existingDistributedDiscipline.course_study[education_component.course_study];
                            const existingEducationComponent = existingCourseStudy.education_components.find(ec => ec.id === education_component.id);

                            if (!existingEducationComponent) {
                                const distributedEducationComponent: DistributedEducationComponent = {
                                    id: education_component.id,
                                    education_component_code: education_component.education_component_code,
                                    teacher_per_study_group: {}
                                };

                                for (const study_group of education_component.study_groups) {
                                    distributedEducationComponent.teacher_per_study_group[study_group.group_code] = null;
                                }

                                existingCourseStudy.education_components.push(distributedEducationComponent);
                            } else {
                                education_component.study_groups.forEach((study_group) => {
                                    if (!existingEducationComponent.teacher_per_study_group[study_group.group_code]) {
                                        existingEducationComponent.teacher_per_study_group[study_group.group_code] = null;
                                    }
                                });
                            }
                        });
                    }
                });

                workloadDistributionSession.distributed_disciplines = updatedDistributedDisciplines;

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

        const checkErrors = (teacher: TeacherDistributionWorkload): TeacherCorrectWorkload => {
            const correctWorkload: TeacherCorrectWorkload = {
                isCorrect: false,
                message: "",
                teacher: teacher
            };

            const maxAcademicWorkload = getMaxAcademicWorkload(teacher);
            const totalAcademicWorkload = getTotalAcademicWorkload(teacher.academic_workload);

            if (maxAcademicWorkload.length === 1) {
                const max = maxAcademicWorkload[0];
                if (totalAcademicWorkload > max) {
                    correctWorkload.message = "Навантаження перевищує норму";
                    correctWorkload.isCorrect = false;
                } else if (totalAcademicWorkload < max - 100) {
                    correctWorkload.message = "Навантаження менше норми";
                    correctWorkload.isCorrect = false;
                } else {
                    correctWorkload.isCorrect = true;
                }
            } else if (maxAcademicWorkload.length === 2) {
                const [min, max] = maxAcademicWorkload;
                if (totalAcademicWorkload > max) {
                    correctWorkload.message = "Навантаження перевищує норму";
                    correctWorkload.isCorrect = false;
                } else if (totalAcademicWorkload < min) {
                    correctWorkload.message = "Навантаження менше норми";
                    correctWorkload.isCorrect = false;
                } else {
                    correctWorkload.isCorrect = true;
                }
            }

            if (totalAcademicWorkload === 0) {
                correctWorkload.message = "Навантаження не призначено";
            }

            return correctWorkload;
        };

        const calculateWorkloadAndCheckErrors = (workloadDistributionSession: WorkloadDistributionSession): TeacherCorrectWorkload[] => {
            const correctTeachers = [];
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
                correctTeachers.push(checkErrors(teacher));
            }
            return correctTeachers;
        };

        const processingWorkload = () => {
            // console.log(`Навантаження викладача ${teacher.last_name} ${teacher.first_name} ${teacher.middle_name} перевищує максимальну норму.`);

            const workloadDistributionSessionString = localStorage.getItem("distribution_session");
            if (workloadDistributionSessionString) {
                const workloadDistributionSession: WorkloadDistributionSession = JSON.parse(workloadDistributionSessionString);
                if (workloadDistributionSession) {
                    const totalCompleteDiscipline = calculateDisciplineProgress(workloadDistributionSession);
                    const correctTeachers = calculateWorkloadAndCheckErrors(workloadDistributionSession);

                    const disciplineIsComplete = disciplines.length === totalCompleteDiscipline;
                    const teacherIsComplete = correctTeachers.every((teacher) => teacher.isCorrect);

                    if (disciplineIsComplete && teacherIsComplete) setIsComplete(true);
                    if (!teacherIsComplete) setCorrectTeachers(correctTeachers);
                    else setCorrectTeachers(correctTeachers);
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
