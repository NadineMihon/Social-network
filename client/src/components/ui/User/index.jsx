import { Avatar } from "../Avatar";
import { Typo } from "../Typo";

import * as SC from "./styles";

export const User = ({ user }) => {
    const currentUser = user || { username: 'Имя Фамилия', role: 'Пользователь' };
    return (
        <SC.User>
            <Avatar />
            <SC.Name>
                <Typo variant="subtitle">{currentUser.username}</Typo>
                <Typo data-tone="muted">{currentUser.role = 'user' ? 'Пользователь' : 'Администратор'}</Typo>
            </SC.Name>
        </SC.User>    
    )
};