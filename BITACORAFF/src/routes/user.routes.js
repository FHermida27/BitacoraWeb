import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { 
    getUsers, 
    updateUser, 
    deleteUser 
} from "../controllers/user.controller.js";

const router = Router();

// Rutas protegidas con authRequired
router.get("/users", authRequired, getUsers);
router.put("/users/:id", authRequired, updateUser);
router.delete("/users/:id", authRequired, deleteUser);

export default router;