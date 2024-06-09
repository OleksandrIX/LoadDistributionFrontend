import {FC} from "react";
import {Outlet} from "react-router-dom";

import {useAuth} from "app/provider";
import {Loader} from "components/UI";
import {Header, Footer} from "components/LayoutComponents";

import "./Layout.scss";

const Layout: FC = () => {
    const {isLoading} = useAuth();

    return (
        <div className="page-container">

            {isLoading ? (
                <div className="loader-wrapper">
                    <Loader/>
                </div>
            ) : (
                <>
                    <Header/>
                    <main className="page__body">
                        <Outlet/>
                    </main>
                    <Footer/>
                </>
            )}
        </div>
    );
};

export default Layout;
