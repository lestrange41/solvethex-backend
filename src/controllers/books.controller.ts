import { Request, Response } from "express";
import { connect } from '../database'
import {Book} from '../interface/Book.interface'



export async function getBooks(req:Request,res:Response): Promise<Response> {

    try {
        const conn = await connect();
        const books = await conn.query('SELECT * FROM books');
        return res.json(books[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export async function createBook(req:Request,res:Response) {
    const newBook: Book = req.body
    const conn = await connect()
    await conn.query('INSERT INTO books SET ?',[newBook])
    
    return res.json({
        message: 'El libro ha sido añadido correctamente'
    })
}

export async function getBook(req:Request,res:Response): Promise<Response> {
   const id = req.params.bookId
   const conn = await connect()
   const books = await conn.query('SELECT * FROM books WHERE id=?', [id])
    return res.json(books[0])
}


export async function deleteBook(req:Request,res:Response) {
    const id = req.params.bookId
    const conn = await connect()
    await conn.query('DELETE FROM books WHERE id=?', [id])
     return res.json({
        message: 'El libro ha sido eliminado correctamente'
     })
 }
 

 export async function updateBook(req:Request,res:Response){
    const id = req.params.bookId
    const updateBook: Book = req.body
    const conn = await connect()
    await conn.query('UPDATE books set ? WHERE id = ?', [updateBook,id])
    return res.json({
        message:"El libro ha sido actualizado correctamente"
    })
 }