import { useCallback } from "react"

export const useGetUser = () => {
    return useCallback(async (id) => {
        if (!id) return Promise.reject(new Error('ID обязателен!'));

        return await fetch(`http://localhost:3003/api/users/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Пользователь не найден');
                }

                return response.json();
            });
    }, []);
};