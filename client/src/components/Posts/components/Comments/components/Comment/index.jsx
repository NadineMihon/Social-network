import { useState, useCallback, useEffect } from "react";
import { useGetUser } from "../../../../../../hooks/useGetUser";
import { Typo } from "../../../../../ui/Typo";
import { User } from "../../../../../ui/User";
import { Loader } from "../../../../../ui/Loader";
import { ConfirmDelete } from "../../../../../ui/ConfirmDelete";
import { useAuth } from "../../../../../../hooks/useAuth";

import * as SC from "./styles";

export const Comment = ({ comment, deleteComment, refetchComments }) => {
    const [author, setAuthor] = useState(null);

    const getUser = useGetUser();
    const { user } = useAuth();

    const getAuthor = useCallback(async () => {
        try {
            const result = await getUser(comment.author);
    
            setAuthor(result);
        } catch (e) {
            console.log(e);
        }
    }, [getUser]);

    const handleDeleteComment = async () => {
        try {
            await deleteComment({ commentId: comment._id, role: user.role, authorId: comment.author });
            await refetchComments();
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAuthor();
    }, [comment]);

    if (!author) return <Loader />

    const hasDeleted = (user?._id === comment.author) || (user?.role === 'admin');

    return (
        <SC.CommentInfo>
            <SC.Comment>
                <User user={author} />
                <SC.Content>
                    <Typo>{comment.content}</Typo>
                </SC.Content>  
            </SC.Comment>
            <SC.Info>
                <Typo variant="caption">{comment.createdAt}</Typo> 
            </SC.Info>
            {
                hasDeleted && <SC.DeleteComment>
                    <ConfirmDelete onConfirm={handleDeleteComment} />
                </SC.DeleteComment>     
            }
        </SC.CommentInfo>
    )
};