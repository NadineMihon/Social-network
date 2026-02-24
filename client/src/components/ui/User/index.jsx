import { Avatar } from "../Avatar";
import { Typo } from "../Typo";

import * as SC from "./styles";

export const User = ({ user }) => {
    const currentUser = user || { name: 'Имя Фамилия', role: 'Пользователь' };
    return (
        <SC.User>
            <Avatar />
            <SC.Name>
                <Typo variant="subtitle">{currentUser.name}</Typo>
                <Typo data-tone="muted">{currentUser.role}</Typo>
            </SC.Name>
        </SC.User>    
    )
};