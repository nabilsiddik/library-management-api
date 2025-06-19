import express, { Request, Response } from 'express'
import Book from '../models/book.model'

export const bookRouter = express.Router()

// Post a book
bookRouter.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body
        const book = await Book.create(body)
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        })
    } catch (error) {
        res.status(400).json({ 
            message: 'Error occured',
            success: false,
            error: error
         });
    }
})


// Get all books
bookRouter.get('/', async (req: Request, res: Response) => {
    try {
        const books = await Book.find()
        res.status(201).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        })
    } catch (error) {
        res.status(400).json({ 
            message: 'Error occured',
            success: false,
            error: error
         });
    }
})


// Get book by id
bookRouter.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const id = await req.params.bookId
        const book = await Book.findOne({_id: new Object(id)})
        res.status(201).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        })
    } catch (error) {
        res.status(400).json({ 
            message: 'Error occured',
            success: false,
            error: error
         });
    }
})



// update book by id
bookRouter.patch('/:bookId', async (req: Request, res: Response) => {
    try {
        const id = await req.params.bookId
        const updatedDoc = req.body
        const book = await Book.findByIdAndUpdate(id, updatedDoc, {new: true})
        res.status(201).json({
            success: true,
            message: 'Book updated successfully',
            data: book
        })
    } catch (error) {
        res.status(400).json({ 
            message: 'Error occured',
            success: false,
            error: error
         });
    }
})



// Delete book by id
bookRouter.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const id = await req.params.bookId
        const book = await Book.findByIdAndDelete(id)
        res.status(201).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        })
    } catch (error) {
        res.status(400).json({ 
            message: 'Error occured',
            success: false,
            error: error
         });
    }
})

