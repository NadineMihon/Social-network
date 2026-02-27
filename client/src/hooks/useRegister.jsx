import { useCallback } from "react";

export const useRegister = () => {
    return useCallback(async (data) => {
        try {
            const response = await fetch(`http://localhost:3003/api/users/add`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',   
                body: JSON.stringify(data), 
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Возникла ошибка');
            }

            return await response.json();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }, []);
};