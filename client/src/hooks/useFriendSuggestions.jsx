import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useFriendSuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);

    const { user } = useAuth();

    const fetchSuggestions = useCallback(
        async (id) => {
            try {
                if (!user) return;

                const response = await fetch(`http://localhost:3003/api/users/${id}/suggestions`);

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Возникла ошибка при получении списка рекомендаций в друзья');
                    
                }

                const suggestions = await response.json();
                setSuggestions(suggestions);
            } catch (e) {
                console.log(e);
                throw e;
            }
        }, [user]
    );

    const refetchSuggestions = useCallback(async () => {
        if (!user || !user._id) return;

        await fetchSuggestions(user._id);
    }, [user, fetchSuggestions]);

    useEffect(() => {
        refetchSuggestions();
    }, [refetchSuggestions]);

    return {
        suggestions, 
        refetchSuggestions,
    }
};