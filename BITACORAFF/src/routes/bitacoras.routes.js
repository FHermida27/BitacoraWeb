import { Router } from 'express';
import { 
    getBitacoras,
    getBitacora,
    createBitacora,
    updateBitacora,
    deleteBitacora,
    getUserBitacoras
} from '../controllers/bitacoras.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createBitacoraSchema } from '../schemas/bitacora.schema.js';

const router = Router();

// Rutas de bitácoras
router.get('/bitacoras/user', authRequired, getUserBitacoras); // Esta ruta debe ir antes de /bitacoras/:id
router.get('/bitacoras', authRequired, getBitacoras);
router.get('/bitacoras/:id', authRequired, getBitacora);
router.post('/bitacoras', authRequired, validateSchema(createBitacoraSchema), createBitacora);
router.put('/bitacoras/:id', authRequired, updateBitacora);
router.delete('/bitacoras/:id', authRequired, deleteBitacora);

export default router;