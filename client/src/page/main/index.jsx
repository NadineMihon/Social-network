import { useState } from "react";
import { Container } from "../../components/ui/Container";
import { Toolbar } from "../../components/ui/Toolbar";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Posts } from "../../components/Posts";
import { CreatePost } from "./components/CreatePost";
import { useAuth } from "../../hooks/useAuth";

const posts = [
    {
        id: 1,
        author: "Имя Фамилия",
        role: 'Пользователь',
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.Quidem, provident 
            voluptas laudantium perferendis distinctio eveniet.Corrupti molestiae natus officia blanditiis rem, 
            ratione consequatur assumenda inventore, veniam ab modi soluta nesciunt!`,
    },
    {
        id: 2,
        author: "Имя Фамилия",
        role: 'Пользователь2',
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.Quidem, provident 
            voluptas laudantium perferendis distinctio eveniet.Corrupti molestiae natus officia blanditiis rem, 
            ratione consequatur assumenda inventore, veniam ab modi soluta nesciunt!`,
    },
    {
        id: 3,
        author: "Имя Фамилия",
        role: 'Пользователь3',
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.Quidem, provident 
            voluptas laudantium perferendis distinctio eveniet.Corrupti molestiae natus officia blanditiis rem, 
            ratione consequatur assumenda inventore, veniam ab modi soluta nesciunt!`,
    }
];

export const MainPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useAuth();

    const onSubmitForm = (formValues) => {
        console.log({ authorId: user._id, ...formValues });
        setIsOpen(false);
    };

    return (
        <Container>
            <Toolbar>
                <Input
                    name="search"
                    type="text"
                    placeholder="Поиск по постам"
                />
                <Button onClick={() => setIsOpen(prev => !prev)}>
                    {isOpen ? 'Скрыть форму' : 'Написать новый пост'}
                </Button>
            </Toolbar>
            {
                isOpen && <CreatePost onSubmitForm={onSubmitForm} />
            }
            <Posts posts={posts} />
        </Container>
    )
};