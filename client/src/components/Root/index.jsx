import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Aside } from "../ui/Aside";
import { Typo } from "../ui/Typo";
import { Avatar } from "../ui/Avatar";
import { User } from "../ui/User";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useFriendSuggestions } from "../../hooks/useFriendSuggestions";
import { useFriends } from "../../hooks/useFriends";
import { useGetUser } from "../../hooks/useGetUser";
import { usePosts } from "../../hooks/usePosts";
import titleIcon from "../../assets/icons/titleIcon.svg";
import postsIcon from "../../assets/icons/postsIcon.svg";
import friendsIcon from "../../assets/icons/friendsIcon.svg";
import exitIcon from "../../assets/icons/exitIcon.svg";
import plusGreyIcon from "../../assets/icons/plusGreyIcon.svg";

import * as SC from "./styles";

export const Root = () => {
    const { user, updateUser, logout } = useAuth();
    const suggestionsState = useFriendSuggestions();
    const { suggestions, refetchSuggestions } = suggestionsState;
    const friendsState = useFriends();
    const { addFriend, refetchFriends } = friendsState;
    const postsState = usePosts();
    const { refetchPosts } = postsState;
    const getUser = useGetUser();
    const navigate = useNavigate();

    const handleAddFriend = async(friendId) => {
        await addFriend({ userId: user._id, friendId });
        await refetchSuggestions();
        await refetchFriends();

        const updatedUser = await getUser(user._id);
        updateUser(updatedUser);

        await refetchPosts();
    };

    useEffect(() => {
            if (user?._id) {
                refetchSuggestions();
            }
    }, [user?._id, refetchSuggestions]);

    return (
        <SC.Wrapper>
            <Aside>
                <SC.LeftSidebar>
                    <SC.CompanyInfo>
                        <img src="../../../public/favicon.svg" alt="Company Icon" width='32px' />
                        <img src={titleIcon} alt="Company Title" />
                    </SC.CompanyInfo>
                    <SC.Menu>
                        <SC.MenuItem to={'/'}>
                            <img src={postsIcon} alt="Posts Icon" />
                            Лента
                        </SC.MenuItem>
                        <SC.MenuItem to={'/friends'}>
                            <img src={friendsIcon} alt="Friends Icon" />
                            Друзья
                        </SC.MenuItem>
                    </SC.Menu>
                    {
                        user && <SC.UserInfo>
                            <User user={user}/>
                            <SC.Exit onClick={() => logout()} src={exitIcon} alt="Exit Icon" />
                        </SC.UserInfo>
                    }
                </SC.LeftSidebar>
            </Aside>
            <Outlet context={{ friendsState, suggestionsState, postsState }}/>
            <Aside>
                <SC.RightSidebar>
                    <SC.UserArea>
                        { 
                            user ? <Avatar /> : <Button onClick={() => navigate('/auth')}>Войти</Button>
                        }
                    </SC.UserArea>
                    { 
                        (suggestions.length > 0 && user) && <SC.FriendSuggestions>
                            <SC.FriendSuggestionsField>
                                <Typo variant="title">Возможные друзья</Typo>
                            </SC.FriendSuggestionsField>
                            {
                                suggestions.map((user) => <SC.FriendSuggestionsField key={user._id}>
                                    <SC.UserDescription>
                                        <User user={user}/>
                                    </SC.UserDescription>
                                    <SC.PlusIcon onClick={() => handleAddFriend(user._id)} src={plusGreyIcon} alt="Plus Icon" />
                                </SC.FriendSuggestionsField>
                                )
                            }
                        </SC.FriendSuggestions>
                    }
                </SC.RightSidebar>
            </Aside>
        </SC.Wrapper>
    )
};