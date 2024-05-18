import {FC} from "react";
import {DepartmentLogo} from "assets/media/images";
import "./Intro.scss";

const Intro: FC = () => {
    return (
        <section className="intro">
            <div className="intro__block">
                <img className="intro__image" src={DepartmentLogo} alt="Department 22"/>
                <p className="intro__text">
                    Ця інформаційна система призначена для автоматизації розподілу навчального навантаження
                    науково-педагогічних працівників ЗВО.
                </p>
            </div>
        </section>
    );
};

export default Intro;
