import express, { Request, Response } from 'express'
import Borrow from '../models/borrow.model'
import Book from '../models/book.model'

export const borrowRouter = express.Router()

// Post a borrow
borrowRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body
        const {book, quantity} = req.body
        const borrowedBook = await Book.findById(book)
        console.log(borrowedBook)

        if(!borrowedBook){
            return res.status(404).json({
                success: false,
                message: 'Book Not Found'
            })
        }

        if(quantity > borrowedBook.copies){
            return res.status(400).json({
                success: false,
                message: 'Not enough copies available'
            })
        }

        const updatedBook = await Book.findOneAndUpdate(
            {_id: book},
            {$inc: {copies: -quantity}},
            {new: true}
        )

        if(updatedBook){
            updatedBook.updateAvailable()
            await updatedBook.save()
        }

        const borrow = await Borrow.create(body)
        res.status(201).send({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        })
    }catch(error){
        console.log(error)
    }
})