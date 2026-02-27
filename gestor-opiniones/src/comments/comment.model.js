import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    text: {
        type: String,
        required: [true, 'El texto del comentario es obligatorio'],
        trim: true,
        minLength: [1, 'El comentario no puede estar vacío'],
        maxLength: [1000, 'El comentario no puede exceder de 1000 caracteres']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El autor es obligatorio']
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: [true, 'La publicación es obligatoria']
    }
}, {
    timestamps: true,
    versionKey: false,
}); //commentSchema

export default model('Comment', commentSchema);
