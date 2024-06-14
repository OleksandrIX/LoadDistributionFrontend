import {Position} from "types/enums";
import {RequestAcademicWorkload} from "entities/discipline";
import {TeacherDistributionWorkload} from "entities/teacher";

export const getWorkingHoursPerYear = (teacher: TeacherDistributionWorkload): number => {
    if (teacher.is_civilian) return 1548;
    if (!teacher.years_of_service) return 1548;

    const yearsOfService = teacher.years_of_service;
    if (yearsOfService < 10) {
        return 1820;
    } else if (yearsOfService >= 10 && yearsOfService < 15) {
        return 1800;
    } else if (yearsOfService >= 15 && yearsOfService < 20) {
        return 1760;
    } else {
        return 1720;
    }
};

export const getAcademicWorkloadRate = (teacher: TeacherDistributionWorkload): [number, number] => {
    switch (teacher.position) {
        case Position.HEAD_OF_THE_DEPARTMENT:
            return [25, 35];
        case Position.DEPUTY_HEAD_OF_THE_DEPARTMENT:
            return [30, 35];
        case Position.PROFESSOR:
            return [25, 30];
        case Position.ASSOCIATE_PROFESSOR:
            return [30, 35];
        case Position.SENIOR_LECTURER:
            return [35, 45];
        case Position.LECTURER:
            return [40, 45];
        case Position.ASSISTANT:
            return [45, 50];
        case Position.SERGEANT_INSTRUCTOR:
            return [50, 55];
    }
};

export const getAcademicWorkloadHours = (teacher: TeacherDistributionWorkload): string => {
    const academicWorkloadRate = getAcademicWorkloadRate(teacher);
    const workingHoursPerYear = getWorkingHoursPerYear(teacher);
    const minHours = ((workingHoursPerYear * academicWorkloadRate[0]) / 100) * teacher.teacher_rate;
    let maxHours = ((workingHoursPerYear * academicWorkloadRate[1]) / 100) * teacher.teacher_rate;

    if (minHours >= 600) {
        return "600.00";
    }

    if (maxHours > 600) {
        maxHours = 600;
    }

    return `${minHours.toFixed(2)}-${maxHours.toFixed(2)}`;
};

export const getTotalAcademicWorkload = (academic_workload: RequestAcademicWorkload): number => {
    return Object.values(academic_workload).reduce((acc, hours) => acc + hours, 0);
};

export const getMaxAcademicWorkload = (teacher: TeacherDistributionWorkload): number[] => {
    const academicWorkloadHours = getAcademicWorkloadHours(teacher);
    const splitedacademicWorkloadHours = academicWorkloadHours.split("-");
    return splitedacademicWorkloadHours.map((hours) => parseFloat(hours));
};
