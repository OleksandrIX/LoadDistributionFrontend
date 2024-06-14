import {FC, JSX, RefObject} from "react";
import {MenuItem, MenuList, useDisclosure} from "@chakra-ui/react";
import {ContextMenu} from "chakra-ui-contextmenu";
import {ResponseDiscipline} from "entities/discipline";
import EducationComponentTable from "../DisciplineOverlayComponents/EducationComponentTable/EducationComponentTable";

interface DisciplineContextMenuProps {
    children: (ref: RefObject<HTMLTableRowElement> | null) => JSX.Element | null;
    discipline: ResponseDiscipline;
}

const DisciplineContextMenu: FC<DisciplineContextMenuProps> = ({children, discipline}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <ContextMenu<HTMLTableRowElement>
                renderMenu={() =>
                    <MenuList>
                        <MenuItem onClick={onOpen}>Переглянути</MenuItem>
                    </MenuList>
                }
            >
                {ref => children(ref)}
            </ContextMenu>

            <EducationComponentTable
                isOpen={isOpen}
                onClose={onClose}
                discipline={discipline}
            />
        </>
    );
};

export default DisciplineContextMenu;
