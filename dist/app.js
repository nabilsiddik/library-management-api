"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['https://library-management-frontend-taupe.vercel.app', 'http://localhost:5173'],
}));
app.use(express_1.default.json());
app.use('/api/books', book_controller_1.bookRouter);
app.use('/api/borrow', borrow_controller_1.borrowRouter);
app.get('/', (req, res) => {
    res.send('Server is running');
});
exports.default = app;
