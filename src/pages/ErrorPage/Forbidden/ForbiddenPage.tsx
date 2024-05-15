import {FC} from "react";
import {NavLink} from "react-router-dom";

import "../ErrorPage.scss";

const ForbiddenPage: FC = () => {
    return (
        <div className="error-page forbidden-page">
            <h1 className="error-page__title">403 - Forbidden</h1>
            <p className="error-page__content">У вас немає доступу до цієї сторінки</p>
            <NavLink className="error-page__link" to="/">Повернутися на домашню сторінку</NavLink>
        </div>
    );
};

export default ForbiddenPage;
