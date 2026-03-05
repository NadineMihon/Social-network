import { useState, useEffect } from "react";
import { Container } from "../../components/ui/Container";
import { Toolbar } from "../../components/ui/Toolbar";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Loader } from "../../components/ui/Loader";
import { Posts } from "../../components/Posts";
import { CreatePost } from "./components/CreatePost";
import { useAuth } from "../../hooks/useAuth";
import { useOutletContext } from "react-router-dom";

export const MainPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const { user } = useAuth();
    const { postsState } = useOutletContext();
    const { posts, refetchPosts, addPost, deletePost, toggleLike } = postsState;

    const onSubmitForm = async (formValues) => {
        try {
            await addPost({ authorId: user._id, ...formValues });
            await refetchPosts();
            setIsOpen(false); 
        } catch (e) {
            console.log(e)
        }
    };
    const filteredPosts = posts
        ? posts.filter((post) => 
            post.content.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    useEffect(() => {
        if (user?._id) {
            refetchPosts();
        }
    }, [user?._id, refetchPosts]);

    if (!posts) return <Loader />

    return (
        <Container>
            <Toolbar>
                <Input
                    name="search"
                    type="text"
                    placeholder="Поиск по постам"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {
                    user && <Button onClick={() => setIsOpen(prev => !prev)}>
                        {isOpen ? 'Скрыть форму' : 'Написать новый пост'}
                    </Button>
                }
            </Toolbar>
            {
                isOpen && <CreatePost onSubmitForm={onSubmitForm} />
            }
            <Posts posts={filteredPosts} refetchPosts={refetchPosts} deletePost={deletePost} toggleLike={toggleLike}/>
        </Container>
    )
};