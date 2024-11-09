import { z } from 'zod';

export const createBitacoraSchema = z.object({
    titulo: z.string({
        required_error: 'Titulo requerido'
    }),
    localizacion_geografica: z.string({
        required_error: 'Localizacion geografica requerida'
    }),
    condiciones_climaticas_durante_muestreo: z.string({
        required_error: 'Condiciones climaticas requeridas'
    }),
    descripcion_habitat: z.string({
        required_error: 'Descripcion de habitat requerida'
    }),
    fotografias: z.string({
        required_error: 'Fotografías requeridas'
    }),
    detalles_especies_recolectadas: z.string({
        required_error: 'Detalles requeridos'
    }),
    observaciones_adicionales: z.string().optional(),
});        