import { FC } from "react";
import DepartmentImage from "assets/media/Department22.png";
import Image from "assets/media/about-image.png";
import "./AboutPage.scss";

const AboutPage: FC = () => {
    return (
        <div className="about-website">
            <section className="intro">
                <div className="intro__block intro__block_left">
                    <p className="intro__text">
                        Цей сайт призначений для автоматизації начального відділу у вищих військових навчальних
                        закладах,
                        спрощення ведення обліку дисциплін та кафедр, а також надання можливості кафедрам проводити
                        викладання цих дисциплін.
                    </p>
                    <img className="intro__image" src={Image} alt="Department 22" />
                </div>

                <div className="intro__block intro__block_right">
                    <img className="intro__department-img" src={DepartmentImage} alt="Department 22" />
                    <p className="intro__text">
                        У майбутньому планується введення обліку викладання пар викладачами та розрахунок їх навчального
                        навантаження.
                    </p>
                </div>
            </section>
        </div>
    );
};

export { AboutPage };
