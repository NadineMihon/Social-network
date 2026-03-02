import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useFriends = () => {
    const [friends, setFriends] = useState([]);
    
    const { user } = useAuth();

    const BASE_URL = `http://localhost:3003/api/users`;

    const getFriends = useCallback(
        async (id) => {
            try {
                if (!user) return;

                const response = await fetch(`http://localhost:3003/api/users/${id}/friends`);

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Возникла ошибка при получении списка друзей');
                }

                const friends = await response.json();
                setFriends(friends);
            } catch (e) {
                console.log(e);
                throw e;
            }
        }, [user]
    );

    const refetchFriends =  useCallback(async () => {
        if (!user || !user._id) return;

        await getFriends(user._id);
    }, [user, getFriends]);

    const asyncAction = useCallback(async (endpoint, options = {}) =>{
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                ...options
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Возникла ошибка');
            }

            return await response.json();

        } catch (e) {
            console.log(e);
            throw e;
        }
    }, []);

    const addFriend = useCallback(async (data) => {
        return asyncAction(`/${data.userId}/addFriend`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    }, [asyncAction]);

    const removeFriend = useCallback(async (data) => {
        return asyncAction(`/${data.userId}/removeFriend`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    }, [asyncAction]);

    useEffect(() => {
        refetchFriends();
    }, [refetchFriends]);

    return {
        friends,
        refetchFriends,
        addFriend,
        removeFriend,
    }
};