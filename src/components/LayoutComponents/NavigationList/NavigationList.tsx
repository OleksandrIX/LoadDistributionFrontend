import { FC } from "react";
import { NavLink } from "react-router-dom";
import {navigationList} from "./NavigationList.data";

interface NavigationListProps {
    listClassName: string;
    listItemClassName: string;
    linkClassName: string;
}

const NavigationList: FC<NavigationListProps> = ({
                                                     listClassName,
                                                     listItemClassName,
                                                     linkClassName
                                                 }) => {
    return (
        <ul className={listClassName}>
            {navigationList.map((navigationItem, index) => (
                <li className={listItemClassName} key={index}>
                    <NavLink className={linkClassName} to={navigationItem.to}>
                        {navigationItem.content}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export { NavigationList };
