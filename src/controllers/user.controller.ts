import { Request, Response } from 'express';
import { connect } from '../database';
import { User } from '../interface/User.interface';

//crear usuario
export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const newUser: User = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO users SET ?', [newUser]);
        return res.json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

//encontrar todos los usuarios
export async function getUsers(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const users = await conn.query('SELECT * FROM users');
        return res.json(users[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


//encontrar un usuario por el id
export async function getUserById(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.userId;
        const conn = await connect();
        const users = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        return res.json(users[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

//editar informacion del usuario
export async function updateUser(req: Request, res: Response): Promise<Response> {

    const userId = req.params.userId
    const updatedUser: User = req.body
    const conn = await connect()
    await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId]);
    return res.json({
        message: "El usuario ha sido actualizado correctamente"
    })
}

//eliminar user por id 
export async function deleteUser(req: Request, res: Response): Promise<Response> {
    try {
        const userId = req.params.userId;
        const conn = await connect();
        const result = await conn.query('DELETE FROM users WHERE id = ?', [userId]);

        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}