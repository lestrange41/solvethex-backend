import { Request, Response } from 'express';
import { connect } from '../database';
import { User } from '../interface/User.interface';

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