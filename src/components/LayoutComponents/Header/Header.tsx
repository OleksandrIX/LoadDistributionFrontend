import {FC} from "react";
import {NavLink, useNavigate} from "react-router-dom";

import {useAuth} from "app/provider";
import {NavigationList} from "../NavigationList/NavigationList";
import {Logo} from "../Logo/Logo";
import {Logo as LogoImage} from "assets/media/images";

import "./Header.scss";

const Header: FC = () => {
    const navigate = useNavigate();
    const {user, isAdmin, logout} = useAuth();

    const logoutButtonHandler = () => {
        logout();
        navigate("/");
    };

    const navigationLink = !user
        ? <NavLink className="nav-list__link" to="/login">Увійти</NavLink>
        : <button className="nav-list__btn" onClick={logoutButtonHandler}>Вийти</button>;

    return (
        <header className="page__header">
            <Logo className="logo__img" imgSrc={LogoImage} altText="Logo">
                <p className="logo__text">
                    Розподіл<br/>навчального<br/>навантаження
                </p>
            </Logo>

            <nav className="header__navigation">
                <NavigationList
                    listClassName="nav-list"
                    listItemClassName="nav-list__element"
                    linkClassName="nav-list__link"
                >
                    {isAdmin && <NavLink className="nav-list__link" to="/departments">Кафедри</NavLink>}
                    <li className="nav-list__element">{navigationLink}</li>
                </NavigationList>
            </nav>
        </header>
    );
};

export default Header;
