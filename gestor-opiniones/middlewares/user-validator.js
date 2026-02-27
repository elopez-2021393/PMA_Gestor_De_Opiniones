import { body } from 'express-validator';
import User from '../src/users/user.model.js';
import { checkValidators } from './check-validators.js';

export const validateRegister = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 35 })
        .withMessage('El nombre debe tener entre 2 y 35 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
        .withMessage('El nombre solo puede contener letras y espacios'),
    body('surname')
        .trim()
        .notEmpty()
        .withMessage('El apellido es obligatorio')
        .isLength({ min: 2, max: 35 })
        .withMessage('El apellido debe tener entre 2 y 35 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
        .withMessage('El apellido solo puede contener letras y espacios'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo es obligatorio')
        .isEmail()
        .withMessage('El correo debe tener un formato válido')
        .normalizeEmail()
        .custom(async (value) => {
            const existUser = await User.findOne({ email: value });
            if (existUser) {
                throw new Error('Correo ya registrado. Por favor ingrese otro correo.');
            }
            return true;
        }),
    body('phone')
        .optional()
        .isNumeric()
        .withMessage('Debe ingresar solo números en el teléfono')
        .isLength({ min: 8, max: 16 })
        .withMessage('El teléfono debe tener entre 8 y 16 dígitos'),
    body('username')
        .trim()
        .notEmpty()
        .withMessage('El username es obligatorio')
        .isLength({ min: 2, max: 40 })
        .withMessage('El username debe tener entre 2 y 40 caracteres')
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage('El username solo puede contener letras, números, puntos, guiones y guiones bajos')
        .custom(async (value) => {
            const existUser = await User.findOne({ username: value });
            if (existUser) {
                throw new Error('Username ya registrado. Por favor ingrese otro username.');
            }
            return true;
        }),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Debe crear una contraseña')
        .isLength({ min: 8, max: 100 })
        .withMessage('La contraseña debe tener entre 8 y 100 caracteres')
        .matches(/(?=.*[a-z])/)
        .withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/(?=.*[A-Z])/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos un número'),
    checkValidators,
];

export const validateLogin = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('El username o email es obligatorio'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
    checkValidators,
];

export const validateChangePassword = [
    body('currentPassword')
        .trim()
        .notEmpty()
        .withMessage('La contraseña actual es obligatoria'),
    body('newPassword')
        .trim()
        .notEmpty()
        .withMessage('La nueva contraseña es obligatoria')
        .isLength({ min: 8 })
        .withMessage('La nueva contraseña debe tener al menos 8 caracteres')
        .custom((value, { req }) => {
            if (value === req.body.currentPassword) {
                throw new Error('La nueva contraseña debe ser diferente a la actual');
            }
            return true;
        }),
    checkValidators,
];

export const validateForgotPassword = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio')
        .isEmail()
        .withMessage('Debe proporcionar un correo electrónico válido'),
    checkValidators,
];

export const validateResetPassword = [
    body('newPassword')
        .trim()
        .notEmpty()
        .withMessage('La nueva contraseña es obligatoria')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    checkValidators,
];

export const validateUpdateProfile = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 35 })
        .withMessage('El nombre debe tener entre 2 y 35 caracteres'),
    body('surname')
        .optional()
        .trim()
        .isLength({ min: 2, max: 35 })
        .withMessage('El apellido debe tener entre 2 y 35 caracteres'),
    body('phone')
        .optional()
        .isNumeric()
        .withMessage('Debe ingresar números en el teléfono')
        .isLength({ min: 8, max: 16 })
        .withMessage('El teléfono debe tener entre 8 y 16 caracteres'),
    checkValidators,
];
