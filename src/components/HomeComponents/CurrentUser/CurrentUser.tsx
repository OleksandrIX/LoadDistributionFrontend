import {FC} from "react";
import {Box, Stack} from "@chakra-ui/react";

import Sidebar from "../Sidebar/Sidebar";
import {useAuth, useSidebar} from "app/provider";
import {Profile} from "components/UserComponents";
import {TeacherWrapper} from "components/TeacherComponents";
import {SidebarElement} from "types/enums";

import "./CurrentUser.scss";

const CurrentUser: FC = () => {
    const {user, department} = useAuth();
    const {selectedElement} = useSidebar();

    const getSelectedComponent = () => {
        switch (selectedElement) {
            case SidebarElement.PROFILE:
                return user && department && <Profile user={user} department={department}/>;
            case SidebarElement.EMPLOYEES:
                return <TeacherWrapper/>;
            case SidebarElement.DISCIPLINES:
                return <h1>Disciplines</h1>;
            case SidebarElement.PLANS:
                return <h1>Plans</h1>;
            case SidebarElement.WORKLOAD:
                return <h1>Workload</h1>;
            default:
                return <h1>UNKNOWN</h1>;
        }
    };

    return (
        <Stack
            className="current-user"
            minHeight="90vh"
            direction="row"
            gap={5}
        >
            <Sidebar/>
            <Box className="current-user__content">
                {getSelectedComponent()}
            </Box>
        </Stack>
    );
};

export default CurrentUser;
