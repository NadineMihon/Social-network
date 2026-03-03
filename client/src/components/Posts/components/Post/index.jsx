import { useCallback, useEffect, useState } from "react";
import { Card } from "../../../ui/Card";
import { Avatar } from "../../../ui/Avatar";
import { Typo } from "../../../ui/Typo";
import { Input } from "../../../ui/Input";
import { User } from "../../../ui/User";
import { DeleteIcon } from "../../../ui/DeleteIcon";
import { useAuth } from "../../../../hooks/useAuth";
import { useGetUser } from "../../../../hooks/useGetUser";
import likeIcon from "../../../../assets/icons/likeIcon.svg";
import likeIconRed from "../../../../assets/icons/likeIconRed.svg";
import commentIcon from "../../../../assets/icons/commentIcon.svg";
import messageIcon from "../../../../assets/icons/messageIcon.svg";

import * as SC from "./styles";

export const Post = ({ post, refetchPosts, deletePost, toggleLike }) => {
    const [author, setAuthor] = useState(null);

    const { user } = useAuth();
    const getUser = useGetUser();

    const handleDeletePost = async () => {
        try {
            await deletePost({ postId: post._id, role: user.role, authorId: post.author });
            await refetchPosts();
        } catch (e) {
            console.log(e);
        }
    };

    const handleLike = async () => {
        try {
            await toggleLike({ postId: post._id, userId: user._id })
        } catch (e) {
            console.log(e);
        }
    };

    const getAuthor = useCallback(async () => {
        try {
            const result = await getUser(post.author);

            setAuthor(result);
        } catch (e) {
            console.log(e);
        }
    }, [getUser]);

    useEffect(() => {
        getAuthor();
    }, [post]);

    if (!author) return <>Loading...</>

    const hasDeleted = (user?._id === post.author) || (user?.role === 'admin');

    return (
        <Card>
            <SC.AuthorInfo>
                <User user={author}/>
                {
                    hasDeleted && <DeleteIcon onClick={() => handleDeletePost()}/>
                }
            </SC.AuthorInfo>
            <SC.ContentInfo>
                <Typo>{post.content}</Typo>
                <SC.PostActions>
                    <SC.PostAction>
                        <SC.ActionIcon 
                            onClick={() => handleLike()}
                            src={post.liked ? likeIconRed : likeIcon} 
                            alt="Like Icon" 
                        />
                        <Typo data-weight="bold">{post.likesCount}</Typo>
                    </SC.PostAction>
                    <SC.PostAction>
                        <SC.ActionIcon src={commentIcon} alt="Comment Icon" />
                        <Typo data-weight="bold">3</Typo>
                    </SC.PostAction>
                </SC.PostActions>
            </SC.ContentInfo>
            <SC.CommentInfo>
                <SC.Comment>
                    <Avatar />
                    <Input 
                        name="comment"
                        type="text"
                        placeholder="Напишите комментарий"
                    />
                </SC.Comment>
                <SC.MessageIcon>
                    <img src={messageIcon} alt="Message Icon" />    
                </SC.MessageIcon>
            </SC.CommentInfo>
        </Card>
    )
};