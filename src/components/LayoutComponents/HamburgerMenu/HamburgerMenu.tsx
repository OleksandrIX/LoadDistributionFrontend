import { FC, useState } from "react";
import { NavigationList } from "../NavigationList/NavigationList";
import "./HamburgerMenu.scss";

const HamburgerMenu: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const closeMenu = () => setIsMenuOpen(false);

    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    return (
        <nav className="header__navigation-menu">
            <div onClick={toggleMenu}
                className={
                    `header__hamburger-menu-btn ${
                        isMenuOpen ? "open" : ""
                    }`
                }
            >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            <div className="header__nav-list-wrapper" onClick={closeMenu}>
                <NavigationList
                    listClassName="nav-list"
                    listItemClassName="nav-list__element"
                    linkClassName="nav-list__link"
                />
            </div>
        </nav>
    );
};

export { HamburgerMenu };
