import { Container } from "../ui/Container";
import { Post } from "./components/Post";

import * as SC from "./styles";

export const Posts = ({ posts, refetchPosts, deletePost, toggleLike }) => {
    return (
        <Container>
            <SC.Posts>
                {
                    posts.map((post) => <Post 
                        key={post._id} 
                        post={post} 
                        refetchPosts={refetchPosts} 
                        deletePost={deletePost} 
                        toggleLike={toggleLike}
                    />)
                }
            </SC.Posts>
        </Container>
    )
};