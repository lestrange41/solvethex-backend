import { Request, Response } from 'express';
import { connect } from '../database';
import { User } from '../interface/User.interface';
import jwt from 'jsonwebtoken';
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
export async function getAllUsers(req: Request, res: Response): Promise<Response> {
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

//loggin 
export async function loginUser(req: Request, res: Response): Promise<Response> {
    try {
        const { email, password } = req.body;

        // Verifica si el correo electrónico y la contraseña están presentes en la solicitud
        if (!email || !password) {
            return res.status(400).json({ message: 'Correo electrónico y contraseña son obligatorios' });
        }

        // Consulta el usuario en la base de datos por su correo electrónico
        const conn = await connect();
        const [rows] = await conn.query('SELECT id, email, password FROM users WHERE email = ?', [email]);

        // Verifica que rows sea un array y tenga al menos un elemento
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verifica que la primera fila de rows tenga la estructura esperada
        const user = rows[0] as { id: number, email: string, password: string };

        // Comprueba si user es null o indefinido
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
        const passwordMatch = await password == user.password;

        // Si las contraseñas no coinciden
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' ,password,user});
        }

        // Genera un token de autenticación
        const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

