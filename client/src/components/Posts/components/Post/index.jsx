import { Card } from "../../../ui/Card";
import { Avatar } from "../../../ui/Avatar";
import { Typo } from "../../../ui/Typo";
import { Input } from "../../../ui/Input";
import { User } from "../../../ui/User";
import likeIcon from "../../../../assets/icons/likeIcon.svg";
import commentIcon from "../../../../assets/icons/commentIcon.svg";
import messageIcon from "../../../../assets/icons/messageIcon.svg";

import * as SC from "./styles";

export const Post = ({ post }) => {
    return (
        <Card>
            <SC.AuthorInfo>
                <User />
            </SC.AuthorInfo>
            <SC.ContentInfo>
                <Typo>{post.content}</Typo>
                <SC.PostActions>
                    <SC.PostAction>
                        <SC.ActionIcon src={likeIcon} alt="Like Icon" />
                        <Typo data-weight="bold">3</Typo>
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