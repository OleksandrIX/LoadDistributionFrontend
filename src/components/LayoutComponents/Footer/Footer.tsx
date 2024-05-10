import {FC} from "react";
import {NavigationList} from "../NavigationList/NavigationList";
import {Logo} from "../Logo/Logo";
import logo from "assets/media/logo.png";
import "./Footer.scss";

const Footer: FC = () => {
    return (
        <footer className="page__footer">
            <div className="footer__container-info">
                <div className="footer__brand">
                    <Logo className="footer__brand-img" imgSrc={logo} altText="Logo">
                        <p className="logo__text">
                            Розподіл
                            <br/>
                            навчального
                            <br/>
                            навантаження
                        </p>
                    </Logo>
                </div>

                <div className="footer__partition"/>

                <div className="footer__pages">
                    <NavigationList
                        listClassName="footer-list"
                        listItemClassName="footer-list__item"
                        linkClassName="footer-list__link"
                    />
                </div>
            </div>

            <p className="footer__copyright-text">
                &copy; {new Date().getFullYear()}
                <span className="footer__company-name"> Кафедра 22</span>.
                Усі права захищені.
            </p>
        </footer>
    );
};

export {Footer};
