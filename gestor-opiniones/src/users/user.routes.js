import { Router } from 'express';
import { register, activateAccount, login, updatePassword, getProfile, updateProfile, forgotPassword, resetPasswordController } from './user.controller.js';
import { validateRegister, validateLogin, validateChangePassword, validateForgotPassword, validateResetPassword, validateUpdateProfile } from '../../middlewares/user-validator.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { authLimit } from '../../configs/rateLimit.configuration.js';

const router = Router();

// Rutas públicas
router.post('/register', authLimit, validateRegister, register);
router.get('/activate/:token', activateAccount);
router.post('/login', authLimit, validateLogin, login);
router.post('/forgot-password', authLimit, validateForgotPassword, forgotPassword);
router.post('/reset-password/:token', authLimit, validateResetPassword, resetPasswordController);

// Rutas protegidas
router.get('/profile', validateJWT, getProfile);
router.put('/profile', validateJWT, validateUpdateProfile, updateProfile);
router.put('/change-password', validateJWT, validateChangePassword, updatePassword);

export default router;
