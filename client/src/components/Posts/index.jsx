import { Container } from "../ui/Container";
import { Post } from "./components/Post";

import * as SC from "./styles";

export const Posts = ({ posts }) => {
    return (
        <Container>
            <SC.Posts>
                {
                    posts.map((post) => <Post key={post.id} post={post} />)
                }
            </SC.Posts>
        </Container>
    )
};