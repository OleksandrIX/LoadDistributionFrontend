import {ReactNode} from "react";

import {SidebarElement} from "types/enums";
import {
    ProfileIcon,
    DepartmentIcon,
    TeacherIcon,
    DisciplineIcon,
    StudyGroupIcon,
    CurriculumIcon,
    FormulaIcon, UserIcon, DocumentIcon, WorkloadIcon
} from "components/UI";
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
    sidebarElementIcon?: ReactNode;
    children: ReactNode;
};

const sidebarAdminElements: SidebarElementData[] = [
    {
        sidebarElementName: "Профіль",
        sidebarElementType: SidebarElement.PROFILE,
        sidebarElementIcon: <ProfileIcon color="white" boxSize={8}/>,
        children: <Profile/>
    },
    {
        sidebarElementName: "Кафедри",
        sidebarElementType: SidebarElement.DEPARTMENTS,
        sidebarElementIcon: <DepartmentIcon color="white" boxSize={8}/>,
        children: <DepartmentWrapper/>
    },
    {
        sidebarElementName: "Науково-педагогічні працівники",
        sidebarElementType: SidebarElement.EMPLOYEES,
        sidebarElementIcon: <TeacherIcon color="white" boxSize={8}/>,
        children: <TeacherWrapper/>
    },
    {
        sidebarElementName: "Дисципліни",
        sidebarElementType: SidebarElement.DISCIPLINES,
        sidebarElementIcon: <DisciplineIcon color="white" boxSize={8}/>,
        children: <DisciplineWrapper/>
    },
    {
        sidebarElementName: "Навчальні групи",
        sidebarElementType: SidebarElement.GROUPS,
        sidebarElementIcon: <StudyGroupIcon color="white" boxSize={8}/>,
        children: <StudyGroupWrapper/>
    },
    {
        sidebarElementName: "Робочі навчальні плани",
        sidebarElementType: SidebarElement.CURRICULUMS,
        sidebarElementIcon: <CurriculumIcon color="white" boxSize={8}/>,
        children: <CurriculumWrapper/>
    },
    {
        sidebarElementName: "Формули для розрахунків",
        sidebarElementType: SidebarElement.FORMULAS,
        sidebarElementIcon: <FormulaIcon color="white" boxSize={8}/>,
        children: <WorkloadFormulaWrapper/>
    },
    {
        sidebarElementName: "Користувачі",
        sidebarElementType: SidebarElement.USERS,
        sidebarElementIcon: <UserIcon color="white" boxSize={8}/>,
        children: <UserWrapper/>
    }
];

const sidebarUserElements: SidebarElementData[] = [
    {
        sidebarElementName: "Профіль",
        sidebarElementType: SidebarElement.PROFILE,
        sidebarElementIcon: <ProfileIcon color="white" boxSize={8}/>,
        children: <Profile/>
    },
    {
        sidebarElementName: "Дисципліни",
        sidebarElementType: SidebarElement.DISCIPLINES,
        sidebarElementIcon: <DisciplineIcon color="white" boxSize={8}/>,
        children: <DisciplineWrapper/>
    },
    {
        sidebarElementName: "Науково-педагогічні працівники",
        sidebarElementType: SidebarElement.EMPLOYEES,
        sidebarElementIcon: <TeacherIcon color="white" boxSize={8}/>,
        children: <TeacherWrapper/>
    },
    {
        sidebarElementName: "Розподіл навчального навантаження",
        sidebarElementType: SidebarElement.WORKLOAD,
        sidebarElementIcon: <WorkloadIcon color="white" boxSize={8}/>,
        children: <WorkloadWrapper/>
    },
    {
        sidebarElementName: "Документи кафедри",
        sidebarElementType: SidebarElement.DOCUMENTS,
        sidebarElementIcon: <DocumentIcon color="white" boxSize={8}/>,
        children: <IndividualPlanWrapper/>
    }
];

export {sidebarAdminElements, sidebarUserElements};
