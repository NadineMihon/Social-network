import { useEffect } from "react";
import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Input } from "../../components/ui/Input";
import { Toolbar } from "../../components/ui/Toolbar";
import { Typo } from "../../components/ui/Typo";
import { User } from "../../components/ui/User";
import { DeleteIcon } from "../../components/ui/DeleteIcon";
import { useAuth } from "../../hooks/useAuth";
import { useOutletContext } from "react-router-dom";
import { useGetUser } from "../../hooks/useGetUser";

import * as SC from "./styles";

export const FriendsPage = () => {
    const { friendsState, suggestionsState, postsState } = useOutletContext();
    const { friends, refetchFriends, removeFriend } = friendsState;
    const { refetchSuggestions } = suggestionsState;
    const { refetchPosts } = postsState;

    const { user, setUser } = useAuth();

    const getUser = useGetUser();

    const handleRemoveFriend = async(friendId) => {
        await removeFriend({ userId: user._id, friendId });
        await refetchSuggestions();
        await refetchFriends();

        const updateUser = await getUser(user._id);
        setUser(updateUser);

        await refetchPosts();
    };

    useEffect(() => {
        if (user?._id) {
            refetchFriends();
        }
    }, [user?._id, refetchFriends]);

    return (
        <Container>
            <Toolbar>
                <Input
                    name="search"
                    type="text"
                    placeholder="Поиск по друзьям"
                />
            </Toolbar>
            <SC.FriendsWrapper>
                <Card>
                    {
                        user ? <SC.Friends>
                            {
                                friends.length && user ? friends.map((user) => <SC.Friend key={user._id}>
                                    <User user={user}  />
                                    <DeleteIcon onClick={() => handleRemoveFriend(user._id)}/>
                                </SC.Friend>)
                                : <Typo variant="subtitle">Список друзей пуст</Typo>
                            }
                        </SC.Friends> 
                            : <SC.Friends>
                                <Typo variant="subtitle">Необходима авторизация</Typo>    
                            </SC.Friends>
                    }
                </Card>                          
            </SC.FriendsWrapper>
        </Container>
    )
};