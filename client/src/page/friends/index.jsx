import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Input } from "../../components/ui/Input";
import { Toolbar } from "../../components/ui/Toolbar";
import { Friends } from "./components/Friends";
import { useOutletContext } from "react-router-dom";

import * as SC from "./styles";

export const FriendsPage = () => {
    const { friendsState, suggestionsState, postsState } = useOutletContext();
    const { friends, refetchFriends, removeFriend } = friendsState;
    const { refetchSuggestions } = suggestionsState;
    const { refetchPosts } = postsState;

    const [search, setSearch] = useState('');

    const filteredFriends = friends
        ? friends.filter((friend) => 
            friend.username.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <Container>
            <Toolbar>
                <Input
                    name="search"
                    type="text"
                    placeholder="Поиск по друзьям"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Toolbar>
            <SC.FriendsWrapper>
                <Card>
                    <Friends 
                        friends={filteredFriends} 
                        removeFriend={removeFriend}
                        refetchSuggestions={refetchSuggestions}
                        refetchPosts={refetchPosts}
                        refetchFriends={refetchFriends}>
                    </Friends> 
                </Card>                          
            </SC.FriendsWrapper>
        </Container>
    )
};