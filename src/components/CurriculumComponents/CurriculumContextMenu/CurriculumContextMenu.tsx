import {FC, JSX, RefObject} from "react";
import {ContextMenu} from "chakra-ui-contextmenu";
import {MenuItem, MenuList} from "@chakra-ui/react";

interface CurriculumContextMenuProps {
    children: (ref: RefObject<HTMLTableRowElement> | null) => JSX.Element | null;
    onDownload: () => void;
    onDelete: () => void;
}

const CurriculumContextMenu: FC<CurriculumContextMenuProps> = ({children, onDownload, onDelete}) => {
    return (
        <ContextMenu<HTMLTableRowElement>
            renderMenu={() =>
                <MenuList>
                    <MenuItem onClick={onDownload}>Завантажити</MenuItem>
                    <MenuItem onClick={onDelete}>Видалити</MenuItem>
                </MenuList>
            }
        >
            {ref => children(ref)}
        </ContextMenu>
    );
};

export default CurriculumContextMenu;
