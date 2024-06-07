import {ReactNode} from "react";

import {SidebarElement} from "types/enums";
import {Profile, UserWrapper} from "components/UserComponents";
import {TeacherWrapper} from "components/TeacherComponents";
import {DepartmentWrapper} from "components/DepartmentComponents";
import {CurriculumWrapper} from "components/CurriculumComponents";
import {DisciplineWrapper} from "components/DisciplineComponents";
import {StudyGroupWrapper} from "components/StudyGroupComponents";
import {WorkloadWrapper} from "components/WorkloadComponents";
import {IndividualPlanWrapper} from "components/IndividualPlanComponents";
import {WorkloadFormulaWrapper} from "components/WorkloadFormulaComponents";


type SidebarElementData = {
    sidebarElementName: string;
    sidebarElementType: SidebarElement;
    children: ReactNode;
};

const sidebarAdminElements: SidebarElementData[] = [
    {
        sidebarElementName: "Профіль",
        sidebarElementType: SidebarElement.PROFILE,
        children: <Profile/>
    },
    {
        sidebarElementName: "Кафедри",
        sidebarElementType: SidebarElement.DEPARTMENTS,
        children: <DepartmentWrapper/>
    },
    {
        sidebarElementName: "Науково-педагогічні працівники",
        sidebarElementType: SidebarElement.EMPLOYEES,
        children: <TeacherWrapper/>
    },
    {
        sidebarElementName: "Дисципліни",
        sidebarElementType: SidebarElement.DISCIPLINES,
        children: <DisciplineWrapper/>
    },
    {
        sidebarElementName: "Навчальні групи",
        sidebarElementType: SidebarElement.GROUPS,
        children: <StudyGroupWrapper/>
    },
    {
        sidebarElementName: "Робочі навчальні плани",
        sidebarElementType: SidebarElement.CURRICULUMS,
        children: <CurriculumWrapper/>
    },
    {
        sidebarElementName: "Формули для розрахунків",
        sidebarElementType: SidebarElement.FORMULAS,
        children: <WorkloadFormulaWrapper/>
    },
    {
        sidebarElementName: "Користувачі",
        sidebarElementType: SidebarElement.USERS,
        children: <UserWrapper/>
    }
];

const sidebarUserElements: SidebarElementData[] = [
    {
        sidebarElementName: "Профіль",
        sidebarElementType: SidebarElement.PROFILE,
        children: <Profile/>
    },
    {
        sidebarElementName: "Дисципліни",
        sidebarElementType: SidebarElement.DISCIPLINES,
        children: <DisciplineWrapper/>
    },
    {
        sidebarElementName: "Науково-педагогічні працівники",
        sidebarElementType: SidebarElement.EMPLOYEES,
        children: <TeacherWrapper/>
    },
    {
        sidebarElementName: "Розподіл навчального навантаження",
        sidebarElementType: SidebarElement.WORKLOAD,
        children: <WorkloadWrapper/>
    },
    {
        sidebarElementName: "Документи кафедри",
        sidebarElementType: SidebarElement.DOCUMENTS,
        children: <IndividualPlanWrapper/>
    }
];

export {sidebarAdminElements, sidebarUserElements};
