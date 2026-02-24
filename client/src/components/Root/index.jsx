import { Aside } from "../ui/Aside";
import { Typo } from "../ui/Typo";
import { Avatar } from "../ui/Avatar";
import { User } from "../ui/User";
import { Button } from "../ui/Button";
import { Outlet } from "react-router-dom";
import titleIcon from "../../assets/icons/titleIcon.svg";
import postsIcon from "../../assets/icons/postsIcon.svg";
import friendsIcon from "../../assets/icons/friendsIcon.svg";
import exitIcon from "../../assets/icons/exitIcon.svg";
import plusGreyIcon from "../../assets/icons/plusGreyIcon.svg";

import * as SC from "./styles";

const friendSuggestions = [
    {
        id: 1,
        name: 'Имя Фамилия',
        login: '@user1',
    },
    {
        id: 2,
        name: 'Имя Фамилия',
        login: '@user2',
    },
    {
        id: 3,
        name: 'Имя Фамилия',
        login: '@user3',
    },
    {
        id: 4,
        name: 'Имя Фамилия',
        login: '@user4',
    },
];

export const Root = () => {
    return (
        <SC.Wrapper>
            <Aside>
                <SC.LeftSidebar>
                    <SC.CompanyInfo>
                        <img src="../../../public/favicon.svg" alt="Company Icon" width='32px'/>
                        <img src={titleIcon} alt="Company Title" /> 
                    </SC.CompanyInfo>
                    <SC.Menu>
                        <SC.MenuItem to={'/'}>
                            <img src={postsIcon} alt="Posts Icon"  />
                            Лента
                        </SC.MenuItem>
                        <SC.MenuItem to={'/friends'}>
                            <img src={friendsIcon} alt="Friends Icon"  />
                            Друзья
                        </SC.MenuItem>     
                    </SC.Menu>
                    <SC.UserInfo>
                        <User />
                        <SC.Exit src={exitIcon} alt="Exit Icon" />
                    </SC.UserInfo>
                </SC.LeftSidebar>
            </Aside>
            <Outlet />
            <Aside>
                <SC.RightSidebar>
                    <SC.UserArea>
                        <Avatar />
                        <Button>Войти</Button>
                    </SC.UserArea>
                    <SC.FriendSuggestions>
                        <SC.FriendSuggestionsField>
                            <Typo variant="title">Возможные друзья</Typo>
                        </SC.FriendSuggestionsField>
                        {
                            friendSuggestions.map((user) => <SC.FriendSuggestionsField key={user.id}>
                                <SC.UserDescription>
                                    <Avatar />
                                    <SC.UserName>
                                        <Typo data-weight="bold">{user.name}</Typo>
                                        <Typo data-tone="muted">{user.login}</Typo>
                                    </SC.UserName>
                                </SC.UserDescription>
                                <SC.PlusIcon src={plusGreyIcon} alt="Plus Icon" />
                            </SC.FriendSuggestionsField>
                            )
                        }
                    </SC.FriendSuggestions>
                </SC.RightSidebar>
            </Aside>
        </SC.Wrapper>
    )
};