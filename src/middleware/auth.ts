import { Request, Response } from 'express'
import { connect } from '../database'
import { generateToken } from '../controllers/token'

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const conn = await connect();
        const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Email or password incorrect' });
        }

        const user = rows[0];

        // Verifica la contraseña del usuario
        if (user.password !== password) {
            return res.status(401).json({ message: 'Email or password incorrect' });
        }

        // Genera un token JWT para el usuario
        const token = generateToken(user);

        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
