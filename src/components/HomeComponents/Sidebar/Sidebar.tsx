import {FC} from "react";
import {Box, Stack, Text} from "@chakra-ui/react";

import {useAuth, useSidebar} from "app/provider";
import {SidebarElement} from "types/enums";
import {sidebarAdminElements, sidebarUserElements} from "./Sidebar.data";

import "./Sidebar.scss";


const Sidebar: FC = () => {
    const {isAdmin} = useAuth();
    const {selectedElement, setSelectedElement} = useSidebar();

    const handleSelectElement = (element: SidebarElement) => setSelectedElement(element);

    return (
        <Box className="sidebar" bg="brand.500">
            <Stack className="sidebar-wrapper" direction="column" spacing={2}>
                {isAdmin
                    ? sidebarAdminElements.map((sidebarElements) =>
                        <Box key={sidebarElements.sidebarElementType}
                             className={
                                 `sidebar__element ${selectedElement === sidebarElements.sidebarElementType && "active"}`
                             }
                             onClick={() => handleSelectElement(sidebarElements.sidebarElementType)}>
                            <Text fontSize="lg">
                                {sidebarElements.sidebarElementName}
                            </Text>
                        </Box>
                    )
                    : sidebarUserElements.map((sidebarElements) =>
                        <Box key={sidebarElements.sidebarElementType}
                             className={
                                 `sidebar__element ${selectedElement === sidebarElements.sidebarElementType && "active"}`
                             }
                             onClick={() => handleSelectElement(sidebarElements.sidebarElementType)}>
                            <Text fontSize="lg">
                                {sidebarElements.sidebarElementName}
                            </Text>
                        </Box>
                    )
                }
            </Stack>
        </Box>
    );
};

export default Sidebar;
