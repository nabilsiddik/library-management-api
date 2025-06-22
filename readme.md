# Library Management API

Backend REST API for managing a library system — built using **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

## Features

- Manage books (add, update, delete, get)
- Borrow book. It also includes availablity and quantity validation.
- Validations and error handling for the api routes
- Built with clean architecture and modular structure

## Tech Stack

- Express.js
- TypeScript
- MongoDB
- Mongoose 
- Dotenv

## Installation

- Install Dependencies
    - npm install

- Set up environment variables
    - Create a .env file in the root
        - PORT=
        - MONGODB_URI=

- Run the development server
    - npm run dev

Build for production
- npm run build


## API End Points
- GET	/api/books	Get all books
- POST	/api/books	Add a new book
- PUT	/api/books/:id	Update a book by ID
- DELETE	/api/books/:id	Delete a book by ID

- POST	/api/borrow	Add a borrow
- GET	/api/borrow	Get summery of borrows
