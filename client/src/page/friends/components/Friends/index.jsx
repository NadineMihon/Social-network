import { useState, useEffect } from "react";
import { Container } from "../../../../components/ui/Container";
import { Friend } from "../Friend";
import { Typo } from "../../../../components/ui/Typo";
import { Loader } from "../../../../components/ui/Loader";
import { useAuth } from "../../../../hooks/useAuth";

import * as SC from "./styles";

export const Friends = ({ friends, removeFriend, refetchSuggestions, refetchPosts, refetchFriends,}) => {
    const { user } = useAuth();

    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        if (!user?._id) return;
    
        const load = async () => {
            await refetchFriends();
            setInitialLoading(false);
        };
    
        load();
    }, [user?._id, refetchFriends]);

    if (initialLoading) return <Loader />;

    return (
        <Container>
            {
                user ? <SC.FriendsItems>
                        {
                            friends && friends.length ? friends.map((friend) => <Friend
                                friend={friend} 
                                key={friend._id}
                                removeFriend={removeFriend}
                                refetchSuggestions={refetchSuggestions}
                                refetchPosts={refetchPosts}
                                refetchFriends={refetchFriends}
                            />)
                            : <Typo variant="subtitle">Список друзей пуст</Typo> 
                        
                        }
                    </SC.FriendsItems>
                    : <SC.FriendsItems>
                        <Typo variant="subtitle">Необходима авторизация</Typo>
                    </SC.FriendsItems>
            }
        </Container>
    )
};