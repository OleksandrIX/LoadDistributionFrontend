import { FC } from "react";
import { sections, NavigationSection } from "components/Regulations";
import "./RegulationsPage.scss";

const RegulationsPage: FC = () => {
    return (
        <div className="regulations">
            <NavigationSection />
            <div className="sections">
                {sections.map((section, index) => (
                    <section.element key={index} id={section.id} name={section.name} />
                ))}
            </div>
        </div>
    );
};

export { RegulationsPage };
