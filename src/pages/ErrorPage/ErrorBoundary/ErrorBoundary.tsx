import {FC} from "react";
import axios from "axios";
import {NavLink, useRouteError} from "react-router-dom";

import "../ErrorPage.scss";

const ErrorBoundary: FC = () => {
    const error = useRouteError();

    return (
        <div className="error-page">
            {
                axios.isAxiosError(error)
                    ? <>
                        <p className="error-page__content">{error.message}</p>
                        <NavLink className="error-page__link" to="/">Повернутися на домашню сторінку</NavLink>
                    </>
                    : <>
                        <p className="error-page__content">Невідома помилка</p>
                        <NavLink className="error-page__link" to="/">Повернутися на домашню сторінку</NavLink>
                    </>
            }
        </div>
    );
};

export default ErrorBoundary;
