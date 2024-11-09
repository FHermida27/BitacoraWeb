import Bitacora from '../models/bitacora.model.js'

export const getBitacoras = async (req, res) => {
    try {
        const bitacoras = await Bitacora.find({
            user: req.user.id
        }).populate('user')
        res.json(bitacoras)
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" })
    }
}

export const createBitacora = async (req, res) => {
    try {
        const { titulo, localizacion_geografica,
            condiciones_climaticas_durante_muestreo, descripcion_habitat, fotografias,
            detalles_especies_recolectadas, observaciones_adicionales
        } = req.body
        const newBitacora = new Bitacora({
            titulo, localizacion_geografica,
            condiciones_climaticas_durante_muestreo, descripcion_habitat, fotografias,
            detalles_especies_recolectadas, observaciones_adicionales,
            user: req.user.id
        });
        const savedBitacora = await newBitacora.save();
        res.json(savedBitacora);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" })
    }
}

export const getBitacora = async (req, res) => {
    try {
        const bitacora = await Bitacora.findById(req.params.id).populate('user');
        if (!bitacora) return res.status(404).json({ massage: "Bitacora no encontrada" });
        res.json(bitacora)
    } catch (error) {
        return res.status(404).json({ message: "Bitacora no encontrada" })
    }
}

export const deleteBitacora = async (req, res) => {
    try {
        const bitacora = await Bitacora.findByIdAndDelete(req.params.id)
        if (!bitacora) return res.status(404).json({ massage: "Tarea no encontrada" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Bitacora no encontrada" })
    }
}

export const updateBitacora = async (req, res) => {
    try {
        const bitacora = await Bitacora.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!bitacora) return res.status(404).json({ massage: "Tarea no encontrada" })
        res.json(bitacora)
    } catch (error) {
        return res.status(404).json({ message: "Bitacora no encontrada" })
    }
}

