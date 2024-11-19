import { z } from 'zod';

export const createBitacoraSchema = z.object({
    titulo: z.string({
        required_error: 'Título requerido'
    }),
    nombre_cientifico: z.string().optional(),
    nombre_comun: z.string({
        required_error: 'Nombre común requerido'
    }),
    familia: z.string().optional(),
    cantidad_muestras: z.number({
        required_error: 'Cantidad de muestras requerida'
    }),
    estado_planta: z.string({
        required_error: 'Estado de la planta requerido'
    }),
    localizacion_geografica: z.string({
        required_error: 'Localización geográfica requerida'
    }),
    condiciones_climaticas_durante_muestreo: z.string({
        required_error: 'Condiciones climáticas requeridas'
    }),
    descripcion_habitat: z.string({
        required_error: 'Descripción del hábitat requerida'
    }),
    fotografias: z.string({
        required_error: 'Fotografías requeridas'
    }),
    detalles_especies_recolectadas: z.string({
        required_error: 'Detalles de especies requeridos'
    }),
    observaciones_adicionales: z.string().optional(),
    date: z.string().optional()
});