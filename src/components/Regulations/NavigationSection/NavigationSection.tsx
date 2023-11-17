import { FC } from "react";
import { sections } from "../sections";
import "./NavigationSection.scss";

const NavigationSection: FC = () => {
    return (
        <nav className="navigation">
            <h3 className="navigation__title">НАВІГАЦІЯ</h3>
            <ul className="navigation__list">
                {sections.map((section, index)=>(
                    <li key={index} className="navigation__element">
                        <a href={`#${section.id}`} className="navigation__link">
                            {section.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export { NavigationSection };
