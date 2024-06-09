import {FC} from "react";
import {Box, Stack, Tooltip} from "@chakra-ui/react";

import {useAuth, useSidebar} from "app/provider";
import {SidebarElement} from "types/enums";
import {sidebarAdminElements, sidebarUserElements} from "./Sidebar.data";

import "./Sidebar.scss";


const Sidebar: FC = () => {
    const {isAdmin} = useAuth();
    const {selectedElement, setSelectedElement} = useSidebar();

    const handleSelectElement = (element: SidebarElement) => setSelectedElement(element);

    return (
        <Stack
            mt={10} mb={2} mx={2}
            position="sticky" top={10}
            w="fit-content" h="fit-content"
            py={4} px={2}
            bg="brand.500"
            borderRadius="lg"
            spacing={2}
        >
            {isAdmin
                ? sidebarAdminElements.map((sidebarElement) =>
                    <Box
                        key={sidebarElement.sidebarElementType}
                        cursor="pointer"
                        color="white"
                        borderRadius="lg"
                        transition="background-color .4s ease-in-out"
                        _hover={{bg: "brand.600"}}
                        className={`sidebar-element ${selectedElement === sidebarElement.sidebarElementType && "active"}`}
                        onClick={() => handleSelectElement(sidebarElement.sidebarElementType)}>
                        <Tooltip label={sidebarElement.sidebarElementName}>
                            <Box p={2} w="fit-content">
                                {sidebarElement.sidebarElementIcon}
                            </Box>
                        </Tooltip>
                    </Box>
                )
                : sidebarUserElements.map((sidebarElement) =>
                    <Box key={sidebarElement.sidebarElementType}
                         cursor="pointer"
                         color="white"
                         borderRadius="lg"
                         transition="background-color .4s ease-in-out"
                         _hover={{bg: "brand.600"}}
                         className={`sidebar-element ${selectedElement === sidebarElement.sidebarElementType && "active"}`}
                         onClick={() => handleSelectElement(sidebarElement.sidebarElementType)}>
                        <Tooltip label={sidebarElement.sidebarElementName}>
                            <Box p={2} w="fit-content">
                                {sidebarElement.sidebarElementIcon}
                            </Box>
                        </Tooltip>
                    </Box>
                )
            }
        </Stack>
    );
};

export default Sidebar;
