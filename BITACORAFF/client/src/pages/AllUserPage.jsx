import { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';
import './Styles/AllUsersPage.css';

const AllUserPage = () => {
    const { users, getUsers } = useUsers();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("Fetching users...");
                await getUsers();
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

    const capitalizeFirstLetter = (string) => {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    };

    return (
        <div className="all-users-page">
            <h2>Lista de Usuarios</h2>
            <div className="users-grid">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="user-card">
                            <h3 className="user-name">{user.username}</h3>
                            <div className="user-info">
                                <p><span>Email:</span> {user.email}</p>
                                <p><span>Rol:</span> {capitalizeFirstLetter(user.role)}</p>
                                <p><span>Registro:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-users">No hay usuarios registrados</p>
                )}
            </div>
        </div>
    );
};

export default AllUserPage;