import { Avatar } from "../Avatar";
import { Typo } from "../Typo";

import * as SC from "./styles";

export const User = ({ user }) => {
    return (
        <SC.User>
            <Avatar />
            <SC.Name>
                <Typo variant="subtitle">{user.username}</Typo>
                <Typo data-tone="muted">{user.role === 'user' ? 'Пользователь' : 'Администратор'}</Typo>
            </SC.Name>
        </SC.User>    
    )
};