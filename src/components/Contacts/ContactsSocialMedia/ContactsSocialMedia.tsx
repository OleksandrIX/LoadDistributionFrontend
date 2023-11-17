import { FC } from "react";
import { ReactSVG } from "react-svg";
import { emailIcon, telegramIcon, telephoneIcon } from "assets/media/icon";
import "./ContactsSocialMedia.scss";

const ContactsSocialMedia: FC = () => {
    return (
        <div className="contacts__social-media">
            <h1 className="contacts__title">Де ви можете знайти нас</h1>

            <ul className="contacts__list">
                <li className="contact">
                    <ReactSVG className="contact__icon" src={emailIcon} />

                    <div className="contact__content">
                        <h4 className="contact__content-row">oleksandr@gmail.com</h4>
                    </div>
                </li>

                <li className="contact">
                    <ReactSVG className="contact__icon" src={telephoneIcon} />

                    <div className="contact__content">
                        <h4 className="contact__content-row">Київстар: +38(068)90-90-291</h4>
                        <h4 className="contact__content-row">Lifecell: +38(093)90-90-291</h4>
                    </div>
                </li>

                <li className="contact">
                    <ReactSVG className="contact__icon" src={telegramIcon} />

                    <div className="contact__content">
                        <h4 className="contact__content-row">
                            <a className="contact__content-row_link"
                               href="https://t.me/Oleksander"
                               rel="noreferrer" target="_blank">@Oleksandr</a>
                        </h4>
                    </div>
                </li>
            </ul>
        </div>);
};

export { ContactsSocialMedia };
