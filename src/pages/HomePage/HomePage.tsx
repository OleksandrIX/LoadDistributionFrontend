import {FC} from "react";

import {SidebarProvider, useAuth} from "app/provider";
import {HomePageWrapper, Intro} from "components/HomeComponents";


const HomePage: FC = () => {
    const {user} = useAuth();

    return (
        <SidebarProvider>
            {user ? <HomePageWrapper/> : <Intro/>}
        </SidebarProvider>
    );
};

export default HomePage;
