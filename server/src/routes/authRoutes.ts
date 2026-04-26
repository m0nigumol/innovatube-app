import { Router } from "express";
import { register, login, logout, recoverPassword } from '../controllers/authController';

const router = Router();

// ROUTE: POST /api/auth/register
router.post('/register', register);
// ROUTE: POST /api/auth/login
router.post('/login', login);
// ROUTE: POST /api/auth/logout
router.post('/logout', logout);
// ROUTE: POST /api/auth/recover-password
router.post('/recover-password', recoverPassword);

export default router;