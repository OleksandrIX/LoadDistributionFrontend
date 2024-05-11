import {FC} from "react";
import {NavLink} from "react-router-dom";
import {navigationList} from "./NavigationList.data";

interface NavigationListProps {
    listClassName: string;
    listItemClassName: string;
    linkClassName: string;
}

const NavigationList: FC<NavigationListProps> = (props) => {
    return (
        <ul className={props.listClassName}>
            {navigationList.map((navigationItem, index) => (
                <li className={props.listItemClassName} key={index}>
                    <NavLink className={props.linkClassName} to={navigationItem.to}>
                        {navigationItem.content}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export {NavigationList};
