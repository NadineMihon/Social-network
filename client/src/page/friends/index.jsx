import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Input } from "../../components/ui/Input";
import { Toolbar } from "../../components/ui/Toolbar";
import { User } from "../../components/ui/User";
import { DeleteIcon } from "../../components/ui/DeleteIcon";

import * as SC from "./styles";

const friends = [
    {
        id: 1,
        name: 'Имя Фамилия',
        role: 'Пользователь',
    },
    {
        id: 2,
        name: 'Имя Фамилия',
        role: 'Пользователь',
    },
    {
        id: 3,
        name: 'Имя Фамилия',
        role: 'Пользователь',
    },
    {
        id: 4,
        name: 'Имя Фамилия',
        role: 'Пользователь',
    },
];

export const FriendsPage = () => {
    return (
        <Container>
            <Toolbar>
                <Input
                    name="search"
                    type="text"
                    placeholder="Поиск по друзьям"
                />
            </Toolbar>
            <SC.FriendsWrapper>
                <Card>
                    <SC.Friends>
                        {
                            friends.map((user) => <SC.Friend key={user.id}>
                                <User user={user}  />
                                <DeleteIcon />
                            </SC.Friend>)
                        }
                    </SC.Friends>
                </Card>    
            </SC.FriendsWrapper>
        </Container>
    )
};