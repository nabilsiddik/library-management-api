import { Date, Types } from 'mongoose';

export interface Iborrow{
    borrowedBookId: Types.ObjectId,
    quantity: number,
    dueDate: Date,
    cratedAt: Date,
    UpdatedAt: Date
}
