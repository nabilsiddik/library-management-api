"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
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
});
bookSchema.method('updateAvailable', function () {
    if (this.copies === 0) {
        this.available = false;
    }
});
bookSchema.pre('save', function () {
    console.log('Middle ware worked before saving the book');
});
bookSchema.post('save', function (doc) {
    console.log('Middle ware worked after saving the book and doc is: ', doc);
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
