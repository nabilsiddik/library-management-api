import { model, Schema } from "mongoose";
import Ibook from "../interfaces/book.interface";

const bookSchema = new Schema<Ibook>({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['FICTION' , 'NON_FICTION' , 'SCIENCE' , 'HISTORY' , 'BIOGRAPHY' , 'FANTASY'],
    },
    isbn: {
        type: String,
        trim: true,
        required: true,
        unique: [true, 'isbn must have to be unique'],
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true,
    versionKey: false
})

const Book = model('Book', bookSchema)
export default Book