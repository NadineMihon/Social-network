import { Container } from "../../../ui/Container";
import { Comment } from "./components/Comment";

import * as SC from "./styles";

export const Comments = ({ comments, deleteComment, refetchComments }) => {
    return (
        <Container>
            <SC.CommentsInfo>
                {
                    comments.map((comment) => <Comment 
                        key={comment._id} 
                        comment={comment} 
                        deleteComment={deleteComment}
                        refetchComments={refetchComments}
                    />)
                }
            </SC.CommentsInfo>
        </Container>
    )
};