import {ReactNode} from "react";

import {SidebarElement} from "types/enums";
import {Profile} from "components/UserComponents";
import {TeacherWrapper} from "components/TeacherComponents";


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
    }
];

const sidebarAdminElements: SidebarElementData[] = [
    ...defaultSidebarElements,
    {
        sidebarElementName: "Кафедри",
        sidebarElementType: SidebarElement.DEPARTMENTS,
        children: <>Кафедри</>
    },
    {
        sidebarElementName: "Робочі навчальні плани",
        sidebarElementType: SidebarElement.CURRICULUMS,
        children: <>Робочі навчальні плани</>
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
        sidebarElementName: "Дисципліни",
        sidebarElementType: SidebarElement.DISCIPLINES,
        children: <>Дисципліни</>
    },
    {
        sidebarElementName: "Індивідуальні плани викладачів",
        sidebarElementType: SidebarElement.PLANS,
        children: <>Індивідуальні плани викладачів</>
    },
    {
        sidebarElementName: "Навчальне навантаження НПП",
        sidebarElementType: SidebarElement.WORKLOAD,
        children: <>Навчальне навантаження НПП</>
    }
];

export {sidebarAdminElements, sidebarUserElements};
