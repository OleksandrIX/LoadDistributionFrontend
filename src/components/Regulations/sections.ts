import { ComponentType } from "react";
import { RegulationDocuments } from "./RegulationDocuments/RegulationDocuments";

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
    } as Section
];

export interface SectionProp {
    id: string;
    name: string;
}

export { sections };
