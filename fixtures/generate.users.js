const fs = require('fs');
const mysql = require('mysql');

// Credenciales de tu base de datos
const connection = mysql.createConnection({
    host: 'localhost', //:3306
    user: 'root',
    password: 'root',
    database: 'node_mysql_ts',
});

function generateUsers() {
    const users = [
        { id: 1, username: 'josep', password: 'hola', email: 'josep@gmail.com', created_at: new Date() },
        { id: 2, username: 'maria', password: 'hola', email: 'maria@gmail.com', created_at: new Date() },
        { id: 3, username: 'alexa', password: 'hola', email: 'alexa@gmail.com', created_at: new Date() },
        
    ];
    return users;
}
// Genera datos de usuario ficticios
const users = generateUsers();

// Conecta con la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');

    // Inserta los usuarios en la base de datos
    users.forEach((user) => {
        connection.query('INSERT INTO users (username, password, email, created_at) VALUES (?, ?, ?, ?)', [user.username, user.password, user.email, user.created_at], (err, result) => {
            if (err) {
                console.error('Error al insertar usuario:', err);
                return;
            }
            console.log('Usuario insertado correctamente:', user);
        });
    });

    // Cierra la conexión con la base de datos
    connection.end((err) => {
        if (err) {
            console.error('Error al cerrar la conexión con la base de datos:', err);
            return;
        }
        console.log('Conexión cerrada exitosamente');
    });
});