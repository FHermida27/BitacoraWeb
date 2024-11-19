import { createContext, useContext, useState } from 'react';
import axios from '../api/axios';

const UserContext = createContext();

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers debería usarse con un UserProvider');
    }
    return context;
};

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUsers = async () => {
        try {
            const response = await axios.get('/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ 
            users, 
            getUsers, 
            loading, 
            error 
        }}>
            {children}
        </UserContext.Provider>
    );
}