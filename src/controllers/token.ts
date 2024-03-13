import jwt from 'jsonwebtoken';
import { User } from '../interface/User.interface';
import { connect } from '../database';

export const generateToken = async (email: string, password: string): Promise<string | null> => {
    try {
        const conn = await connect();
        const [rows] = await conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

        if (rows.length === 0) {
            return null; // Si no se encontró un usuario con las credenciales proporcionadas, devuelve null
        }

        const user: User = rows[0];

        // Construye el payload del token con la información del usuario
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role // Suponiendo que tienes un campo 'role' en tu modelo User
        };

        // Genera el token JWT y devuélvelo
        const token = jwt.sign(payload, 'tu_secreto', { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Error generando el token:', error);
        return null; // Si ocurre un error, devuelve null
    }
};
