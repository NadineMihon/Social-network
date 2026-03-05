import { Container } from "../../../../components/ui/Container";
import { Friend } from "../Friend";
import { Typo } from "../../../../components/ui/Typo";
import { Loader } from "../../../../components/ui/Loader";
import { Card } from "../../../../components/ui/Card";
import { useAuth } from "../../../../hooks/useAuth";

import * as SC from "./styles";

export const Friends = ({ friends, isFriendsLoading, removeFriend, refetchSuggestions, refetchPosts, refetchFriends }) => {
    const { user, isAuthLoading } = useAuth();

    if (isAuthLoading) return <Loader />;

    if (!user) {
        return (
            <Container>
                <Card>
                    <SC.FriendsItems>
                        <Typo variant="subtitle">Необходима авторизация</Typo>
                    </SC.FriendsItems>
                </Card>
            </Container>
        );
    }
    
    if (!isFriendsLoading && friends === null) {
        return <Loader />;
    }

    return (
        <Container>
            <SC.FriendsItems>
                {
                    friends && friends.length ? (
                        friends.map((friend) => (
                            <Friend
                                friend={friend} 
                                key={friend._id}
                                removeFriend={removeFriend}
                                refetchSuggestions={refetchSuggestions}
                                refetchPosts={refetchPosts}
                                refetchFriends={refetchFriends}
                            />
                        ))
                    ) : (
                        <Typo variant="subtitle">Список друзей пуст</Typo>    
                    )
                }                             
            </SC.FriendsItems>
        </Container>
    )
};