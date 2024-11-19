import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import bitacoraRoutes from './routes/bitacoras.routes.js';
import userRoutes from './routes/user.routes.js';  // Añade esta línea

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', bitacoraRoutes);
app.use('/api', userRoutes);  // Añade esta línea

// Middleware para debugging de rutas
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

export default app;