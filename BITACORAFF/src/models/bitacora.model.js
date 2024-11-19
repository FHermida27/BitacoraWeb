import mongoose from 'mongoose';

const bitacoraSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    nombre_cientifico: {
        type: String,
        required: false,
    },
    nombre_comun: {
        type: String,
        required: true,
    },
    familia: {
        type: String,
        required: false,
    },
    cantidad_muestras: {
        type: Number,
        required: true,
    },
    estado_planta: {
        type: String,
        required: true,
        enum: ['viva', 'seca', 'en proceso de secado', 'otro']
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
    fotografias: {
        type: String,
        required: true,
    },
    detalles_especies_recolectadas: {
        type: String,
        required: true,
    },
    observaciones_adicionales: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Bitacora', bitacoraSchema);