import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'


import authRoutes from './routes/auth.routes.js'
import bitacorasRoutes from './routes/bitacoras.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); 

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicación de Bitácoras'); 
});

app.use("/api", authRoutes);
app.use("/api", bitacorasRoutes);

export default app; 
