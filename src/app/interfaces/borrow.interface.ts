import { Date, Types } from "mongoose";

export interface Iborrow{
    book: string,
    quantity: number,
    dueDate: Date,
    cratedAt: Date,
    UpdatedAt: Date
}
