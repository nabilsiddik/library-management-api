import { Date } from "mongoose";

export interface Ibook {
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description?: string,
    copies: number,
    available: boolean,
    createdAt?: Date;
    updatedAt?: Date;
}

export interface bookMethods{
    updateAvailable(): void
}
