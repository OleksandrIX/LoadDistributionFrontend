import {FC, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";

import {useAuth} from "app/provider/AuthProvider";
import {NavigationList} from "../NavigationList/NavigationList";

import "./HamburgerMenu.scss";

const HamburgerMenu: FC = () => {
    const navigate = useNavigate();
    const {user, logout} = useAuth();
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
                >
                    <li className="nav-list__element">
                        {!user
                            ?
                            <NavLink className="nav-list__link" to="/login">
                                Увійти
                            </NavLink>
                            :
                            <button className="nav-list__btn" onClick={() => {
                                logout();
                                navigate("/");
                            }}>
                                Вийти
                            </button>
                        }
                    </li>
                </NavigationList>
            </div>
        </nav>
    );
};

export {
    HamburgerMenu
};
