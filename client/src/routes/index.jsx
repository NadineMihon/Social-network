import { Root } from "../components/Root";
import { MainPage } from "../page/main";
import { FriendsPage } from "../page/friends";
import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "../page/auth";
import { RegistrationPage } from "../page/registration";

export const routesConfig = [
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <MainPage />
            },
            {
                path: '/friends',
                element: <FriendsPage />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthPage />
    }, 
    {
        path:'/registration',
        element: <RegistrationPage />
    }
];

export const appRouter = createBrowserRouter(routesConfig);