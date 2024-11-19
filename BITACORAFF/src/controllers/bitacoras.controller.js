import Bitacora from '../models/bitacora.model.js';

// Obtener todas las bitácoras
export const getBitacoras = async (req, res) => {
    try {
        const bitacoras = await Bitacora.find()
            .populate('user', 'username email')
            .sort({ createdAt: -1 });
        res.json(bitacoras);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Crear una bitácora
export const createBitacora = async (req, res) => {
    try {
        const { 
            titulo, 
            localizacion_geografica,
            nombre_cientifico,
            nombre_comun,
            familia,
            cantidad_muestras,
            estado_planta,
            condiciones_climaticas_durante_muestreo,
            descripcion_habitat,
            fotografias,
            detalles_especies_recolectadas,
            observaciones_adicionales,
            date 
        } = req.body;

        const newBitacora = new Bitacora({
            titulo,
            localizacion_geografica,
            nombre_cientifico,
            nombre_comun,
            familia,
            cantidad_muestras,
            estado_planta,
            condiciones_climaticas_durante_muestreo,
            descripcion_habitat,
            fotografias,
            detalles_especies_recolectadas,
            observaciones_adicionales,
            date,
            user: req.user.id
        });

        const savedBitacora = await newBitacora.save();
        res.json(savedBitacora);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Obtener una bitácora específica
export const getBitacora = async (req, res) => {
    try {
        const bitacora = await Bitacora.findById(req.params.id)
            .populate('user', 'username email');
        if (!bitacora) return res.status(404).json({ message: "Bitácora no encontrada" });
        res.json(bitacora);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Actualizar una bitácora
export const updateBitacora = async (req, res) => {
    try {
        const bitacora = await Bitacora.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('user', 'username email');
        if (!bitacora) return res.status(404).json({ message: "Bitácora no encontrada" });
        res.json(bitacora);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Eliminar una bitácora
export const deleteBitacora = async (req, res) => {
    try {
        const bitacora = await Bitacora.findByIdAndDelete(req.params.id);
        if (!bitacora) return res.status(404).json({ message: "Bitácora no encontrada" });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



// Obtener bitácoras del usuario
export const getUserBitacoras = async (req, res) => {
    try {
        const bitacoras = await Bitacora.find({ user: req.user.id })
            .populate('user', 'username email')
            .sort({ createdAt: -1 });
        res.json(bitacoras);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
