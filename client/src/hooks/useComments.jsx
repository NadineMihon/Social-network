import { useState, useCallback, useEffect } from "react";
import { useAuth } from "./useAuth";

export const useComments = (postId) => {
    const [comments, setComments] = useState([]);

    const BASE_URL = `http://localhost:3003/api/comments`;

    const asyncAction = useCallback(async (endpoint, options = {}) => {
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

    const getComments = useCallback(async () => {
        try {
            const data = await asyncAction('/list', {
                method: 'POST',
                body: JSON.stringify({ postId }),
            });

            const comments = (data.comments || []).map((comment) =>({
                ...comment,
                createdAt: formatDate(comment.createdAt),
            }));

            setComments(comments);
        } catch (e) {
            console.log(e.message || 'Возникла ошибка при получении комментариев');
            throw e;
        }
    }, [asyncAction, postId]);

    const addComment = useCallback(async (data) => {
        return asyncAction('/add', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }, [asyncAction]);

    const deleteComment = useCallback(async (data) => {
        return asyncAction ('/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
        });
    }, [asyncAction]);

    const formatDate = (date) => {
        const d = new Date(date);
    
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
    
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
    
        return `${day}.${month}.${year}, ${hours}:${minutes}`;
    };

    useEffect(() => {
        getComments();
    }, [getComments]);

    return {
        comments,
        refetchComments: getComments,
        addComment,
        deleteComment,
    }
};