import { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';  // Asegúrate de que la ruta de importación sea correcta

const AllUserPage = () => {
    const { users, getUsers } = useUsers();  // Aquí accedemos a `getUsers` desde el contexto
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("Iniciando fetch de usuarios...");
                await getUsers();
                console.log("Usuarios obtenidos:", users); // Agregar este log
            } catch (err) {
                setError('Error al obtener los usuarios');
                console.error("Error detallado:", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUsers();
    }, [getUsers]);

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="2">No hay usuarios registrados</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllUserPage;
