import {ReactNode} from "react";

import {SidebarElement} from "types/enums";
import {Profile} from "components/UserComponents";
import {TeacherWrapper} from "components/TeacherComponents";
import {DepartmentWrapper} from "components/DepartmentComponents";
import {CurriculumWrapper} from "components/CurriculumComponents";
import {DisciplineWrapper} from "components/DisciplineComponents";
import {StudyGroupWrapper} from "components/StudyGroupComponents";


type SidebarElementData = {
    sidebarElementName: string;
    sidebarElementType: SidebarElement;
    children: ReactNode;
};

const defaultSidebarElements: SidebarElementData[] = [
    {
        sidebarElementName: "Профіль",
        sidebarElementType: SidebarElement.PROFILE,
        children: <Profile/>
    },
    {
        sidebarElementName: "Дисципліни",
        sidebarElementType: SidebarElement.DISCIPLINES,
        children: <DisciplineWrapper/>
    }
];

const sidebarAdminElements: SidebarElementData[] = [
    ...defaultSidebarElements,
    {
        sidebarElementName: "Кафедри",
        sidebarElementType: SidebarElement.DEPARTMENTS,
        children: <DepartmentWrapper/>
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
    }
];

const sidebarUserElements: SidebarElementData[] = [
    ...defaultSidebarElements,
    {
        sidebarElementName: "Науково-педагогічні працівники",
        sidebarElementType: SidebarElement.EMPLOYEES,
        children: <TeacherWrapper/>
    },
    {
        sidebarElementName: "Навчальне навантаження НПП",
        sidebarElementType: SidebarElement.WORKLOAD,
        children: <>Навчальне навантаження НПП</>
    },
    {
        sidebarElementName: "Індивідуальні плани викладачів",
        sidebarElementType: SidebarElement.PLANS,
        children: <>Індивідуальні плани викладачів</>
    }
];

export {sidebarAdminElements, sidebarUserElements};
