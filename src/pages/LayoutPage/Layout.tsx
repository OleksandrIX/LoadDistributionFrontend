import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "components/LayoutComponents/Header/Header";
import { Footer } from "components/LayoutComponents/Footer/Footer";
import Marquee from "react-fast-marquee";
import "react-toastify/dist/ReactToastify.css";
import "./Layout.scss";

const Layout: FC = () => {
    return (
        <div className="page-container">
            <Marquee className="marquee" speed={100}>
                Darkness cannot drive out darkness: only light can do that.
            </Marquee>
            <Header />

            <main className="page__body">
                <Outlet />
            </main>

            <Footer />

            <ToastContainer
                style={{
                    maxWidth: 500,
                    minWidth: 300,
                    width: "fit-content"
                }}
            />
        </div>
    );
};

export { Layout };
