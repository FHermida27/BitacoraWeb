import app from './app.js'
import { connectDB } from './db.js'

const PORT = process.env.PORT || 4000;

// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});