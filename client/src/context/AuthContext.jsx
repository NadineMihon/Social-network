import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    updateUser: () => {},
    loginUser: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);    
            } catch (e) {
                console.log('Ошибка парсинга user из localStorage', e);
                setUser(null);
            }
        } else {
            setUser(null);
        }

        setIsAuthLoading(false);
    }, []);

    const loginUser = useCallback(async (data) => {
        try {
            const response = await fetch(`http://localhost:3003/api/users/login`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Произошла ошибка');
            }

            const currentUser = await response.json();

            setUser(currentUser);
            localStorage.setItem('user', JSON.stringify(currentUser));
        } catch (e) {
            console.log(e);
            throw e;
        }
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateUser = (newUser) => {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider value={{ user, setUser, updateUser, isAuthLoading, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
};