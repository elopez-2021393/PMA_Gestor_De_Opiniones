import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateComment = [
    body('text')
        .trim()
        .notEmpty()
        .withMessage('El texto del comentario es obligatorio')
        .isLength({ min: 1, max: 1000 })
        .withMessage('El comentario debe tener entre 1 y 1000 caracteres'),
    checkValidators,
];

export const validateUpdateComment = [
    body('text')
        .trim()
        .notEmpty()
        .withMessage('El texto del comentario es obligatorio')
        .isLength({ min: 1, max: 1000 })
        .withMessage('El comentario debe tener entre 1 y 1000 caracteres'),
    checkValidators,
];
