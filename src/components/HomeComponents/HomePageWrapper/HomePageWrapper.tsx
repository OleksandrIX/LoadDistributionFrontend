import {FC} from "react";
import {Box, Stack} from "@chakra-ui/react";

import {useAuth, useSidebar} from "app/provider";
import {Sidebar, sidebarAdminElements, sidebarUserElements} from "../Sidebar";

const HomePageWrapper: FC = () => {
    const {isAdmin} = useAuth();
    const {selectedElement} = useSidebar();

    const getSelectedComponent = () => {
        let selectedSidebarElement;
        if (isAdmin) {
            selectedSidebarElement = sidebarAdminElements.find(element =>
                element.sidebarElementType === selectedElement);
        } else {
            selectedSidebarElement = sidebarUserElements.find(element =>
                element.sidebarElementType === selectedElement);
        }
        return selectedSidebarElement ? selectedSidebarElement.children : <h1>UNKNOWN</h1>;
    };

    return (
        <Stack
            gap={2}
            direction="row"
            minHeight="90vh"
        >
            <Sidebar/>
            <Box flex={1} p="10px">
                {getSelectedComponent()}
            </Box>
        </Stack>
    );
};

export default HomePageWrapper;
