import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    loginUser: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);    
            } catch (e) {
                console.log('Ошибка парсинга user из localStorage', e)
            }
        }
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

    return (
        <AuthContext.Provider value={{ user, setUser, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
};