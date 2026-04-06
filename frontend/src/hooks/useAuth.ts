import { useEffect, useState } from 'react';
import { getMe } from '../api';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
    const { user, setUser, logout } = useAuthStore();
    const [loading, setLoading] = useState(true);

    const validateToken = async () => {
        try {
            const response = await getMe();
            if (response.success && response.user) {
                setUser(response.user);
            } else {
                logout();
            }
        } catch (err) {
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        validateToken();
    }, []);

    return { user, loading, validateToken };
};
