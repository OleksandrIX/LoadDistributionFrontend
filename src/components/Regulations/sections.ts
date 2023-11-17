import { ComponentType } from "react";
import { RegulationDocuments } from "./RegulationDocuments/RegulationDocuments";
import { SecondSection } from "./SecondSection/SecondSection";
import { ThirdSection } from "./ThirdSection/ThirdSection";

type Section = {
    id: string;
    name: string;
    element: ComponentType<SectionProp>;
}

const sections: Section[] = [
    {
        id: "regulation-documents",
        name: "Нормативно-правові документи",
        element: RegulationDocuments
    } as Section,
    {
        id: "section2",
        name: "Розділ 2",
        element: SecondSection
    } as Section,
    {
        id: "section3",
        name: "Розділ 3",
        element: ThirdSection
    } as Section
];

export interface SectionProp {
    id: string;
    name: string;
}

export { sections };
