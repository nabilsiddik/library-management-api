import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const port = 5000;

async function main() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log('MongoDB connected');

        app.listen(port, () => {
            console.log(`Server is listening to port ${port}`);
        });
    } catch (error) {
        console.log('Error in main function in server.ts', error);
    }
}

main();