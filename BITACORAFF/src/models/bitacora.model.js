import mongoose from "mongoose";

const bitacoraSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    localizacion_geografica: {
        type: String,
        required: true,
    },
    condiciones_climaticas_durante_muestreo: {
        type: String,
        required: true,
    },
    descripcion_habitat: {
        type: String,
        required: true,
    },
    fotografias:{
        type: String,
        required: true,
    },
    detalles_especies_recolectadas: {
        type: String, 
        required: true,
    },
    observaciones_adicionales: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});


export default mongoose.model("Bitacora", bitacoraSchema);