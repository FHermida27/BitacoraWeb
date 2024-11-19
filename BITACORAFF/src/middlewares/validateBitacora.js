import { z } from 'zod';

const bitacoraSchema = z.object({
    titulo: z.string().min(1, "El título es requerido"),
    nombre_comun: z.string().min(1, "El nombre común es requerido"),
    cantidad_muestras: z.number().min(1, "La cantidad de muestras debe ser al menos 1"),
    estado_planta: z.enum(['viva', 'seca', 'en proceso de secado', 'otro']),
    localizacion_geografica: z.string().min(1, "La localización es requerida"),
    condiciones_climaticas_durante_muestreo: z.string().min(1, "Las condiciones climáticas son requeridas"),
    descripcion_habitat: z.string().min(1, "La descripción del hábitat es requerida"),
    fotografias: z.string().min(1, "Las fotografías son requeridas"),
    detalles_especies_recolectadas: z.string().min(1, "Los detalles son requeridos"),
});

export const validateBitacora = (req, res, next) => {
    try {
        bitacoraSchema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Datos de bitácora inválidos",
            errors: error.errors.map(e => e.message)
        });
    }
};