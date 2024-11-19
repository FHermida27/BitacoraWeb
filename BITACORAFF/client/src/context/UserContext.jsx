import { createContext, useContext, useState } from 'react';
import { 
    getUsersRequest, 
    updateUserRequest, 
    deleteUserRequest 
} from '../api/users';

export const UserContext = createContext();

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers debe usarse dentro de un UserProvider');
    }
    return context;
};

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsersRequest();
            setUsers(response.data);
            setError(null);
        } catch (error) {
            setError('Error al obtener usuarios');
            console.error("Error al obtener usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (userId, userData) => {
        try {
            const response = await updateUserRequest(userId, userData);
            setUsers(users.map(user => 
                user._id === userId ? response.data : user
            ));
            return response.data;
        } catch (error) {
            setError('Error al actualizar usuario');
            throw error;
        }
    };

    const deleteUser = async (userId) => {
        try {
            await deleteUserRequest(userId);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            setError('Error al eliminar usuario');
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{ 
            users, 
            getUsers, 
            updateUser,
            deleteUser,
            loading, 
            error 
        }}>
            {children}
        </UserContext.Provider>
    );
}