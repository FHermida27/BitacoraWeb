import { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';  // Asegúrate de que la ruta de importación sea correcta

const AllUserPage = () => {
    const { users, getUsers } = useUsers();  // Aquí accedemos a `getUsers` desde el contexto
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await getUsers();  // Aquí estamos llamando a la función getUsers
            } catch (err) {
                setError('Error al obtener los usuarios');
                console.error("Error al obtener los usuarios:", err);
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
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUserPage;
