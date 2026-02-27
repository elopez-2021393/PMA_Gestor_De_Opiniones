import jwt from 'jsonwebtoken';
import { createUserRecord, activateUserAccount, loginUser, changePassword, getUserProfile, updateUserProfile, requestPasswordReset, resetPassword } from './user.services.js';

export const register = async (req, res) => {
    try {
        const user = await createUserRecord({ userData: req.body });

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente. Se ha enviado un correo de activación.',
            data: user
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error al registrar el usuario',
            error: e.message
        });
    }
}; //register

export const activateAccount = async (req, res) => {
    try {
        const { token } = req.params;

        await activateUserAccount(token);

        res.status(200).json({
            success: true,
            message: 'Cuenta activada exitosamente. Ya puedes iniciar sesión.'
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Error al activar la cuenta',
            error: e.message
        });
    }
}; //activateAccount

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await loginUser(username, password);

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1h',
                issuer: process.env.JWT_ISSUER,
                audience: process.env.JWT_AUDIENCE
            }
        );

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            data: {
                user,
                token
            }
        });
    } catch (e) {
        res.status(401).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: e.message
        });
    }
}; //login

export const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        await changePassword(userId, currentPassword, newPassword);

        res.status(200).json({
            success: true,
            message: 'Contraseña actualizada exitosamente'
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Error al cambiar la contraseña',
            error: e.message
        });
    }
}; //updatePassword

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await getUserProfile(userId);

        res.status(200).json({
            success: true,
            message: 'Perfil obtenido exitosamente',
            data: user
        });
    } catch (e) {
        res.status(404).json({
            success: false,
            message: 'Error al obtener el perfil',
            error: e.message
        });
    }
}; //getProfile

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await updateUserProfile(userId, req.body);

        res.status(200).json({
            success: true,
            message: 'Perfil actualizado exitosamente',
            data: user
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el perfil',
            error: e.message
        });
    }
}; //updateProfile

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await requestPasswordReset(email);

        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Error al procesar la solicitud',
            error: e.message
        });
    }
}; //forgotPassword

export const resetPasswordController = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const result = await resetPassword(token, newPassword);

        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Error al restablecer la contraseña',
            error: e.message
        });
    }
}; //resetPasswordController
