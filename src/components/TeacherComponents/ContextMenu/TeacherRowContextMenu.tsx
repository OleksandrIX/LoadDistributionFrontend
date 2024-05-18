import {FC, JSX, RefObject} from "react";
import {ContextMenu} from "chakra-ui-contextmenu";
import {MenuItem, MenuList} from "@chakra-ui/react";

interface TeacherRowContextMenuProps {
    children: (ref: RefObject<HTMLTableRowElement> | null) => JSX.Element | null;
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const TeacherRowContextMenu: FC<TeacherRowContextMenuProps> = ({children, onView, onEdit, onDelete}) => {
    return (
        <ContextMenu<HTMLTableRowElement>
            renderMenu={() => (
                <MenuList>
                    <MenuItem onClick={onView}>Переглянути</MenuItem>
                    <MenuItem onClick={onEdit}>Редгувати</MenuItem>
                    <MenuItem onClick={onDelete}>Видалити</MenuItem>
                </MenuList>
            )}
        >
            {ref => children(ref)}
        </ContextMenu>
    );
};

export default TeacherRowContextMenu;
