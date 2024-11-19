import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { 
    getBitacora, 
    getAllBitacoras, 
    getUserBitacoras,
    createBitacora, 
    updateBitacora, 
    deleteBitacora 
} from "../controllers/bitacoras.controller.js";
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { createBitacoraSchema } from '../schemas/bitacora.schema.js'

const router = Router()


router.get('/all-bitacoras', authRequired, getAllBitacoras)

router.get('/user-bitacoras', authRequired, getUserBitacoras)

router.get('/bitacoras/:id', authRequired, getBitacora)
router.post('/bitacoras', authRequired, validateSchema(createBitacoraSchema), createBitacora)
router.delete('/bitacoras/:id', authRequired, deleteBitacora)
router.put('/bitacoras/:id', authRequired, updateBitacora)

export default router