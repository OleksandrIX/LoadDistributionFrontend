import {FC, JSX, RefObject} from "react";
import {ContextMenu} from "chakra-ui-contextmenu";
import {MenuItem, MenuList} from "@chakra-ui/react";

interface DepartmentContextMenuProps {
    children: (ref: RefObject<HTMLTableRowElement> | null) => JSX.Element | null;
}

const DepartmentContextMenu: FC<DepartmentContextMenuProps> = ({children}) => {
    return (
        <ContextMenu<HTMLTableRowElement>
            renderMenu={() =>
                <MenuList>
                    <MenuItem onClick={() => alert("VIEWED")}>Переглянути</MenuItem>
                </MenuList>
            }
        >
            {ref => children(ref)}
        </ContextMenu>
    );
};

export default DepartmentContextMenu;
