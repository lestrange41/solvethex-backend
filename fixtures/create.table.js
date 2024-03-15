const mysql = require('mysql');

// Credenciales de tu base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
});

// Conecta con el servidor de la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar con el servidor de la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa al servidor de la base de datos');

    // Crea la base de datos si no existe
    connection.query('CREATE DATABASE IF NOT EXISTS node_mysql_ts', (err, result) => {
        if (err) {
            console.error('Error al crear la base de datos:', err);
            return;
        }
        console.log('Base de datos creada correctamente o ya existente');

        // Selecciona la base de datos
        connection.query('USE node_mysql_ts', (err, result) => {
            if (err) {
                console.error('Error al seleccionar la base de datos:', err);
                return;
            }
            console.log('Base de datos seleccionada correctamente');

            // Definición de la estructura de la tabla users
            const createUsersTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

            // Definición de la estructura de la tabla books
            const createBooksTableQuery = `
                CREATE TABLE IF NOT EXISTS books (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    descripcion TEXT,
                    is_read BOOLEAN DEFAULT FALSE
                )
            `;

            // Ejecuta la consulta para crear la tabla users
            connection.query(createUsersTableQuery, (err, result) => {
                if (err) {
                    console.error('Error al crear la tabla de usuarios:', err);
                    return;
                }
                console.log('Tabla de usuarios creada correctamente');

                // Ejecuta la consulta para crear la tabla books
                connection.query(createBooksTableQuery, (err, result) => {
                    if (err) {
                        console.error('Error al crear la tabla de libros:', err);
                        return;
                    }
                    console.log('Tabla de libros creada correctamente');

                    // Cierra la conexión con el servidor de la base de datos
                    connection.end((err) => {
                        if (err) {
                            console.error('Error al cerrar la conexión con el servidor de la base de datos:', err);
                            return;
                        }
                        console.log('Conexión cerrada exitosamente');
                    });
                });
            });
        });
    });
});