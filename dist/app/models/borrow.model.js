"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
borrowSchema.pre('save', function () {
    console.log('Middle ware worked before saving the borrow');
});
borrowSchema.post('save', function (doc) {
    console.log('Middle ware worked after saving the borrow and doc is: ', doc);
});
const Borrow = (0, mongoose_1.model)('borrow', borrowSchema);
exports.default = Borrow;
