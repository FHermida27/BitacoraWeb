import { createContext, useContext, useState } from "react";
import {
    getUsersRequest, createUserRequest, deleteUserRequest, updateUserRequest
} from '../api/users';  // Asegúrate de que la ruta sea correcta

const UserContext = createContext();

export const useUsers = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUsers debería usarse con un UserProvider");
    }

    return context;
};

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);

    // Obtener todos los usuarios
    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data);  // Asumimos que la API devuelve los usuarios en 'data'
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    // Crear un nuevo usuario
    const createUser = async (user) => {
        try {
            const res = await createUserRequest(user);
            console.log('Usuario creado:', res);
            // Puedes agregar el nuevo usuario a la lista de usuarios si es necesario
            setUsers(prevUsers => [...prevUsers, res.data]);
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    };

    // Eliminar un usuario
    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id);
            if (res.status === 204) {
                setUsers(users.filter(user => user._id !== id));  // Eliminamos el usuario de la lista
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    // Actualizar un usuario
    const updateUser = async (id, user) => {
        try {
            await updateUserRequest(id, user);
            console.log("Usuario actualizado");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    return (
        <UserContext.Provider value={{
            users,
            getUsers,  // Asegúrate de exportar getUsers
            createUser,
            deleteUser,
            updateUser
        }}>
            {children}
        </UserContext.Provider>
    );
}
