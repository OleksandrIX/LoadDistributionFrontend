import {TeacherDistributionWorkload} from "entities/teacher";
import {DisciplineDistributionWorkload} from "entities/discipline";
import {DistributedDiscipline, WorkloadDistributionSession} from "types/workload.distribution.session";

export const getDisciplinesForTeacher = (
    distributedDiscipline: DistributedDiscipline[],
    disciplines: DisciplineDistributionWorkload[],
    teacher: TeacherDistributionWorkload
) => {
    const responseDiscipline: DisciplineDistributionWorkload[] = [];
    for (const distributedDisciplineElement of distributedDiscipline) {
        for (const courseStudyKey in distributedDisciplineElement.course_study) {
            const courseStudy = distributedDisciplineElement.course_study[courseStudyKey];
            if (courseStudy.lecture && courseStudy.lecture.id === teacher.id) {
                const existingDiscipline = responseDiscipline.find((rd) => rd.id === distributedDisciplineElement.id);
                if (!existingDiscipline) {
                    const discipline = disciplines.find((d) => d.id === distributedDisciplineElement.id);
                    discipline && responseDiscipline.push(discipline);
                }
            }

            for (const educationComponent of courseStudy.education_components) {
                for (const teacherPerStudyGroupKey in educationComponent.teacher_per_study_group) {
                    const studyGroupTeacher = educationComponent.teacher_per_study_group[teacherPerStudyGroupKey];
                    if (studyGroupTeacher && studyGroupTeacher.id === teacher.id) {
                        const existingDiscipline = responseDiscipline.find((rd) => rd.id === distributedDisciplineElement.id);
                        if (!existingDiscipline) {
                            const discipline = disciplines.find((d) => d.id === distributedDisciplineElement.id);
                            discipline && responseDiscipline.push(discipline);
                        }
                    }
                }
            }
        }
    }
    return responseDiscipline;
};


export const getDistributionSessionFromLocalStorage = (): WorkloadDistributionSession | null => {
    const workloadDistributionSessionString = localStorage.getItem("distribution_session");
    if (workloadDistributionSessionString) return JSON.parse(workloadDistributionSessionString);
    else return null;
};
