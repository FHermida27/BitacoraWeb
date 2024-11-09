import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // await mongoose.connect('mongodb://localhost/bitacoraff');
        await mongoose.connect('mongodb+srv://freylenceballes:Freylen10052004@cluster0.y60rm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(">>> DB is connected")
    } catch (error) {
        console.log(error)
    }
};