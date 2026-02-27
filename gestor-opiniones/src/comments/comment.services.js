import Comment from './comment.model.js';
import Publication from '../publications/publication.model.js';

export const createComment = async ({ text, authorId, publicationId }) => {
    // Verificar que la publicación existe
    const publication = await Publication.findById(publicationId);
    if (!publication) {
        throw new Error('Publicación no encontrada');
    }

    const comment = new Comment({
        text,
        author: authorId,
        publication: publicationId
    });

    await comment.save();

    const populated = await comment.populate('author', 'firstName surname username');
    return populated;
}; //createComment

export const getCommentsByPublication = async (publicationId) => {
    // Verificar que la publicación existe
    const publication = await Publication.findById(publicationId);
    if (!publication) {
        throw new Error('Publicación no encontrada');
    }

    const comments = await Comment.find({ publication: publicationId })
        .populate('author', 'firstName surname username')
        .sort({ createdAt: -1 });

    return comments;
}; //getCommentsByPublication

export const updateComment = async (commentId, text, userId) => {
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new Error('Comentario no encontrado');
    }

    if (comment.author.toString() !== userId) {
        throw new Error('No tienes permisos para editar este comentario');
    }

    comment.text = text;
    await comment.save();

    const updated = await Comment.findById(commentId)
        .populate('author', 'firstName surname username');

    return updated;
}; //updateComment

export const deleteComment = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new Error('Comentario no encontrado');
    }

    if (comment.author.toString() !== userId) {
        throw new Error('No tienes permisos para eliminar este comentario');
    }

    await Comment.findByIdAndDelete(commentId);

    return { message: 'Comentario eliminado exitosamente' };
}; //deleteComment
