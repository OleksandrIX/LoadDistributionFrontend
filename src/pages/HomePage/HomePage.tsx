import {FC} from "react";

import {SidebarProvider, useAuth} from "app/provider";
import {HomePageWrapper, Intro} from "components/HomeComponents";

import "./HomePage.scss";


const HomePage: FC = () => {
    const {user} = useAuth();

    return (
        <SidebarProvider>
            <div className="home-page">
                {user ? <HomePageWrapper/> : <Intro/>}
            </div>
        </SidebarProvider>
    );
};

export default HomePage;
