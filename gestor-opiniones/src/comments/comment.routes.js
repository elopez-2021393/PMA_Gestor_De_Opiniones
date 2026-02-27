import { Router } from 'express';
import { create, getByPublication, update, remove } from './comment.controller.js';
import { validateCreateComment, validateUpdateComment } from '../../middlewares/comment-validator.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();

// Rutas protegidas - todas requieren autenticación
router.post('/:publicationId', validateJWT, validateCreateComment, create);
router.get('/:publicationId', validateJWT, getByPublication);
router.put('/:id', validateJWT, validateUpdateComment, update);
router.delete('/:id', validateJWT, remove);

export default router;
