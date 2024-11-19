import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario requerido'
    }),
    email: z.string({
        required_error: 'Email requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: z.string({
        required_error: 'Contraseña requerida'
    }).min(6, {
        message: 'La contraseña debe ser de al menos 6 caracteres'
    }),
    role: z.enum(["administrador", "investigador", "colaborador"], {
        required_error: "Rol requerido"}),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: z.string({
        required_error: 'Contraseña requerida'
    }).min(6, {
        message: 'La contraseña debería tener al menos 6 carácteres'
    }),
    
});