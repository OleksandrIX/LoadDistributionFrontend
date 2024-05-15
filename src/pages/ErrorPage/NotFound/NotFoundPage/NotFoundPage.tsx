import {FC} from "react";
import {NavLink} from "react-router-dom";

import "../../ErrorPage.scss";

const NotFoundPage: FC = () => {
    return (
        <div className="error-page">
            <h1 className="error-page__title">404 - Not Found</h1>
            <p className="error-page__content">Сторінки за цим посиланням не існує</p>
            <NavLink className="error-page__link" to="/">Перейти на домашню сторінку</NavLink>
        </div>
    );
};

export default NotFoundPage;
