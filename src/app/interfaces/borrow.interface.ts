import { Date, Types } from 'mongoose';

export interface Iborrow{
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date,
    cratedAt: Date,
    UpdatedAt: Date
}
