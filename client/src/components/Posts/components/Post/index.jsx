import { useCallback, useEffect, useState } from "react";
import { Card } from "../../../ui/Card";
import { Typo } from "../../../ui/Typo";
import { User } from "../../../ui/User";
import { ConfirmDelete } from "../../../ui/ConfirmDelete";
import { CreateComment } from "../CreateComment";
import { Comments } from "../Comments";
import { Loader } from "../../../ui/Loader";
import { useAuth } from "../../../../hooks/useAuth";
import { useGetUser } from "../../../../hooks/useGetUser";
import { useComments } from "../../../../hooks/useComments";
import likeIcon from "../../../../assets/icons/likeIcon.svg";
import likeIconRed from "../../../../assets/icons/likeIconRed.svg";
import commentIcon from "../../../../assets/icons/commentIcon.svg";

import * as SC from "./styles";

export const Post = ({ post, refetchPosts, deletePost, toggleLike }) => {
    const [author, setAuthor] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useAuth();
    const getUser = useGetUser();
    const { comments, refetchComments, addComment, deleteComment } = useComments(post._id);

    const handleDeletePost = async () => {
        try {
            await deletePost({ postId: post._id, role: user.role, authorId: post.author });
            await refetchPosts();
        } catch (e) {
            console.log(e);
        }
    };

    const handleLike = async () => {
        if (!user) return;

        try {
            await toggleLike({ postId: post._id, userId: user._id });
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
    
    const onSubmitForm = async (formValue) => {
        await addComment({ postId: post._id, authorId: user._id , ...formValue });
        await refetchComments();
    };

    useEffect(() => {
        getAuthor();
    }, [post]);

    if (!author) return <Loader />

    const hasDeleted = (user?._id === post.author) || (user?.role === 'admin');

    return (
        <Card>
            <SC.AuthorInfo>
                <User user={author}/>
                {
                    hasDeleted && <ConfirmDelete onConfirm={handleDeletePost}/>
                }
            </SC.AuthorInfo>
            <SC.ContentInfo>
                <Typo>{post.content}</Typo>
                <SC.PostActions>
                    <SC.PostActionsItems>
                        <SC.PostAction>
                            <SC.ActionIcon 
                                onClick={() => handleLike()}
                                src={post.liked ? likeIconRed : likeIcon} 
                                alt="Like Icon" 
                            />
                            <Typo data-weight="bold">{post.likesCount}</Typo>
                        </SC.PostAction>
                        <SC.PostAction>
                            <SC.ActionIcon
                                onClick={() => setIsOpen(prev => !prev)}
                                src={commentIcon} 
                                alt="Comment Icon" 
                            />
                            <Typo data-weight="bold">{comments.length || ''}</Typo>
                        </SC.PostAction>    
                    </SC.PostActionsItems>
                    <Typo variant="caption">{post.createdAt}</Typo>
                </SC.PostActions>
            </SC.ContentInfo>
            {
                isOpen && <>
                    {
                        (comments.length > 0) && <Comments 
                            comments={comments}  
                            deleteComment={deleteComment}
                            refetchComments={refetchComments} 
                        />
                    }
                    {
                        user && <CreateComment 
                            onSubmitForm={onSubmitForm} 
                            addComment={addComment} 
                            refetchComments={refetchComments}
                        />
                    }
                </> 
            }
        </Card>
    )
};