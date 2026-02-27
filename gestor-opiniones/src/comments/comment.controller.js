import { createComment, getCommentsByPublication, updateComment, deleteComment } from './comment.services.js';

export const create = async (req, res) => {
    try {
        const { text } = req.body;
        const { publicationId } = req.params;

        const comment = await createComment({
            text,
            authorId: req.user.id,
            publicationId
        });

        res.status(201).json({
            success: true,
            message: 'Comentario creado exitosamente',
            data: comment
        });
    } catch (e) {
        const status = e.message.includes('no encontrada') ? 404 : 500;
        res.status(status).json({
            success: false,
            message: 'Error al crear el comentario',
            error: e.message
        });
    }
}; //create

export const getByPublication = async (req, res) => {
    try {
        const { publicationId } = req.params;
        const comments = await getCommentsByPublication(publicationId);

        res.status(200).json({
            success: true,
            message: 'Comentarios obtenidos exitosamente',
            data: comments
        });
    } catch (e) {
        const status = e.message.includes('no encontrada') ? 404 : 500;
        res.status(status).json({
            success: false,
            message: 'Error al obtener los comentarios',
            error: e.message
        });
    }
}; //getByPublication

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const comment = await updateComment(id, text, req.user.id);

        res.status(200).json({
            success: true,
            message: 'Comentario actualizado exitosamente',
            data: comment
        });
    } catch (e) {
        const status = e.message.includes('no encontrado') ? 404
            : e.message.includes('permisos') ? 403 : 500;
        res.status(status).json({
            success: false,
            message: 'Error al actualizar el comentario',
            error: e.message
        });
    }
}; //update

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteComment(id, req.user.id);

        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (e) {
        const status = e.message.includes('no encontrado') ? 404
            : e.message.includes('permisos') ? 403 : 500;
        res.status(status).json({
            success: false,
            message: 'Error al eliminar el comentario',
            error: e.message
        });
    }
}; //remove
