import {FC} from "react";
import {Outlet} from "react-router-dom";
import {Spinner} from "@chakra-ui/react";

import {Header} from "components/LayoutComponents/Header/Header";
import {Footer} from "components/LayoutComponents/Footer/Footer";
import {useAuth} from "app/provider/AuthProvider";
import "./Layout.scss";

const Layout: FC = () => {
    const {isLoading} = useAuth();

    return (
        <>
            {
                isLoading ?
                    <div className="page-loader">
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </div>
                    :
                    <div className="page-container">
                        <Header/>
                        <main className="page__body">
                            <Outlet/>
                        </main>
                        <Footer/>
                    </div>
            }
        </>
    );

};

export default Layout;
