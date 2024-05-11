import {FC} from "react";
import {Outlet} from "react-router-dom";
import {Header} from "components/LayoutComponents/Header/Header";
import {Footer} from "components/LayoutComponents/Footer/Footer";
import "./Layout.scss";

const Layout: FC = () => {
    return (
        <div className="page-container">
            <Header/>

            <main className="page__body">
                <Outlet/>
            </main>

            <Footer/>
        </div>
    );
};

export {Layout};
