/**
 * ============================================================
 * SPRINT 2 - GOS-002: Publicaciones
 * ============================================================
 * - Crear publicación (título, categoría, texto, autor, fecha)
 * - Listar publicaciones
 * - Obtener publicación por ID
 * - Editar publicación (solo el autor)
 * - Eliminar publicación (solo el autor)
 * - Validaciones en todos los campos
 * ============================================================
 */
import { Router } from 'express';
import { create, getAll, getById, update, remove } from './publication.controller.js';
import {
    validateCreatePublication,
    validateUpdatePublication
} from '../../middlewares/publication-validator.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();

// Rutas protegidas - todas requieren autenticación
router.post('/', validateJWT, validateCreatePublication, create);
router.get('/', validateJWT, getAll);
router.get('/:id', validateJWT, getById);
router.put('/:id', validateJWT, validateUpdatePublication, update);
router.delete('/:id', validateJWT, remove);

export default router;
