import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const usePosts = () => {
    const [posts, setPosts] = useState([]);

    const { user } = useAuth();

    const BASE_URL = `http://localhost:3003/api/posts`;

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

    const getPosts = useCallback(async () => {
        try {
            const body = user 
                ? { role: user.role, friends: user.friends }
                : {};

            const data = await asyncAction('/feed', {
                method: 'POST',
                body: JSON.stringify(body),
            });

            const postsWithMeta = (data.posts || []).map((post) => ({
                ...post,
                liked: user ? post.likedBy.includes(user._id) : false,
                likesCount: post.likedBy.length,
            }));

            setPosts(postsWithMeta);
        } catch (e) {
            console.log(e.message || 'Возникла ошибка при получении постов');
            throw e;
        }
    }, [asyncAction, user]);

    const addPost = useCallback(async (data) => {
        return asyncAction('/add', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }, [asyncAction]);

    const deletePost = useCallback(async (data) => {
        return asyncAction('/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
        });
    }, [asyncAction]);

    const toggleLike = useCallback(async (data) => {
        try {
            const likeData = await asyncAction(`/${data.postId}/like`, {
                method: 'PATCH',
                body: JSON.stringify(data),
            });

            setPosts((prev) => prev.map((post) => 
                post._id === data.postId 
                    ? { ...post, liked: likeData.liked, likesCount: likeData.likesCount }
                    : post
            ));
        } catch (e) {
            console.log(e.message || 'Возникла ошибка при лайке');
            throw e;
        }
    }, [asyncAction]);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return {
        posts,
        refetchPosts: getPosts,
        addPost,
        deletePost,
        toggleLike
    }
};