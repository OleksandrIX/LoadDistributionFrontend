import {FC} from "react";
import {DepartmentLogo} from "assets/media/images";
import "./HomePage.scss";


export const HomePage: FC = () => {
    return (
        <div className="home-page">
            <section className="intro">
                <div className="intro__block intro__block_right">
                    <img className="intro__image" src={DepartmentLogo} alt="Department 22"/>
                    <p className="intro__text">
                        Ця інформаційна система призначений для автоматизації розподілу навчального навантаження
                        науково-педагогічних працівників закладів вищої освіти.
                    </p>
                </div>
            </section>
        </div>
    );
};
