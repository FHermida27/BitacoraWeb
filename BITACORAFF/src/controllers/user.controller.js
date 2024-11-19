import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { username, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, role },
            { new: true, select: '-password' }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};