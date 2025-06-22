import express, { Request, Response } from 'express';
import Borrow from '../models/borrow.model';
import Book from '../models/book.model';

export const borrowRouter = express.Router();

// Post a borrow
borrowRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const { book, quantity } = req.body;
        const borrowedBook = await Book.findById(book);
        console.log(borrowedBook);

        if (!borrowedBook) {
            res.status(404).json({
                success: false,
                message: 'Book Not Found'
            });
        } else {
            if (quantity > borrowedBook.copies) {
                res.status(400).json({
                    success: false,
                    message: 'Not enough copies available'
                });
                return
            }
        }


        const updatedBook = await Book.findOneAndUpdate(
            { _id: book },
            { $inc: { copies: -quantity } },
            { new: true }
        );

        if (updatedBook) {
            updatedBook.updateAvailable();
            await updatedBook.save();
        }

        const borrow = await Borrow.create(body);
        res.status(201).send({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    } catch (error) {
        console.log(error);
    }
});


// Get summery of borrowed books using mongodb aggregate
borrowRouter.get('/', async (req: Request, res: Response) => {
    try {
        const borrows = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: "$book"
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    }
                }
            }
        ]);
        res.status(201).send({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: borrows
        });

    } catch (error) {
        console.log(error)
    }
})