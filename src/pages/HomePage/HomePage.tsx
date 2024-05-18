import {FC} from "react";

import {SidebarProvider, useAuth} from "app/provider";
import {CurrentUser, Intro} from "components/HomeComponents";

import "./HomePage.scss";


const HomePage: FC = () => {
    const {user, isAdmin} = useAuth();


    return (
        <SidebarProvider>
            <div className="home-page">
                {user ? !isAdmin ? <CurrentUser/> : <h1>ADMIN</h1> : <Intro/>}
            </div>
        </SidebarProvider>
    );
};

export default HomePage;
