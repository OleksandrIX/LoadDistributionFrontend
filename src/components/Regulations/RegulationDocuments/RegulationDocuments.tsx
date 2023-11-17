import { FC } from "react";
import { regulationDocuments } from "./RegulationDocuments.data";
import { SectionProp } from "../sections";
import "./RegulationDocuments.scss";

const RegulationDocuments: FC<SectionProp> = ({ id }) => {
    return (
        <div className="regulation-documents">
            <h3 id={id} className="regulation-documents__title">
                Нормативно-правові документи, які регламентують порядок
                здійснення освітньої діяльності у ВВНЗ:
            </h3>

            {regulationDocuments.map((regulationDocument, index) => (
                <div className="regulation-document" key={index}>
                    <img className="regulation-document__img"
                         src={regulationDocument.img} alt="img" />

                    <a className="regulation-document__link" href={regulationDocument.link}
                       rel="noreferrer" target="_blank">
                        {regulationDocument.text}
                    </a>
                </div>
            ))}
        </div>
    );
};

export { RegulationDocuments };
