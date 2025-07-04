import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import { bookRouter } from './app/controllers/book.controller';
import { borrowRouter } from './app/controllers/borrow.controller';
const app: Application = express();

app.use(cors({
    origin: ['https://library-management-frontend-taupe.vercel.app', 'http://localhost:5173'],
}))


app.use(express.json());

app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running');
});

export default app;