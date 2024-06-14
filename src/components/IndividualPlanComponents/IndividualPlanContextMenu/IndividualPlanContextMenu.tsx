import {FC, JSX, RefObject} from "react";
import {MenuItem, MenuList} from "@chakra-ui/react";
import {ContextMenu} from "chakra-ui-contextmenu";

interface IndividualPlanContextMenuProps {
    children: (ref: RefObject<HTMLDivElement> | null) => JSX.Element | null;
}

const IndividualPlanContextMenu: FC<IndividualPlanContextMenuProps> = ({children}) => {
    return (
        <ContextMenu<HTMLDivElement>
            renderMenu={() =>
                <MenuList>
                    <MenuItem>Завантажити</MenuItem>
                </MenuList>
            }
        >
            {ref => children(ref)}
        </ContextMenu>
    );
};

export default IndividualPlanContextMenu;
