import {FC, useEffect, useState} from "react";
import {NavigationList} from "../NavigationList/NavigationList";
import {Logo} from "../Logo/Logo";
import {HamburgerMenu} from "../HamburgerMenu/HamburgerMenu";
import {Logo as LogoImage} from "assets/media/images";
import "./Header.scss";

const Header: FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const isMobile = windowWidth < 768;
    const handleResize = () => setWindowWidth(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="page__header">
            <Logo className="logo__img" imgSrc={LogoImage} altText="Logo">
                <p className="logo__text">
                    Розподіл
                    <br/>
                    навчального
                    <br/>
                    навантаження
                </p>
            </Logo>

            {!isMobile ? (
                <nav className="header__navigation">
                    <NavigationList
                        listClassName="nav-list"
                        listItemClassName="nav-list__element"
                        linkClassName="nav-list__link"
                    />
                </nav>
            ) : (
                <HamburgerMenu/>
            )}
        </header>
    );
};

export {Header};
