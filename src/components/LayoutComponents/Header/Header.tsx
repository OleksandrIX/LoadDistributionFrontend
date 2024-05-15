import {FC} from "react";
import {NavLink, useNavigate} from "react-router-dom";

import {useAuth} from "app/provider/AuthProvider";
import {NavigationList} from "../NavigationList/NavigationList";
import {Logo} from "../Logo/Logo";
import {Logo as LogoImage} from "assets/media/images";

import "./Header.scss";

const Header: FC = () => {
    const navigate = useNavigate();
    const {user, logout} = useAuth();

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

            <nav className="header__navigation">
                <NavigationList
                    listClassName="nav-list"
                    listItemClassName="nav-list__element"
                    linkClassName="nav-list__link"
                >
                    <li className="nav-list__element">
                        {!user ?
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
            </nav>
        </header>
    );
};

export {Header};
