import { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';
import './Styles/AllUsersPage.css';

const AllUserPage = () => {
    const { users, getUsers, updateUser, deleteUser } = useUsers();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                await getUsers();
            } catch (err) {
                setError('Error al obtener los usuarios');
                console.error("Error al obtener los usuarios:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); 

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>{error}</p>;

    const capitalizeFirstLetter = (string) => {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    };
    const handleEdit = (user) => {
        setEditingUser({
            ...user,
            newUsername: user.username,
            newRole: user.role
        });
    };

    const handleSave = async () => {
        try {
            await updateUser(editingUser._id, {
                username: editingUser.newUsername,
                role: editingUser.newRole
            });
            await getUsers(); // Recargar la lista
            setEditingUser(null);
        } catch (err) {
            setError('Error al actualizar el usuario');
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            try {
                await deleteUser(userId);
                await getUsers(); // Recargar la lista
            } catch (err) {
                setError('Error al eliminar el usuario');
            }
        }
    };

    return (
        <div className="all-users-page">
            <h2>Lista de Usuarios</h2>
            <div className="users-grid">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="user-card">
                            {editingUser && editingUser._id === user._id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        value={editingUser.newUsername}
                                        onChange={(e) => setEditingUser({
                                            ...editingUser,
                                            newUsername: e.target.value
                                        })}
                                    />
                                    <select
                                        value={editingUser.newRole}
                                        onChange={(e) => setEditingUser({
                                            ...editingUser,
                                            newRole: e.target.value
                                        })}
                                    >
                                        <option value="administrador">Administrador</option>
                                        <option value="investigador">Investigador</option>
                                        <option value="colaborador">Colaborador</option>
                                    </select>
                                    <div className="edit-actions">
                                        <button onClick={handleSave}>Guardar</button>
                                        <button onClick={() => setEditingUser(null)}>Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="user-name">{user.username}</h3>
                                    <div className="user-info">
                                        <p><span>Email:</span> {user.email}</p>
                                        <p><span>Rol:</span> {capitalizeFirstLetter(user.role)}</p>
                                        <p><span>Registro:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="user-actions">
                                        <button 
                                            onClick={() => handleEdit(user)}
                                            className="edit-btn"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user._id)}
                                            className="delete-btn"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </>
                            )}
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