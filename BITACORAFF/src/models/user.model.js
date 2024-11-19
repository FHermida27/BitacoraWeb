import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  //Para crear un nuevo usuario es obligatorio username
        trim: true,  //Borra posibles espacios puestos en el username
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, //Cada email es unico
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["administrador", "investigador", "colaborador"],
        required: true,
        default: "colaborador",
    },
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)