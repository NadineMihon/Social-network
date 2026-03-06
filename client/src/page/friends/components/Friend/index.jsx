import { ConfirmDelete } from "../../../../components/ui/ConfirmDelete";
import { User } from "../../../../components/ui/User";
import { useAuth } from "../../../../hooks/useAuth";
import { useGetUser } from "../../../../hooks/useGetUser";

import * as SC from "./styles";

export const Friend = ({ friend, removeFriend, refetchSuggestions, refetchFriends, refetchPosts }) => {
    const { user, updateUser } = useAuth();

    const getUser = useGetUser();

    const handleRemoveFriend = async() => {
        await removeFriend({ userId: user._id, friendId: friend._id });
        await refetchSuggestions();
        await refetchFriends();

        const updatedUser = await getUser(user._id);
        updateUser(updatedUser);

        await refetchPosts();
    };

    return (
        <SC.Friend>
            <User user={friend}  />
            <ConfirmDelete onConfirm={handleRemoveFriend}/>
        </SC.Friend>
    )
};