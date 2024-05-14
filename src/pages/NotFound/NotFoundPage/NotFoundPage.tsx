import {FC} from "react";
import {Link} from "react-router-dom";

import {Footer, Header} from "components/LayoutComponents";

import "./NotFoundPage.scss";

const NotFoundPage: FC = () => {
    return (
        <div className="page-container">
            <Header/>

            <div className="page-container__not-found">
                <h1 className="not-found__title">Упс!</h1>
                <p className="not-found__message">Цю сторінку не знайдено.</p>
                <Link to="/">Перейти на домашню сторінку</Link>
            </div>

            <Footer/>
        </div>
    );
};

export {NotFoundPage};
