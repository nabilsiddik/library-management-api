"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
exports.borrowRouter = express_1.default.Router();
// Post a borrow
exports.borrowRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { book, quantity } = req.body;
        const borrowedBook = yield book_model_1.default.findById(book);
        console.log(borrowedBook);
        if (!borrowedBook) {
            res.status(404).json({
                success: false,
                message: 'Book Not Found'
            });
        }
        else {
            if (quantity > borrowedBook.copies) {
                res.status(400).json({
                    success: false,
                    message: 'Not enough copies available'
                });
            }
        }
        const updatedBook = yield book_model_1.default.findOneAndUpdate({ _id: book }, { $inc: { copies: -quantity } }, { new: true });
        if (updatedBook) {
            updatedBook.updateAvailable();
            yield updatedBook.save();
        }
        const borrow = yield borrow_model_1.default.create(body);
        res.status(201).send({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    }
    catch (error) {
        console.log(error);
    }
}));
