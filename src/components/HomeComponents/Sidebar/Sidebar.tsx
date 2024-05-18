import {FC} from "react";
import {Box, Stack, Text} from "@chakra-ui/react";

import {useSidebar} from "app/provider";
import {SidebarElement} from "types/enums";

import "./Sidebar.scss";


const Sidebar: FC = () => {
    const {selectedElement, setSelectedElement} = useSidebar();

    const handleSelectElement = (element: SidebarElement) => setSelectedElement(element);

    return (
        <Box className="sidebar" bg="brand.500">
            <Stack className="sidebar-wrapper" direction="column" spacing={2}>
                <Box className={`sidebar__element ${selectedElement === SidebarElement.PROFILE && "active"}`}
                     onClick={() => handleSelectElement(SidebarElement.PROFILE)}>
                    <Text fontSize="lg">
                        Профіль
                    </Text>
                </Box>
                <Box className={`sidebar__element ${selectedElement === SidebarElement.EMPLOYEES && "active"}`}
                     onClick={() => handleSelectElement(SidebarElement.EMPLOYEES)}>
                    <Text fontSize="lg">
                        Науково-педагогічні працівники
                    </Text>
                </Box>
                <Box className={`sidebar__element ${selectedElement === SidebarElement.DISCIPLINES && "active"}`}
                     onClick={() => handleSelectElement(SidebarElement.DISCIPLINES)}>
                    <Text fontSize="lg">
                        Дисципліни
                    </Text>
                </Box>
                <Box className={`sidebar__element ${selectedElement === SidebarElement.PLANS && "active"}`}
                     onClick={() => handleSelectElement(SidebarElement.PLANS)}>
                    <Text fontSize="lg">
                        Індивідуальні плани викладачів
                    </Text>
                </Box>
                <Box className={`sidebar__element ${selectedElement === SidebarElement.WORKLOAD && "active"}`}
                     onClick={() => handleSelectElement(SidebarElement.WORKLOAD)}>
                    <Text fontSize="lg">
                        Навчальне навантаження НПП
                    </Text>
                </Box>
            </Stack>
        </Box>
    );
};

export default Sidebar;
